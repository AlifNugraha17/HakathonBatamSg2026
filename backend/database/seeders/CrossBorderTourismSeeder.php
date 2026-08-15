<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\FerryTerminal;
use App\Models\Place;
use App\Models\Doctor;
use App\Models\FerrySchedule;
use App\Models\FairPriceBenchmark;
use App\Models\ItineraryPackage;

class CrossBorderTourismSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Categories
        $catHospital = Category::firstOrCreate(['slug' => 'hospital'], ['name' => 'Hospital & Medical Centre', 'icon' => '🏥', 'description' => 'Accredited international hospitals with MRI, CT-Scan, & Surgery.']);
        $catDental = Category::firstOrCreate(['slug' => 'dental'], ['name' => 'Dental & Smile Care', 'icon' => '🦷', 'description' => 'Aesthetic teeth bleaching, implants, and orthodontic care.']);
        $catEye = Category::firstOrCreate(['slug' => 'eye-clinic'], ['name' => 'Eye & LASIK Centre', 'icon' => '👁️', 'description' => 'Advanced cataract laser surgery and precision vision care.']);
        $catWellness = Category::firstOrCreate(['slug' => 'wellness'], ['name' => 'Wellness & Herbal Spa', 'icon' => '💆', 'description' => 'Authentic Indonesian herbal bodywork & post-treatment recovery.']);
        $catDining = Category::firstOrCreate(['slug' => 'seafood'], ['name' => 'Seafood & Cafe Kuliner', 'icon' => '🦞', 'description' => 'Fresh live seafood kelongs and aesthetic specialty cafes.']);
        $catBeach = Category::firstOrCreate(['slug' => 'beach-island'], ['name' => 'Beach & Island Tourism', 'icon' => '🏖️', 'description' => 'White sand beaches, overwater swings, and coastal watersports.']);
        $catGolf = Category::firstOrCreate(['slug' => 'golf-resort'], ['name' => 'Golf & Seaside Resort', 'icon' => '⛳', 'description' => '18-hole championship courses facing the Singapore Straits.']);

        // 2. Seed Ferry Terminals
        $tHfSg = FerryTerminal::firstOrCreate(['name' => 'HarbourFront Centre SG'], ['city' => 'Singapore', 'latitude' => 1.2644, 'longitude' => 103.8206]);
        $tTmSg = FerryTerminal::firstOrCreate(['name' => 'Tanah Merah Ferry Terminal SG'], ['city' => 'Singapore', 'latitude' => 1.3142, 'longitude' => 103.9875]);
        $tHbBtm = FerryTerminal::firstOrCreate(['name' => 'Harbour Bay Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1541, 'longitude' => 103.9996]);
        $tBcBtm = FerryTerminal::firstOrCreate(['name' => 'Batam Centre Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1306, 'longitude' => 104.0531]);
        $tNpBtm = FerryTerminal::firstOrCreate(['name' => 'Nongsa Pura Ferry Terminal'], ['city' => 'Batam', 'latitude' => 1.1947, 'longitude' => 104.0931]);

        // 3. Seed Places (Hospitals, Clinics, Seafood, Beaches, Golf, Spas)
        $p1 = Place::firstOrCreate(['name' => 'RS Awal Bros Batam — Executive Health Center'], [
            'category_id' => $catHospital->id,
            'ferry_terminal_id' => $tHbBtm->id,
            'description' => 'Pusat Medis Unggulan berakreditasi KARS Internasional. Dilengkapi MRI 1.5 Tesla, 128-Slice Dual Source CT-Scan, Executive Screening Suite, dan dokter spesialis jantung & ortopedi.',
            'address' => 'Jl. Gajah Mada Kav. 1, Baloi, Batam',
            'latitude' => 1.1342,
            'longitude' => 104.0152,
            'price_sgd' => 280.00,
            'price_idr' => 3890000,
            'savings_percent' => 68,
            'rating' => 4.92,
            'image_url' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 778 431 777',
            'type' => 'medical',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p2 = Place::firstOrCreate(['name' => 'RS BP Batam (Rumah Sakit Otorita Batam)'], [
            'category_id' => $catHospital->id,
            'ferry_terminal_id' => $tHbBtm->id,
            'description' => 'Rumah Sakit Rujukan Pusat dengan fasilitas Kateterisasi Jantung (Cath Lab), Ruang Terapi Oksigen Hiperbarik (Hyperbaric Chamber), dan Pusat Trauma Medis.',
            'address' => 'Jl. Dr. Cipto Mangunkusumo No. 1, Sekupang, Batam',
            'latitude' => 1.1215,
            'longitude' => 103.9312,
            'price_sgd' => 220.00,
            'price_idr' => 3050000,
            'savings_percent' => 70,
            'rating' => 4.88,
            'image_url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 778 322 121',
            'type' => 'medical',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p3 = Place::firstOrCreate(['name' => 'Nagoya Dental & Aesthetic Smile Center'], [
            'category_id' => $catDental->id,
            'ferry_terminal_id' => $tHbBtm->id,
            'description' => 'Klinik gigi modern spesialis Implan Titanium, Laser Teeth Bleaching, Dental Veneers, dan aligner tak terlihat. Hanya 5 menit dari Harbour Bay Ferry.',
            'address' => 'Nagoya City Walk Complex Blok B No. 8-10, Batam',
            'latitude' => 1.1448,
            'longitude' => 104.0094,
            'price_sgd' => 180.00,
            'price_idr' => 2500000,
            'savings_percent' => 72,
            'rating' => 4.95,
            'image_url' => 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 778 456 888',
            'type' => 'dental',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p4 = Place::firstOrCreate(['name' => 'Budi Kemuliaan Eye & LASIK Surgery Clinic'], [
            'category_id' => $catEye->id,
            'ferry_terminal_id' => $tBcBtm->id,
            'description' => 'Pusat operasi katarak teknologi Phacoemulsification dingin tanpa jahitan, pemeriksaan retina digital, dan koreksi refraksi modern.',
            'address' => 'Jl. Budi Kemuliaan No. 1, Seraya, Batam',
            'latitude' => 1.1398,
            'longitude' => 104.0189,
            'price_sgd' => 240.00,
            'price_idr' => 3340000,
            'savings_percent' => 65,
            'rating' => 4.89,
            'image_url' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 778 454 044',
            'type' => 'medical',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p5 = Place::firstOrCreate(['name' => 'Restoran Seafood Kelong Barelang 168'], [
            'category_id' => $catDining->id,
            'ferry_terminal_id' => $tBcBtm->id,
            'description' => 'Sensasi makan seafood hidup langsung di atas air kelong tradisional dengan pemandangan megah Jembatan 1 Barelang. Kepiting lada hitam, gonggong, dan udang mentega.',
            'address' => 'Jembatan 1 Barelang Waterfront, Tembesi, Batam',
            'latitude' => 0.9856,
            'longitude' => 104.0432,
            'price_sgd' => 35.00,
            'price_idr' => 480000,
            'savings_percent' => 60,
            'rating' => 4.87,
            'image_url' => 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 812 7001 168',
            'type' => 'dining',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p6 = Place::firstOrCreate(['name' => 'Palm Springs Golf & Beach Resort Nongsa'], [
            'category_id' => $catGolf->id,
            'ferry_terminal_id' => $tNpBtm->id,
            'description' => 'Lapangan golf 27-hole kelas dunia dengan kombinasi kontur perbukitan hijau, tepi pantai Selat Singapura, dan danau alami.',
            'address' => 'Jl. Hang Lekiu, Nongsa, Batam',
            'latitude' => 1.1895,
            'longitude' => 104.1012,
            'price_sgd' => 130.00,
            'price_idr' => 1800000,
            'savings_percent' => 62,
            'rating' => 4.90,
            'image_url' => 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 778 761 222',
            'type' => 'golf',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p7 = Place::firstOrCreate(['name' => 'Pantai Elyora Barelang (White Sand Beach)'], [
            'category_id' => $catBeach->id,
            'ferry_terminal_id' => $tBcBtm->id,
            'description' => 'Pasir putih eksotis dan air laut jernih toska dengan ayunan ikonik di atas laut, pondok kelapa, dan fasilitas watersport kano.',
            'address' => 'Jembatan 6 Barelang, Galang Baru, Batam',
            'latitude' => 0.7712,
            'longitude' => 104.1852,
            'price_sgd' => 8.00,
            'price_idr' => 110000,
            'savings_percent' => 75,
            'rating' => 4.85,
            'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 813 6444 8999',
            'type' => 'tourism',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        $p8 = Place::firstOrCreate(['name' => 'Royal Heritage & Herbal Spa Grand Batam'], [
            'category_id' => $catWellness->id,
            'ferry_terminal_id' => $tHbBtm->id,
            'description' => 'Pusat perawatan relaksasi tubuh Nusantara, lulur herbal Bali, pijat batu hangat, dan terapi aroma pasca perjalanan feri.',
            'address' => 'Grand Batam Mall Area Block R-12, Batam',
            'latitude' => 1.1388,
            'longitude' => 104.0125,
            'price_sgd' => 45.00,
            'price_idr' => 625000,
            'savings_percent' => 70,
            'rating' => 4.93,
            'image_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
            'phone' => '+62 812 7008 8990',
            'type' => 'wellness',
            'is_featured' => \Illuminate\Support\Facades\DB::raw('true'),
        ]);

        // 4. Seed Doctors / Medical Specialists
        Doctor::firstOrCreate(['name' => 'dr. Bambang Hermanto, Sp.JP(K), FIHA'], [
            'place_id' => $p1->id,
            'specialization' => 'Spesialis Jantung & Pembuluh Darah (Intervensi)',
            'degree' => 'FKUI / Fellow of Indonesian Heart Association',
            'languages_spoken' => 'English, Indonesian, Malay',
            'consultation_fee_sgd' => 55.00,
            'consultation_fee_idr' => 765000,
            'schedule_days' => 'Senin - Jumat (09:00 - 15:00 WIB)',
            'rating' => 4.96,
            'avatar_url' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
        ]);

        Doctor::firstOrCreate(['name' => 'drg. Cynthia Wijaya, Sp.KG'], [
            'place_id' => $p3->id,
            'specialization' => 'Spesialis Konservasi Gigi & Estetika Senyum',
            'degree' => 'FKG Unair / Aesthetic Dentistry Master',
            'languages_spoken' => 'English, Mandarin, Indonesian',
            'consultation_fee_sgd' => 40.00,
            'consultation_fee_idr' => 550000,
            'schedule_days' => 'Senin - Sabtu (10:00 - 19:00 WIB)',
            'rating' => 4.98,
            'avatar_url' => 'https://images.unsplash.com/photo-1594824813593-6a3c9e6d4212?auto=format&fit=crop&w=300&q=80',
        ]);

        Doctor::firstOrCreate(['name' => 'dr. Hendra Gunawan, Sp.OT'], [
            'place_id' => $p1->id,
            'specialization' => 'Spesialis Bedah Ortopedi & Tulang Belakang',
            'degree' => 'FK UGM / Spine Surgery Fellowship',
            'languages_spoken' => 'English, Indonesian',
            'consultation_fee_sgd' => 50.00,
            'consultation_fee_idr' => 695000,
            'schedule_days' => 'Selasa, Kamis, Sabtu (11:00 - 16:00 WIB)',
            'rating' => 4.91,
            'avatar_url' => 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
        ]);

        Doctor::firstOrCreate(['name' => 'dr. Maria Kusuma, Sp.M'], [
            'place_id' => $p4->id,
            'specialization' => 'Spesialis Mata & Bedah Refraktif Katarak LASIK',
            'degree' => 'FK Unpad / Cataract Phaco Fellowship',
            'languages_spoken' => 'English, Indonesian, Hokkien',
            'consultation_fee_sgd' => 45.00,
            'consultation_fee_idr' => 625000,
            'schedule_days' => 'Senin - Jumat (08:30 - 14:00 WIB)',
            'rating' => 4.94,
            'avatar_url' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
        ]);

        // 5. Seed Ferry Schedules
        FerrySchedule::firstOrCreate([
            'departure_terminal_id' => $tHfSg->id,
            'arrival_terminal_id' => $tHbBtm->id,
            'departure_time' => '08:20:00',
        ], [
            'operator_name' => 'BatamFast Express',
            'arrival_time' => '09:05:00',
            'price_sgd' => 38.00,
            'price_idr' => 528000,
            'days_available' => 'Daily',
        ]);

        FerrySchedule::firstOrCreate([
            'departure_terminal_id' => $tHfSg->id,
            'arrival_terminal_id' => $tHbBtm->id,
            'departure_time' => '10:30:00',
        ], [
            'operator_name' => 'Majestic Fast Ferry',
            'arrival_time' => '11:15:00',
            'price_sgd' => 38.00,
            'price_idr' => 528000,
            'days_available' => 'Daily',
        ]);

        FerrySchedule::firstOrCreate([
            'departure_terminal_id' => $tTmSg->id,
            'arrival_terminal_id' => $tBcBtm->id,
            'departure_time' => '09:15:00',
        ], [
            'operator_name' => 'Sindo Ferry',
            'arrival_time' => '10:00:00',
            'price_sgd' => 38.00,
            'price_idr' => 528000,
            'days_available' => 'Daily',
        ]);

        // 6. Seed Fair Price Benchmarks
        FairPriceBenchmark::firstOrCreate(['item_name' => 'Executive Medical Screening + MRI 1.5 Tesla'], [
            'category' => 'Medical Checkup',
            'fair_price_min_idr' => 3500000,
            'fair_price_max_idr' => 4500000,
            'price_sgd_benchmark' => 880.00,
            'unit' => 'per paket komprehensif',
            'warning_threshold_idr' => 5500000,
            'notes' => 'Hemat ~68% dibandingkan RS swasta Mount Elizabeth SG.'
        ]);

        FairPriceBenchmark::firstOrCreate(['item_name' => 'Titanium Dental Implant + Crown Zirconia'], [
            'category' => 'Dental Care',
            'fair_price_min_idr' => 8500000,
            'fair_price_max_idr' => 12000000,
            'price_sgd_benchmark' => 2800.00,
            'unit' => 'per gigi',
            'warning_threshold_idr' => 15000000,
            'notes' => 'Hemat ~70% vs klinik gigi Orchard Road SG.'
        ]);

        FairPriceBenchmark::firstOrCreate(['item_name' => 'Live Black Pepper Crab (1 KG) Kelong'], [
            'category' => 'Culinary / Seafood',
            'fair_price_min_idr' => 350000,
            'fair_price_max_idr' => 480000,
            'price_sgd_benchmark' => 110.00,
            'unit' => 'per KG',
            'warning_threshold_idr' => 600000,
            'notes' => 'Kepiting segar langsung dari kolam apung Barelang.'
        ]);

        FairPriceBenchmark::firstOrCreate(['item_name' => '18-Hole Oceanfront Golf & Caddie Service'], [
            'category' => 'Golf & Sport',
            'fair_price_min_idr' => 1500000,
            'fair_price_max_idr' => 1950000,
            'price_sgd_benchmark' => 420.00,
            'unit' => 'per 18 holes',
            'warning_threshold_idr' => 2500000,
            'notes' => 'Termasuk buggy dan tips standar caddie.'
        ]);
    }
}
