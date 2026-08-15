<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\YieldManagementService;
use Illuminate\Http\Request;

class FlashSlotController extends Controller
{
    protected YieldManagementService $yieldService;

    public function __construct(YieldManagementService $yieldService)
    {
        $this->yieldService = $yieldService;
    }

    /**
     * Micro-Moment Gap Matcher: Pairs ferry window with vacant chairs.
     */
    public function matchGaps(Request $request)
    {
        $duration = (int) $request->query('duration', 45);
        $terminal = $request->query('terminal', 'harbour_bay');

        $matchedSlots = [
            [
                'id' => 'slot-101',
                'spa_name' => 'Martha Heritage Herbal Spa Grand Batam',
                'terminal' => 'Harbour Bay Ferry Terminal (3 mins walk)',
                'chair' => 'Private VIP Room 1',
                'service_name' => 'Balinese Herbal Oil Deep Tissue',
                'duration_minutes' => $duration,
                'discount_percent' => 20,
                'original_price_sgd' => round(($duration * 1.0), 2),
                'price_sgd' => round(($duration * 0.8), 2),
                'price_idr' => (int) round($duration * 0.8 * 11850),
                'therapist_name' => 'Ibu Ratna',
                'hygiene_score' => 99,
            ],
            [
                'id' => 'slot-201',
                'spa_name' => 'Eska Wellness & Reflexology Harbour Bay',
                'terminal' => 'Harbour Bay Ferry Walkway (2 mins walk)',
                'chair' => 'Chair 4 (Fast Track)',
                'service_name' => 'Express Travel Foot & Shoulder Blitz',
                'duration_minutes' => $duration,
                'discount_percent' => 25,
                'original_price_sgd' => round(($duration * 0.95), 2),
                'price_sgd' => round(($duration * 0.71), 2),
                'price_idr' => (int) round($duration * 0.71 * 11850),
                'therapist_name' => 'Kak Sarah',
                'hygiene_score' => 98,
            ],
        ];

        return $this->successResponse($matchedSlots);
    }

    /**
     * Merchant's active flash slots.
     */
    public function merchantSlots()
    {
        return $this->successResponse([
            [
                'id' => 'slot-101',
                'time' => '14:15 - 15:15',
                'duration_minutes' => 60,
                'therapist_name' => 'Ibu Ratna',
                'discount_percent' => 20,
                'chair' => 'Private VIP Room 1',
                'service_name' => 'Balinese Herbal Oil Deep Tissue',
                'price_idr' => 200000,
                'original_price_idr' => 250000,
                'is_flash_active' => true,
                'expires_in_minutes' => 12,
            ],
        ]);
    }

    /**
     * Broadcast a new dynamic flash slot.
     */
    public function broadcastSlot(Request $request)
    {
        $request->validate([
            'therapist_name' => 'required',
            'service_name' => 'required',
            'duration_minutes' => 'required|integer',
            'discount_percent' => 'required|integer',
            'chair' => 'required',
            'price_idr' => 'required|integer',
        ]);

        return $this->successResponse([
            'id' => 'slot-' . rand(1000, 9999),
            'therapist_name' => $request->therapist_name,
            'service_name' => $request->service_name,
            'duration_minutes' => $request->duration_minutes,
            'discount_percent' => $request->discount_percent,
            'chair' => $request->chair,
            'price_idr' => $request->price_idr,
            'is_flash_active' => true,
            'broadcasted_at' => now()->toIso8601String(),
        ], 'Flash slot broadcasted live to ferry travelers.');
    }

    /**
     * Remove a flash slot.
     */
    public function removeSlot($id)
    {
        return $this->successResponse(null, 'Flash slot expired/removed.');
    }
}
