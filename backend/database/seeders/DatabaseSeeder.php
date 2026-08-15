<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Spa;
use App\Models\Service;
use App\Models\Therapist;
use App\Models\FlashSlot;
use App\Models\Booking;
use App\Models\Transaction;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with authentic Singapore-Batam corridor records.
     */
    public function run(): void
    {
        // 1. Seed Core Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@zentura.com'],
            [
                'name' => 'Super Admin HQ',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'title' => 'Platform Master Admin',
                'country' => 'Singapore',
                'phone' => '+65 8123 9900',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            ]
        );

        $merchant = User::firstOrCreate(
            ['email' => 'partner@heritage-spa.id'],
            [
                'name' => 'Ratna Dewi',
                'password' => Hash::make('password123'),
                'role' => 'merchant',
                'title' => 'Owner — Martha Tilaar Spa Grand Batam',
                'country' => 'Indonesia',
                'phone' => '+62 812 7008 8990',
                'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
            ]
        );

        $tourist = User::firstOrCreate(
            ['email' => 'traveler@singapore.sg'],
            [
                'name' => 'Alexandre Tan',
                'password' => Hash::make('password123'),
                'role' => 'tourist',
                'title' => 'Singapore Cross-Border Traveler',
                'country' => 'Singapore',
                'phone' => '+65 9123 4567',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            ]
        );

        // 2. Seed Vetted Spas
        $spa1 = Spa::create([
            'name' => 'Martha Heritage Herbal Spa Grand Batam',
            'tagline' => 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
            'owner_id' => $merchant->id,
            'region' => 'batam',
            'landmark' => '3 mins walk from Harbour Bay Ferry Terminal',
            'distance_minutes' => 3,
            'address' => 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
            'phone' => '+6281270088990',
            'rating' => 4.90,
            'review_count' => 248,
            'hygiene_score' => 99,
            'hygiene_badges' => [
                'Single-Use Organic Bed Linens',
                'UV Sanitized Tools (Hospital Grade)',
                '100% Certified Master Therapists',
                'Individual Fresh Herbal Infusion',
            ],
            'categories' => ['massage', 'reflexology', 'spa'],
            'image_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
            'status' => 'active',
            'commission_rate' => 12.0,
        ]);

        $spa2 = Spa::create([
            'name' => 'Eska Wellness & Reflexology Harbour Bay',
            'tagline' => 'Modern Hydrotherapy & Rapid Pre-Ferry Decompression',
            'owner_id' => null,
            'region' => 'batam',
            'landmark' => 'Directly linked to Harbour Bay Ferry Terminal Walkway',
            'distance_minutes' => 2,
            'address' => 'Bayfront Promenade Block C-12, Harbour Bay, Batam',
            'phone' => '+6281364551122',
            'rating' => 4.85,
            'review_count' => 312,
            'hygiene_score' => 98,
            'hygiene_badges' => [
                'Medical Grade Sanitization',
                'Disposable Slippers & Underwear',
                'BNSP Licensed Senior Practitioners',
                'Allergy Free Natural Carrier Oils',
            ],
            'categories' => ['massage', 'reflexology', 'headspa'],
            'image_url' => 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
            'status' => 'active',
            'commission_rate' => 12.0,
        ]);

        $spa3 = Spa::create([
            'name' => 'Nagoya Hill Reflexology & Aromatherapy Sanctuary',
            'tagline' => 'Premium Thai Acupressure & Reflexology Center',
            'owner_id' => null,
            'region' => 'batam_centre',
            'landmark' => '5 mins from Batam Centre Ferry Terminal',
            'distance_minutes' => 5,
            'address' => 'Nagoya City Walk Complex Blok A No. 1-3, Batam',
            'phone' => '+6281233445566',
            'rating' => 4.78,
            'review_count' => 194,
            'hygiene_score' => 96,
            'hygiene_badges' => [
                'Fresh Laundered Sheets Every Guest',
                'UV Sterilized Hot Towel Cabinets',
                'Non-Greasy Aromatherapy Formulas',
            ],
            'categories' => ['reflexology', 'massage'],
            'image_url' => 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
            'status' => 'active',
            'commission_rate' => 12.0,
        ]);

        $spa4 = Spa::create([
            'name' => 'Nongsa Pura Coastal Botanical Spa',
            'tagline' => 'Seaside Pavilion Relaxation by the Marina',
            'owner_id' => null,
            'region' => 'batam_nongsa',
            'landmark' => '2 mins walk from Nongsa Pura Ferry Terminal',
            'distance_minutes' => 2,
            'address' => 'Nongsa Marina Promenade, Nongsa, Batam',
            'phone' => '+6281198765432',
            'rating' => 4.95,
            'review_count' => 180,
            'hygiene_score' => 99,
            'hygiene_badges' => [
                'Private Oceanfront Suites',
                'Single-Use Organic Bed Linens',
                'Hospital Grade Autoclave Tools',
                'Hypoallergenic Virgin Coconut Oils',
            ],
            'categories' => ['massage', 'spa', 'reflexology'],
            'image_url' => 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
            'status' => 'active',
            'commission_rate' => 12.0,
        ]);

        // 3. Seed Services for Spa 1
        Service::create([
            'spa_id' => $spa1->id,
            'name' => 'Balinese Herbal Oil Deep Tissue',
            'duration_minutes' => 60,
            'price_idr' => 250000,
            'category' => 'massage',
            'popular' => true,
            'desc' => 'Traditional Indonesian palm kneading, skin rolling, and warm infused ginger-clove oil targeting tight lower back and shoulder knots.',
        ]);
        Service::create([
            'spa_id' => $spa1->id,
            'name' => 'Express Travel Foot & Calf Revival',
            'duration_minutes' => 45,
            'price_idr' => 180000,
            'category' => 'reflexology',
            'popular' => true,
            'desc' => 'Specialized foot pressure-point relief designed to restore circulation after maritime ferry transit and duty-free shopping.',
        ]);
        Service::create([
            'spa_id' => $spa1->id,
            'name' => 'Royal Javanese Lulur & Body Polish',
            'duration_minutes' => 90,
            'price_idr' => 380000,
            'category' => 'spa',
            'popular' => false,
            'desc' => 'Full body botanical scrub with turmeric, rice powder, jasmine essence followed by yoghurt skin hydration.',
        ]);

        // Services for Spa 2
        Service::create([
            'spa_id' => $spa2->id,
            'name' => 'Express 30-Min Head, Neck & Shoulder Blitz',
            'duration_minutes' => 30,
            'price_idr' => 140000,
            'category' => 'massage',
            'popular' => true,
            'desc' => 'Quick targeted relief for passengers with less than 45 minutes before ferry boarding calls.',
        ]);
        Service::create([
            'spa_id' => $spa2->id,
            'name' => 'Japanese Scalp Waterfall & Herbal Head Spa',
            'duration_minutes' => 60,
            'price_idr' => 320000,
            'category' => 'headspa',
            'popular' => true,
            'desc' => 'Warm water circulator ring, volcanic clay scalp detox, and therapeutic temple acupressure.',
        ]);

        // Services for Spa 3 & 4
        Service::create([
            'spa_id' => $spa3->id,
            'name' => 'Acupressure Foot & Arm Restoration',
            'duration_minutes' => 45,
            'price_idr' => 175000,
            'category' => 'reflexology',
            'popular' => true,
            'desc' => 'Concentrated pressure points targeting feet, calves, palms, and forearms with warming ginger balm.',
        ]);
        Service::create([
            'spa_id' => $spa4->id,
            'name' => 'Nongsa Ocean Breeze Herbal Massage',
            'duration_minutes' => 60,
            'price_idr' => 350000,
            'category' => 'massage',
            'popular' => true,
            'desc' => 'Deep thumb pressure along meridian lines combined with palm kneading and organic virgin coconut massage oil overlooking the Singapore strait.',
        ]);

        // 4. Seed Therapists
        Therapist::create([
            'spa_id' => $spa1->id,
            'name' => 'Ibu Ratna',
            'experience' => '12 yrs exp',
            'specialty' => 'Balinese Pressure & Acupressure',
            'rating' => 4.9,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);
        Therapist::create([
            'spa_id' => $spa1->id,
            'name' => 'Mas Budi',
            'experience' => '8 yrs exp',
            'specialty' => 'Reflexology & Sciatica Release',
            'rating' => 4.8,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);
        Therapist::create([
            'spa_id' => $spa1->id,
            'name' => 'Mbak Dewi',
            'experience' => '6 yrs exp',
            'specialty' => 'Aroma Therapy & Head Spa',
            'rating' => 4.9,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);
        Therapist::create([
            'spa_id' => $spa2->id,
            'name' => 'Kak Sarah',
            'experience' => '9 yrs exp',
            'specialty' => 'Upper Trapezius & Migraine Relief',
            'rating' => 4.9,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);
        Therapist::create([
            'spa_id' => $spa3->id,
            'name' => 'Ibu Maya',
            'experience' => '7 yrs exp',
            'specialty' => 'Reflexology & Lymphatic Drainage',
            'rating' => 4.8,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);
        Therapist::create([
            'spa_id' => $spa4->id,
            'name' => 'Ibu Wayan',
            'experience' => '15 yrs exp',
            'specialty' => 'Coastal Warm Stone Deep Therapy',
            'rating' => 5.0,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);

        // 5. Seed Live Flash Slots
        FlashSlot::create([
            'spa_id' => $spa1->id,
            'therapist_name' => 'Ibu Ratna',
            'service_name' => 'Balinese Herbal Oil Deep Tissue',
            'chair' => 'Private VIP Room 1',
            'time_window' => '14:15 - 15:15',
            'duration_minutes' => 60,
            'discount_percent' => 20,
            'price_idr' => 200000,
            'original_price_idr' => 250000,
            'is_flash_active' => true,
            'expires_at' => now()->addHours(2),
        ]);
        FlashSlot::create([
            'spa_id' => $spa1->id,
            'therapist_name' => 'Mas Budi',
            'service_name' => 'Express Travel Foot & Calf Revival',
            'chair' => 'Reflexology Recliner 3',
            'time_window' => '15:30 - 16:15',
            'duration_minutes' => 45,
            'discount_percent' => 25,
            'price_idr' => 135000,
            'original_price_idr' => 180000,
            'is_flash_active' => true,
            'expires_at' => now()->addHours(3),
        ]);
        FlashSlot::create([
            'spa_id' => $spa2->id,
            'therapist_name' => 'Kak Sarah',
            'service_name' => 'Express 30-Min Head, Neck & Shoulder Blitz',
            'chair' => 'Chair 4 (Fast Track)',
            'time_window' => '14:30 - 15:00',
            'duration_minutes' => 30,
            'discount_percent' => 15,
            'price_idr' => 120000,
            'original_price_idr' => 140000,
            'is_flash_active' => true,
            'expires_at' => now()->addHours(2),
        ]);
        FlashSlot::create([
            'spa_id' => $spa3->id,
            'therapist_name' => 'Ibu Maya',
            'service_name' => 'Acupressure Foot & Arm Restoration',
            'chair' => 'Recliner Suite 2',
            'time_window' => '15:00 - 15:45',
            'duration_minutes' => 45,
            'discount_percent' => 18,
            'price_idr' => 145000,
            'original_price_idr' => 175000,
            'is_flash_active' => true,
            'expires_at' => now()->addHours(4),
        ]);
        FlashSlot::create([
            'spa_id' => $spa4->id,
            'therapist_name' => 'Ibu Wayan',
            'service_name' => 'Nongsa Ocean Breeze Herbal Massage',
            'chair' => 'Oceanfront Pavilion 1',
            'time_window' => '16:00 - 17:00',
            'duration_minutes' => 60,
            'discount_percent' => 20,
            'price_idr' => 280000,
            'original_price_idr' => 350000,
            'is_flash_active' => true,
            'expires_at' => now()->addHours(3),
        ]);

        // 6. Seed Initial Bookings
        $booking1 = Booking::create([
            'booking_code' => 'ZEN-SG-8812',
            'spa_id' => $spa1->id,
            'tourist_id' => $tourist->id,
            'guest_name' => 'Alexandre Tan',
            'guest_phone' => '+65 9123 4567',
            'service_name' => 'Balinese Herbal Oil Deep Tissue',
            'therapist_name' => 'Ibu Ratna',
            'booking_time' => '14:15 - 15:15',
            'duration_minutes' => 60,
            'price_idr' => 200000,
            'price_sgd' => 16.88,
            'status' => 'confirmed',
            'ferry_time' => '16:30 Ferry (HarbourFront SG)',
            'medical_notes' => 'Pegal bahu & leher akibat duduk lama di kantor. Hindari minyak kacang.',
            'allergy_alert' => 'Alergi minyak kacang (Gunakan VCO)',
            'whatsapp_sent' => true,
        ]);

        $booking2 = Booking::create([
            'booking_code' => 'ZEN-SG-8813',
            'spa_id' => $spa1->id,
            'tourist_id' => null,
            'guest_name' => 'Grace Lim',
            'guest_phone' => '+65 8234 5678',
            'service_name' => 'Express Travel Foot & Calf Revival',
            'therapist_name' => 'Mas Budi',
            'booking_time' => '15:30 - 16:15',
            'duration_minutes' => 45,
            'price_idr' => 135000,
            'price_sgd' => 11.39,
            'status' => 'pending',
            'ferry_time' => '17:45 Ferry (HarbourFront SG)',
            'medical_notes' => 'Pegal telapak kaki setelah belanja mall.',
            'allergy_alert' => null,
            'whatsapp_sent' => false,
        ]);

        // 7. Seed Transactions
        Transaction::create([
            'transaction_ref' => 'TXN-SG-9901',
            'booking_id' => $booking1->id,
            'spa_id' => $spa1->id,
            'amount_sgd' => 16.88,
            'amount_idr' => 200000,
            'exchange_rate' => 11850.0,
            'platform_fee_idr' => 24000,
            'merchant_payout_idr' => 176000,
            'payment_method' => 'PayNow_SG',
            'payout_method' => 'BI_FAST',
            'status' => 'settled',
            'bi_fast_ref' => 'BIF-MDR-2026081501',
        ]);
    }
}
