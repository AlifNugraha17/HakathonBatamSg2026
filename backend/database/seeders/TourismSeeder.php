<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\FerryTerminal;
use App\Models\Place;

class TourismSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Categories
        $medicalCat = Category::create(['slug' => 'medical', 'name' => 'Medical & Diagnostic', 'icon' => 'hospital']);
        $dentalCat = Category::create(['slug' => 'dental', 'name' => 'Dental Care', 'icon' => 'tooth']);
        $spaCat = Category::create(['slug' => 'spa', 'name' => 'Wellness & Spa', 'icon' => 'sparkles']);
        $golfCat = Category::create(['slug' => 'golf', 'name' => 'Golf & Resort', 'icon' => 'flag']);
        $seafoodCat = Category::create(['slug' => 'culinary', 'name' => 'Seafood Culinary', 'icon' => 'utensils']);

        // 2. Seed Ferry Terminals
        $hbTerminal = FerryTerminal::create([
            'slug' => 'harbour-bay',
            'name' => 'Harbour Bay Ferry Terminal',
            'latitude' => 1.1558,
            'longitude' => 104.0041,
            'description' => 'Terminal feri utama terdekat dengan kawasan pusat perbelanjaan Nagoya.'
        ]);

        $bcTerminal = FerryTerminal::create([
            'slug' => 'batam-centre',
            'name' => 'Batam Centre Ferry Terminal',
            'latitude' => 1.1311,
            'longitude' => 104.0531,
            'description' => 'Terminal feri di pusat pemerintahan & rumah sakit rujukan utama.'
        ]);

        $npTerminal = FerryTerminal::create([
            'slug' => 'nongsa',
            'name' => 'Nongsa Pura Ferry Terminal',
            'latitude' => 1.1895,
            'longitude' => 104.1012,
            'description' => 'Terminal feri eksklusif kawasan pantai & luxury golf resort.'
        ]);

        // 3. Seed Places with PostGIS Geometries
        $placesData = [
            [
                'category_id' => $medicalCat->id,
                'ferry_terminal_id' => $bcTerminal->id,
                'name' => 'RS Awal Bros Batam — Executive Health Centre',
                'description' => 'Pusat layanan kesehatan medis terkemuka di Batam dengan dokter spesialis lulusan luar negeri.',
                'address' => 'Jl. Gajah Mada No.1, Batam Kota',
                'latitude' => 1.1278,
                'longitude' => 104.0412,
                'price_sgd' => 280.00,
                'savings_percent' => 68,
                'rating' => 4.9,
                'image_url' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80'
            ],
            [
                'category_id' => $dentalCat->id,
                'ferry_terminal_id' => $hbTerminal->id,
                'name' => 'Nagoya Dental Wellness Centre',
                'description' => 'Spesialis pembersihan karang gigi, veneer estetik, mahkota gigi, dan pemutihan gigi laser.',
                'address' => 'Komplek Nagoya Hill Blok A No. 12',
                'latitude' => 1.1445,
                'longitude' => 104.0112,
                'price_sgd' => 180.00,
                'savings_percent' => 72,
                'rating' => 4.8,
                'image_url' => 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
            ],
            [
                'category_id' => $spaCat->id,
                'ferry_terminal_id' => $hbTerminal->id,
                'name' => 'Royal Heritage Spa & Wellness Resort',
                'description' => 'Pijat tradisional Nusantara, scrub rempah herbal, dan terapi pijat batu hangat.',
                'address' => 'Kawasan Harbour Bay Waterfront',
                'latitude' => 1.1512,
                'longitude' => 104.0090,
                'price_sgd' => 45.00,
                'savings_percent' => 70,
                'rating' => 4.9,
                'image_url' => 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'
            ],
            [
                'category_id' => $golfCat->id,
                'ferry_terminal_id' => $npTerminal->id,
                'name' => 'Palm Springs Golf & Beach Resort Nongsa',
                'description' => 'Lapangan golf 18-hole bertaraf internasional dengan pemandangan Selat Singapura.',
                'address' => 'Jl. Hang Lekiu - Nongsa, Batam',
                'latitude' => 1.1920,
                'longitude' => 104.1080,
                'price_sgd' => 130.00,
                'savings_percent' => 60,
                'rating' => 4.9,
                'image_url' => 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80'
            ]
        ];

        foreach ($placesData as $data) {
            $place = Place::create($data);
            // Insert Spatial Geometry Point for PostGIS if using pgsql
            if (DB::getDriverName() === 'pgsql') {
                DB::statement("UPDATE places SET location = ST_SetSRID(ST_MakePoint(?, ?), 4326) WHERE id = ?", [
                    $data['longitude'],
                    $data['latitude'],
                    $place->id
                ]);
            }
        }
    }
}
