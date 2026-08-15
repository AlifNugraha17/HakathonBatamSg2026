<?php

/**
 * BatamCrossBorder — Standalone PostgreSQL Migration & Seeder
 * Connects directly to PostgreSQL using PDO (no Composer / Laravel vendor required)
 */

$envFile = __DIR__ . '/.env';
$dbHost = '127.0.0.1';
$dbPort = '5432';
$dbName = 'batam_tourism_db';
$dbUser = 'postgres';
$dbPass = '';

if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            $key = trim($key);
            $val = trim($val, " \t\n\r\0\x0B\"'");
            if ($key === 'DB_HOST') $dbHost = $val;
            if ($key === 'DB_PORT') $dbPort = $val;
            if ($key === 'DB_DATABASE') $dbName = $val;
            if ($key === 'DB_USERNAME') $dbUser = $val;
            if ($key === 'DB_PASSWORD') $dbPass = $val;
        }
    }
}

echo "========================================================\n";
echo "🐘 Connecting to PostgreSQL ($dbHost:$dbPort/$dbName) as '$dbUser'...\n";
echo "========================================================\n";

try {
    $dsn = "pgsql:host=$dbHost;port=$dbPort;dbname=$dbName";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    echo "✅ Successfully connected to PostgreSQL '$dbName'!\n\n";
} catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage() . "\n";
    echo "Pastikan PostgreSQL service sedang berjalan dan DB_PASSWORD di .env sudah benar.\n";
    exit(1);
}

// 1. Enable PostGIS extension if available
try {
    $pdo->exec("CREATE EXTENSION IF NOT EXISTS postgis;");
    echo "🌐 PostGIS Extension enabled / verified.\n";
} catch (Exception $e) {
    echo "ℹ️ PostGIS extension notice (standard spatial coordinates will be used).\n";
}

// 2. Drop existing tables for fresh migration
echo "🔄 Resetting tables...\n";
$pdo->exec("DROP TABLE IF EXISTS reviews CASCADE;");
$pdo->exec("DROP TABLE IF EXISTS places CASCADE;");
$pdo->exec("DROP TABLE IF EXISTS ferry_terminals CASCADE;");
$pdo->exec("DROP TABLE IF EXISTS bookings CASCADE;");

// 3. Create Tables
echo "🔨 Creating tables schema...\n";

// Table: Ferry Terminals
$pdo->exec("
CREATE TABLE ferry_terminals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(10) NOT NULL DEFAULT 'ID',
    city VARCHAR(100) NOT NULL DEFAULT 'Batam',
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    fast_ferry_operator VARCHAR(255),
    routes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
");

// Table: Places (Hospitals, Clinics, Cafes, Beaches, Spas, Golf Resorts)
$pdo->exec("
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    category_icon VARCHAR(50) DEFAULT 'building',
    country VARCHAR(10) NOT NULL DEFAULT 'ID',
    country_badge VARCHAR(50) DEFAULT '🇮🇩 Batam',
    city VARCHAR(100) NOT NULL DEFAULT 'Batam',
    nearest_terminal VARCHAR(255),
    terminal_slug VARCHAR(100),
    price_sgd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    price_sg_estimate NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    savings_percent NUMERIC(5, 1) NOT NULL DEFAULT 0.0,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.8,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    vendor_phone VARCHAR(50),
    vendor_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
");

// Table: Reviews (Verified SG Reviews)
$pdo->exec("
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    place_id INTEGER REFERENCES places(id) ON DELETE SET NULL,
    user_name VARCHAR(255) NOT NULL,
    user_location VARCHAR(255) DEFAULT 'Singapore 🇸🇬',
    user_avatar TEXT,
    category_slug VARCHAR(50) NOT NULL DEFAULT 'medical',
    treatment_name VARCHAR(255) NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    cost_saved_sgd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    spent_sgd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    comment TEXT NOT NULL,
    ferry_route VARCHAR(255),
    is_verified BOOLEAN DEFAULT TRUE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
");

// Table: Bookings
$pdo->exec("
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(50) NOT NULL,
    origin_country VARCHAR(50) DEFAULT 'Singapore',
    service_type VARCHAR(100),
    booking_date DATE NOT NULL,
    booking_time VARCHAR(20),
    ferry_terminal VARCHAR(100),
    needs_pickup BOOLEAN DEFAULT TRUE,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
");

echo "✅ Tables created successfully in PostgreSQL!\n\n";

// 4. Extract places from server.php
echo "🌱 Seeding 49 Batam & Singapore Cross-Border Destinations...\n";

$serverFile = file_get_contents(__DIR__ . '/server.php');
$startPos = strpos($serverFile, '$places = [');
$endPos = strpos($serverFile, "\n];", $startPos);
$placesCode = substr($serverFile, $startPos, ($endPos - $startPos) + 3) . ';';

$places = [];
eval($placesCode);

$stmtPlace = $pdo->prepare("
INSERT INTO places (id, name, category, category_name, category_icon, country, country_badge, city, nearest_terminal, terminal_slug, price_sgd, price_sg_estimate, savings_percent, rating, latitude, longitude, address, description, image_url, vendor_phone, vendor_email)
VALUES (:id, :name, :category, :category_name, :category_icon, :country, :country_badge, :city, :nearest_terminal, :terminal_slug, :price_sgd, :price_sg_estimate, :savings_percent, :rating, :latitude, :longitude, :address, :description, :image_url, :vendor_phone, :vendor_email)
");

foreach ($places as $p) {
    $stmtPlace->execute([
        ':id' => $p['id'],
        ':name' => $p['name'],
        ':category' => $p['category'],
        ':category_name' => $p['category_name'] ?? $p['category'],
        ':category_icon' => $p['category_icon'] ?? 'building',
        ':country' => $p['country'] ?? 'ID',
        ':country_badge' => $p['country_badge'] ?? ((isset($p['country']) && $p['country'] === 'SG') ? '🇸🇬 Singapore' : '🇮🇩 Batam'),
        ':city' => $p['city'] ?? ((isset($p['country']) && $p['country'] === 'SG') ? 'Singapore' : 'Batam'),
        ':nearest_terminal' => $p['nearest_terminal'] ?? '',
        ':terminal_slug' => $p['terminal_slug'] ?? '',
        ':price_sgd' => $p['price_sgd'] ?? 0,
        ':price_sg_estimate' => $p['price_sg_estimate'] ?? 0,
        ':savings_percent' => $p['savings_percent'] ?? 0,
        ':rating' => $p['rating'] ?? 4.8,
        ':latitude' => $p['latitude'],
        ':longitude' => $p['longitude'],
        ':address' => $p['address'] ?? '',
        ':description' => $p['description'] ?? '',
        ':image_url' => $p['image_url'] ?? '',
        ':vendor_phone' => $p['vendor_phone'] ?? '',
        ':vendor_email' => $p['vendor_email'] ?? ''
    ]);
}

$pdo->exec("SELECT setval('places_id_seq', (SELECT MAX(id) FROM places));");
echo "✅ Seeded " . count($places) . " destinations into 'places' table!\n\n";

// 5. Seed Ferry Terminals
echo "🌱 Seeding Ferry Terminals...\n";
$terminals = [
    [
        'name' => 'HarbourFront Centre Ferry Terminal Singapore',
        'slug' => 'harbourfront',
        'country' => 'SG',
        'city' => 'Singapore',
        'latitude' => 1.2644,
        'longitude' => 103.8203,
        'fast_ferry_operator' => 'BatamFast / Majestic / Sindo Ferry',
        'routes' => 'HarbourFront ⇄ Harbour Bay (45 min), HarbourFront ⇄ Batam Centre (60 min), HarbourFront ⇄ Sekupang (45 min)'
    ],
    [
        'name' => 'Tanah Merah Ferry Terminal Singapore',
        'slug' => 'tanah-merah',
        'country' => 'SG',
        'city' => 'Singapore',
        'latitude' => 1.3148,
        'longitude' => 103.9877,
        'fast_ferry_operator' => 'BatamFast / Majestic Ferry',
        'routes' => 'Tanah Merah ⇄ Nongsa Pura (35 min), Tanah Merah ⇄ Batam Centre (60 min)'
    ],
    [
        'name' => 'Harbour Bay Ferry Terminal Batam',
        'slug' => 'harbour-bay',
        'country' => 'ID',
        'city' => 'Batam',
        'latitude' => 1.1558,
        'longitude' => 104.0041,
        'fast_ferry_operator' => 'Horizon Fast Ferry / BatamFast',
        'routes' => 'Harbour Bay ⇄ HarbourFront SG (45 min)'
    ],
    [
        'name' => 'Batam Centre International Ferry Terminal',
        'slug' => 'batam-centre',
        'country' => 'ID',
        'city' => 'Batam',
        'latitude' => 1.1311,
        'longitude' => 104.0531,
        'fast_ferry_operator' => 'BatamFast / Sindo / Majestic',
        'routes' => 'Batam Centre ⇄ HarbourFront SG (60 min), Batam Centre ⇄ Tanah Merah SG (60 min)'
    ],
    [
        'name' => 'Nongsa Pura Ferry Terminal Batam',
        'slug' => 'nongsa',
        'country' => 'ID',
        'city' => 'Batam',
        'latitude' => 1.1895,
        'longitude' => 104.1012,
        'fast_ferry_operator' => 'BatamFast Ferry',
        'routes' => 'Nongsa Pura ⇄ Tanah Merah SG (35 min)'
    ],
    [
        'name' => 'Sekupang International Ferry Terminal',
        'slug' => 'sekupang',
        'country' => 'ID',
        'city' => 'Batam',
        'latitude' => 1.1245,
        'longitude' => 103.9298,
        'fast_ferry_operator' => 'BatamFast / Sindo Ferry',
        'routes' => 'Sekupang ⇄ HarbourFront SG (45 min)'
    ]
];

$stmtTerm = $pdo->prepare("
INSERT INTO ferry_terminals (name, slug, country, city, latitude, longitude, fast_ferry_operator, routes)
VALUES (:name, :slug, :country, :city, :latitude, :longitude, :fast_ferry_operator, :routes)
");

foreach ($terminals as $t) {
    $stmtTerm->execute([
        ':name' => $t['name'],
        ':slug' => $t['slug'],
        ':country' => $t['country'],
        ':city' => $t['city'],
        ':latitude' => $t['latitude'],
        ':longitude' => $t['longitude'],
        ':fast_ferry_operator' => $t['fast_ferry_operator'],
        ':routes' => $t['routes']
    ]);
}
echo "✅ Seeded " . count($terminals) . " ferry terminals!\n\n";

// 6. Seed Verified SG Reviews
echo "🌱 Seeding Verified SG Travelers & Patients Reviews...\n";

$verifiedReviews = [
    [
        'id' => 1,
        'place_id' => 1,
        'user_name' => 'Marcus Tan (陈伟杰)',
        'user_location' => 'Tanjong Pagar, Singapore 🇸🇬',
        'user_avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        'treatment_name' => 'Executive Comprehensive Health Screening + Cardiac MRI',
        'category_slug' => 'medical',
        'rating' => 5.0,
        'cost_saved_sgd' => 640.00,
        'spent_sgd' => 280.00,
        'comment' => 'Did the full executive screening at RS Awal Bros. In Singapore private hospitals, a comparable MRI + blood panel costs upwards of $920 SGD. Here it was top-notch, fluent English doctor, VIP pickup from Batam Centre terminal was right on time. Highly recommended!',
        'ferry_route' => 'HarbourFront SG ⇄ Batam Centre (60 min)',
        'is_verified' => true,
        'helpful_count' => 38,
    ],
    [
        'id' => 2,
        'place_id' => 21,
        'user_name' => 'Rachel Lim & Jason',
        'user_location' => 'Jurong East, Singapore 🇸🇬',
        'user_avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        'treatment_name' => 'Porcelain Veneers & Laser Teeth Whitening (2 Pax)',
        'category_slug' => 'dental',
        'rating' => 4.9,
        'cost_saved_sgd' => 850.00,
        'spent_sgd' => 360.00,
        'comment' => 'Took the 45-min ferry from HarbourFront to Harbour Bay. The clinic is 5 minutes away by Grab. German-standard 3D imaging equipment. Saved more than $850 SGD for two people compared to Orchard clinics!',
        'ferry_route' => 'HarbourFront SG ⇄ Harbour Bay (45 min)',
        'is_verified' => true,
        'helpful_count' => 54,
    ],
    [
        'id' => 3,
        'place_id' => 23,
        'user_name' => 'Evelyn Ng',
        'user_location' => 'Bishan, Singapore 🇸🇬',
        'user_avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        'treatment_name' => '120-min Royal Herbal Scrub & Hot Stone Aromatherapy',
        'category_slug' => 'spa',
        'rating' => 4.9,
        'cost_saved_sgd' => 135.00,
        'spent_sgd' => 45.00,
        'comment' => 'A 2-hour luxury spa in Singapore is easily $180+ SGD before GST. Royal Heritage Spa provided authentic Nusantara herbs and soothing massage. Perfect weekend escape from CBD!',
        'ferry_route' => 'HarbourFront SG ⇄ Harbour Bay (45 min)',
        'is_verified' => true,
        'helpful_count' => 29,
    ],
    [
        'id' => 4,
        'place_id' => 26,
        'user_name' => 'David & Golf Buddies',
        'user_location' => 'Katong, Singapore 🇸🇬',
        'user_avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        'treatment_name' => '18-Hole Weekend Championship Green Fee + Buggy + Caddie',
        'category_slug' => 'golf',
        'rating' => 5.0,
        'cost_saved_sgd' => 290.00,
        'spent_sgd' => 130.00,
        'comment' => 'Departed from Tanah Merah directly to Nongsa Pura (only 35 mins!). The golf course condition is pristine with sea breeze overlooking Singapore strait. Playing 18 holes in Singapore on a weekend is impossible without club membership or paying $400+ SGD. Batam is unbeatable value.',
        'ferry_route' => 'Tanah Merah SG ⇄ Nongsa Pura (35 min)',
        'is_verified' => true,
        'helpful_count' => 47,
    ],
    [
        'id' => 5,
        'place_id' => 16,
        'user_name' => 'Kenny Koh',
        'user_location' => 'Sengkang, Singapore 🇸🇬',
        'user_avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        'treatment_name' => 'Live Black Pepper Crab & Seafood Kelong Feast',
        'category_slug' => 'culinary',
        'rating' => 4.8,
        'cost_saved_sgd' => 110.00,
        'spent_sgd' => 35.00,
        'comment' => 'Fresh live seafood over the ocean water at Barelang. Black pepper crab and local steamed gonggong are fresh and super cheap compared to East Coast Seafood Centre in Singapore.',
        'ferry_route' => 'HarbourFront SG ⇄ Batam Centre (60 min)',
        'is_verified' => true,
        'helpful_count' => 22,
    ],
    [
        'id' => 6,
        'place_id' => 21,
        'user_name' => 'Dr. Andrew Teo',
        'user_location' => 'Novena, Singapore 🇸🇬',
        'user_avatar' => 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        'treatment_name' => 'Laser Scaling + Zirconia Crown Replacement',
        'category_slug' => 'dental',
        'rating' => 4.9,
        'cost_saved_sgd' => 510.00,
        'spent_sgd' => 190.00,
        'comment' => 'Very satisfied with the professionalism of the dentists. Clean operatory, autoclaved tools, English speaking dental staff.',
        'ferry_route' => 'HarbourFront SG ⇄ Harbour Bay (45 min)',
        'is_verified' => true,
        'helpful_count' => 31,
    ]
];

$stmtReview = $pdo->prepare("
INSERT INTO reviews (id, place_id, user_name, user_location, user_avatar, category_slug, treatment_name, rating, cost_saved_sgd, spent_sgd, comment, ferry_route, is_verified, helpful_count)
VALUES (:id, :place_id, :user_name, :user_location, :user_avatar, :category_slug, :treatment_name, :rating, :cost_saved_sgd, :spent_sgd, :comment, :ferry_route, :is_verified, :helpful_count)
");

foreach ($verifiedReviews as $r) {
    $stmtReview->execute([
        ':id' => $r['id'],
        ':place_id' => $r['place_id'],
        ':user_name' => $r['user_name'],
        ':user_location' => $r['user_location'],
        ':user_avatar' => $r['user_avatar'],
        ':category_slug' => $r['category_slug'],
        ':treatment_name' => $r['treatment_name'],
        ':rating' => $r['rating'],
        ':cost_saved_sgd' => $r['cost_saved_sgd'],
        ':spent_sgd' => $r['spent_sgd'],
        ':comment' => $r['comment'],
        ':ferry_route' => $r['ferry_route'],
        ':is_verified' => $r['is_verified'],
        ':helpful_count' => $r['helpful_count']
    ]);
}

$pdo->exec("SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));");
echo "✅ Seeded " . count($verifiedReviews) . " verified SG reviews!\n\n";

echo "========================================================\n";
echo "🎉 SUCCESS: Database 'batam_tourism_db' is 100% READY!\n";
echo "Buka pgAdmin 4 -> Refresh 'batam_tourism_db' untuk melihat semua tabel & data.\n";
echo "========================================================\n";
