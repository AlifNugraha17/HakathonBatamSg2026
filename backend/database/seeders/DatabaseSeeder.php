<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Spa;
use App\Models\Service;
use App\Models\Therapist;
use App\Models\FlashSlot;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with Singapore-Batam corridor records.
     */
    public function run(): void
    {
        // 1. Seed Core Users
        $admin = User::create([
            'name' => 'Super Admin HQ',
            'email' => 'admin@zentura.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'title' => 'Platform Master Admin',
        ]);

        $merchant = User::create([
            'name' => 'Ratna Dewi',
            'email' => 'partner@heritage-spa.id',
            'password' => bcrypt('password123'),
            'role' => 'merchant',
            'title' => 'Owner — Martha Tilaar Spa Grand Batam',
        ]);

        $tourist = User::create([
            'name' => 'Alexandre Tan',
            'email' => 'traveler@singapore.sg',
            'password' => bcrypt('password123'),
            'role' => 'tourist',
            'title' => 'Singapore Cross-Border Traveler',
        ]);

        // 2. Seed Vetted Spa
        $spa = Spa::create([
            'name' => 'Martha Heritage Herbal Spa Grand Batam',
            'tagline' => 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
            'owner_id' => $merchant->id,
            'region' => 'batam',
            'landmark' => '3 mins walk from Harbour Bay Ferry Terminal',
            'distance_minutes' => 3,
            'address' => 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
            'phone' => '+6281270088990',
            'rating' => 4.9,
            'review_count' => 248,
            'hygiene_score' => 99,
            'hygiene_badges' => ['Single-Use Organic Bed Linens', 'UV Sanitized Tools', '100% Certified Master Therapists'],
            'categories' => ['massage', 'reflexology', 'spa'],
            'status' => 'active',
            'commission_rate' => 12.0,
        ]);

        // 3. Seed Services
        Service::create([
            'spa_id' => $spa->id,
            'name' => 'Balinese Herbal Oil Deep Tissue',
            'duration_minutes' => 60,
            'price_idr' => 250000,
            'category' => 'massage',
            'popular' => true,
            'desc' => 'Traditional Indonesian palm kneading and warm infused ginger-clove oil targeting tight lower back and shoulder knots.',
        ]);

        // 4. Seed Therapists
        Therapist::create([
            'spa_id' => $spa->id,
            'name' => 'Ibu Ratna',
            'experience' => '12 yrs exp',
            'specialty' => 'Balinese Pressure & Acupressure',
            'rating' => 4.9,
            'bnsp_certified' => true,
            'status' => 'available',
        ]);

        // 5. Seed Live Flash Slot
        FlashSlot::create([
            'spa_id' => $spa->id,
            'therapist_name' => 'Ibu Ratna',
            'service_name' => 'Balinese Herbal Oil Deep Tissue',
            'chair' => 'Private VIP Room 1',
            'time_window' => '14:15 - 15:15',
            'duration_minutes' => 60,
            'discount_percent' => 20,
            'price_idr' => 200000,
            'original_price_idr' => 250000,
            'is_flash_active' => true,
            'expires_at' => now()->addMinutes(30),
        ]);
    }
}
