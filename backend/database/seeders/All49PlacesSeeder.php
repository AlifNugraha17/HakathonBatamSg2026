<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\FerryTerminal;
use App\Models\Place;
use Illuminate\Support\Facades\DB;

class All49PlacesSeeder extends Seeder
{
    public function run(): void
    {
        $jsonPath = base_path('database/data/places49.json');
        if (!file_exists($jsonPath)) {
            return;
        }

        $places = json_decode(file_get_contents($jsonPath), true);
        if (!$places) {
            return;
        }

        // Category mapping
        $categories = [
            'medical' => Category::firstOrCreate(['slug' => 'hospital'], ['name' => 'Hospital & Medical Centre', 'icon' => '🏥', 'description' => 'Accredited international hospitals with MRI, CT-Scan, & Surgery.']),
            'dental' => Category::firstOrCreate(['slug' => 'dental'], ['name' => 'Dental & Smile Care', 'icon' => '🦷', 'description' => 'Aesthetic teeth bleaching, implants, and orthodontic care.']),
            'spa' => Category::firstOrCreate(['slug' => 'wellness'], ['name' => 'Wellness & Herbal Spa', 'icon' => '💆', 'description' => 'Authentic Indonesian herbal bodywork & post-treatment recovery.']),
            'culinary' => Category::firstOrCreate(['slug' => 'seafood'], ['name' => 'Seafood & Cafe Kuliner', 'icon' => '🦞', 'description' => 'Fresh live seafood kelongs and aesthetic specialty cafes.']),
            'tourism' => Category::firstOrCreate(['slug' => 'beach-island'], ['name' => 'Beach & Island Tourism', 'icon' => '🏖️', 'description' => 'White sand beaches, overwater swings, and coastal watersports.']),
            'golf' => Category::firstOrCreate(['slug' => 'golf-resort'], ['name' => 'Golf & Seaside Resort', 'icon' => '⛳', 'description' => '18-hole championship courses facing the Singapore Straits.']),
        ];

        // Terminal mapping
        $terminals = [
            'batam-centre' => FerryTerminal::firstOrCreate(['name' => 'Batam Centre Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1306, 'longitude' => 104.0531]),
            'harbour-bay' => FerryTerminal::firstOrCreate(['name' => 'Harbour Bay Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1541, 'longitude' => 103.9996]),
            'nongsa' => FerryTerminal::firstOrCreate(['name' => 'Nongsa Pura Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1947, 'longitude' => 104.0931]),
            'sekupang' => FerryTerminal::firstOrCreate(['name' => 'Sekupang Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1215, 'longitude' => 103.9312]),
            'harbourfront-sg' => FerryTerminal::firstOrCreate(['name' => 'HarbourFront Centre SG'], ['city' => 'Singapore', 'latitude' => 1.2644, 'longitude' => 103.8206]),
            'tanahmerah-sg' => FerryTerminal::firstOrCreate(['name' => 'Tanah Merah Ferry Terminal SG'], ['city' => 'Singapore', 'latitude' => 1.3142, 'longitude' => 103.9875]),
        ];

        foreach ($places as $p) {
            $cat = $categories[$p['category']] ?? $categories['medical'];
            $terminalKey = $p['terminalKey'] ?? 'harbour-bay';
            $term = $terminals[$terminalKey] ?? $terminals['harbour-bay'];

            Place::updateOrCreate(
                ['name' => $p['name']],
                [
                    'category_id' => $cat->id,
                    'ferry_terminal_id' => $term->id,
                    'description' => $p['description'] ?? '',
                    'address' => $p['nearestTerminal'] ?? 'Batam / Singapore',
                    'latitude' => $p['lat'] ?? 1.1300,
                    'longitude' => $p['lng'] ?? 104.0400,
                    'price_sgd' => $p['priceSgd'] ?? 50.00,
                    'price_idr' => ($p['priceSgd'] ?? 50) * 13920,
                    'savings_percent' => $p['savingsPercent'] ?? 0,
                    'rating' => $p['rating'] ?? 4.8,
                    'image_url' => $p['image'] ?? '',
                    'phone' => '+62 778 400 000',
                    'type' => $p['category'] ?? 'medical',
                    'is_featured' => ($p['savingsPercent'] ?? 0) > 60,
                ]
            );
        }

        $total = Place::count();
        echo "Seeded All 49 Destinations into Database. Total in Database: {$total}\n";
    }
}
