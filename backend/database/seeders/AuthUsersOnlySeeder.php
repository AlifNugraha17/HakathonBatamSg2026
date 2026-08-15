<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthUsersOnlySeeder extends Seeder
{
    /**
     * Seed only the core authentication accounts with 0 dummy spa/booking records.
     */
    public function run(): void
    {
        // 1. Super Admin HQ
        User::create([
            'name' => 'Super Admin HQ',
            'email' => 'admin@zentura.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'title' => 'Platform Master Admin',
            'country' => 'Singapore',
            'phone' => '+65 8123 9900',
            'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        ]);

        // 2. Merchant Partner Owner
        User::create([
            'name' => 'Ratna Dewi',
            'email' => 'partner@heritage-spa.id',
            'password' => Hash::make('password123'),
            'role' => 'merchant',
            'title' => 'Owner — Local MSME Wellness',
            'country' => 'Indonesia',
            'phone' => '+62 812 7008 8990',
            'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        ]);

        // 3. Tourist Traveler
        User::create([
            'name' => 'Alexandre Tan',
            'email' => 'traveler@singapore.sg',
            'password' => Hash::make('password123'),
            'role' => 'tourist',
            'title' => 'Singapore Maritime Traveler',
            'country' => 'Singapore',
            'phone' => '+65 9123 4567',
            'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        ]);
    }
}
