<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    /**
     * Vetted Spas across Singapore-Batam Ferry Zones.
     */
    public function index(Request $request)
    {
        $region = $request->query('region', 'all');

        $spas = [
            [
                'id' => 'salon-1',
                'name' => 'Martha Heritage Herbal Spa Grand Batam',
                'tagline' => 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
                'region' => 'batam',
                'landmark' => '3 mins walk from Harbour Bay Ferry Terminal',
                'distance_minutes' => 3,
                'rating' => 4.9,
                'review_count' => 248,
                'hygiene_score' => 99,
                'hygiene_badges' => [
                    'Single-Use Organic Bed Linens',
                    'UV Sanitized Tools (Hospital Grade)',
                    '100% Certified Master Therapists',
                ],
                'phone' => '+6281270088990',
                'address' => 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
                'image_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
                'categories' => ['massage', 'reflexology', 'spa'],
                'open_now' => true,
            ],
            [
                'id' => 'salon-2',
                'name' => 'Eska Wellness & Reflexology Harbour Bay',
                'tagline' => 'Modern Hydrotherapy & Rapid Pre-Ferry Decompression',
                'region' => 'batam',
                'landmark' => 'Directly linked to Harbour Bay Ferry Terminal Walkway',
                'distance_minutes' => 2,
                'rating' => 4.85,
                'review_count' => 312,
                'hygiene_score' => 98,
                'hygiene_badges' => [
                    'Medical Grade Sanitization',
                    'Disposable Slippers & Underwear',
                    'BNSP Licensed Senior Practitioners',
                ],
                'phone' => '+6281364551122',
                'address' => 'Bayfront Promenade Block C-12, Harbour Bay, Batam',
                'image_url' => 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
                'categories' => ['massage', 'reflexology', 'headspa'],
                'open_now' => true,
            ],
            [
                'id' => 'salon-3',
                'name' => 'Nagoya Hill Reflexology & Aromatherapy Sanctuary',
                'tagline' => 'Premium Thai Acupressure & Reflexology Center',
                'region' => 'batam_centre',
                'landmark' => '5 mins from Batam Centre Ferry Terminal',
                'distance_minutes' => 5,
                'rating' => 4.78,
                'review_count' => 194,
                'hygiene_score' => 96,
                'hygiene_badges' => [
                    'Fresh Laundered Sheets Every Guest',
                    'UV Sterilized Hot Towel Cabinets',
                ],
                'phone' => '+6281233445566',
                'address' => 'Nagoya City Walk Complex Blok A No. 1-3, Batam',
                'image_url' => 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
                'categories' => ['reflexology', 'massage'],
                'open_now' => true,
            ],
            [
                'id' => 'salon-4',
                'name' => 'Nongsa Pura Coastal Botanical Spa',
                'tagline' => 'Seaside Pavilion Relaxation by the Marina',
                'region' => 'batam_nongsa',
                'landmark' => '2 mins walk from Nongsa Pura Ferry Terminal',
                'distance_minutes' => 2,
                'rating' => 4.95,
                'review_count' => 180,
                'hygiene_score' => 99,
                'hygiene_badges' => [
                    'Private Oceanfront Suites',
                    'Single-Use Organic Bed Linens',
                    'Hospital Grade Autoclave Tools',
                ],
                'phone' => '+6281198765432',
                'address' => 'Nongsa Marina Promenade, Nongsa, Batam',
                'image_url' => 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
                'categories' => ['massage', 'spa', 'reflexology'],
                'open_now' => true,
            ],
        ];

        if ($region !== 'all') {
            $spas = array_values(array_filter($spas, fn($s) => $s['region'] === $region));
        }

        return $this->successResponse($spas);
    }

    /**
     * Get single spa details.
     */
    public function show($id)
    {
        return $this->successResponse([
            'id' => $id,
            'name' => 'Martha Heritage Herbal Spa Grand Batam',
            'region' => 'batam',
            'hygiene_score' => 99,
            'operating_hours' => '09:00 - 22:00 (WIB)',
        ]);
    }
}
