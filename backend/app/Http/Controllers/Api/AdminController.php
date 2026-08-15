<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Executive Overview metrics.
     */
    public function metrics()
    {
        return $this->successResponse([
            'total_gmv_sgd' => 36120.00,
            'total_gmv_idr' => 428022000,
            'active_partners_count' => 24,
            'pending_kyc_count' => 2,
            'total_ai_queries' => 18450,
            'avg_edge_latency_ms' => 185,
            'flash_fill_rate_percent' => 84.2,
            'regional_distribution' => [
                ['zone' => 'Batam Harbour Bay (HarbourFront SG)', 'share' => 58],
                ['zone' => 'Batam Centre (Tanah Merah SG)', 'share' => 28],
                ['zone' => 'Nongsa Pura Coast (Tanah Merah SG)', 'share' => 14],
            ],
        ]);
    }

    /**
     * Merchant KYC Directory.
     */
    public function merchants()
    {
        return $this->successResponse([
            [
                'id' => 'merch-1',
                'name' => 'Martha Heritage Herbal Spa Grand Batam',
                'owner_name' => 'Ratna Dewi',
                'region' => 'batam',
                'city' => 'Harbour Bay, Batam',
                'hygiene_score' => 99,
                'status' => 'active',
                'kyc_verified' => true,
                'total_bookings' => 342,
            ],
            [
                'id' => 'merch-2',
                'name' => 'Eska Wellness & Reflexology Harbour Bay',
                'owner_name' => 'Santoso Wijaya',
                'region' => 'batam',
                'city' => 'Harbour Bay, Batam',
                'hygiene_score' => 98,
                'status' => 'active',
                'kyc_verified' => true,
                'total_bookings' => 280,
            ],
            [
                'id' => 'merch-3',
                'name' => 'Nongsa Pura Coastal Botanical Spa',
                'owner_name' => 'Ibu Wayan',
                'region' => 'batam_nongsa',
                'city' => 'Nongsa Coast, Batam',
                'hygiene_score' => 99,
                'status' => 'active',
                'kyc_verified' => true,
                'total_bookings' => 195,
            ],
            [
                'id' => 'merch-4',
                'name' => 'Nagoya Hill Reflexology Express',
                'owner_name' => 'Hendra Wijaya',
                'region' => 'batam',
                'city' => 'Nagoya, Batam',
                'hygiene_score' => 92,
                'status' => 'pending',
                'kyc_verified' => false,
                'total_bookings' => 0,
            ]
        ]);
    }

    /**
     * Approve Merchant KYC.
     */
    public function approveMerchant($id)
    {
        return $this->successResponse(['id' => $id, 'status' => 'active', 'kyc_verified' => true], 'Merchant partner approved.');
    }

    /**
     * Suspend Merchant.
     */
    public function suspendMerchant($id)
    {
        return $this->successResponse(['id' => $id, 'status' => 'suspended'], 'Merchant partner suspended.');
    }

    /**
     * User Directory.
     */
    public function users()
    {
        return $this->successResponse([
            [
                'id' => 'usr-101',
                'name' => 'Alexandre Tan',
                'email' => 'traveler@singapore.sg',
                'role' => 'tourist',
                'country' => 'Singapore',
                'status' => 'active',
            ],
            [
                'id' => 'usr-102',
                'name' => 'Ratna Dewi',
                'email' => 'partner@heritage-spa.id',
                'role' => 'merchant',
                'country' => 'Indonesia',
                'status' => 'active',
            ]
        ]);
    }

    /**
     * AI Health & Safety Query Stream.
     */
    public function aiLogs()
    {
        return $this->successResponse([
            [
                'id' => 'log-1',
                'tourist_input' => 'Severe shoulder tension, allergic to peanut oil, firm pressure.',
                'target_spa' => 'Martha Heritage Herbal Spa Grand Batam',
                'latency_ms' => 182,
                'safety_flag' => 'ALLERGY_ALERT (Peanut Oil)',
                'timestamp' => now()->subMinutes(5)->toIso8601String(),
            ]
        ]);
    }

    /**
     * Global System Settings.
     */
    public function settings()
    {
        return $this->successResponse([
            'corridor' => 'Singapore - Batam Maritime Wellness Network',
            'sgd_to_idr_exchange_rate' => 11850,
            'platform_commission_percent' => 12.0,
            'bi_fast_mode' => 'active_simulation',
            'nlp_model' => 'Zentura-MedNLP-v3',
        ]);
    }

    /**
     * Update Global Settings.
     */
    public function updateSettings(Request $request)
    {
        return $this->successResponse($request->all(), 'Global system configuration updated.');
    }
}
