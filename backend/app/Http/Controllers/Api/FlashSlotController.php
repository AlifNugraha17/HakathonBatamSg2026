<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FlashSlot;
use App\Models\Spa;
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
     * Micro-Moment Gap Matcher: Pairs ferry window with vacant chairs from the database.
     */
    public function matchGaps(Request $request)
    {
        $duration = (int) $request->query('duration', 45);
        $region = $request->query('region', 'batam');
        $maxDistance = (int) $request->query('max_distance', 10);

        $slotsQuery = FlashSlot::with('spa')->where('is_flash_active', true);

        $slots = $slotsQuery->get()->filter(function ($slot) use ($duration, $region, $maxDistance) {
            if (!$slot->spa) return false;
            $matchRegion = !$region || $region === 'all' || $slot->spa->region === $region;
            $matchDuration = !$duration || $slot->duration_minutes <= $duration;
            $matchDistance = !$maxDistance || $slot->spa->distance_minutes <= $maxDistance;
            return $matchRegion && $matchDuration && $matchDistance;
        })->values()->map(function ($slot) {
            $priceSgd = round($slot->price_idr / 11850, 2);
            $origPriceSgd = round($slot->original_price_idr / 11850, 2);

            return [
                'id' => 'slot-' . $slot->id,
                'db_id' => $slot->id,
                'spa_id' => 'salon-' . $slot->spa_id,
                'spa_name' => $slot->spa->name,
                'salonId' => 'salon-' . $slot->spa_id,
                'salonName' => $slot->spa->name,
                'salonLandmark' => $slot->spa->landmark,
                'terminal' => $slot->spa->landmark ?? 'Ferry Terminal Walkway',
                'distanceMinutes' => $slot->spa->distance_minutes,
                'distance_minutes' => $slot->spa->distance_minutes,
                'chair' => $slot->chair,
                'serviceName' => $slot->service_name,
                'service_name' => $slot->service_name,
                'durationMinutes' => $slot->duration_minutes,
                'duration_minutes' => $slot->duration_minutes,
                'discountPercent' => $slot->discount_percent,
                'discount_percent' => $slot->discount_percent,
                'original_price_sgd' => $origPriceSgd,
                'price_sgd' => $priceSgd,
                'priceIdr' => $slot->price_idr,
                'price_idr' => $slot->price_idr,
                'originalPriceIdr' => $slot->original_price_idr,
                'therapistName' => $slot->therapist_name,
                'therapist_name' => $slot->therapist_name,
                'hygieneScore' => $slot->spa->hygiene_score,
                'hygiene_score' => $slot->spa->hygiene_score,
                'salonPhone' => $slot->spa->phone,
                'salonImageUrl' => $slot->spa->image_url,
                'isFlashActive' => (bool) $slot->is_flash_active,
                'expiresInMinutes' => 30,
            ];
        });

        return $this->successResponse($slots);
    }

    /**
     * Merchant's active flash slots from database.
     */
    public function merchantSlots()
    {
        $spa = Spa::first();
        if (!$spa) {
            return $this->successResponse([]);
        }

        $slots = FlashSlot::where('spa_id', $spa->id)->orderByDesc('id')->get()->map(function ($s) {
            return [
                'id' => 'slot-' . $s->id,
                'db_id' => $s->id,
                'time' => $s->time_window ?? '14:30 - 15:30',
                'duration_minutes' => $s->duration_minutes,
                'durationMinutes' => $s->duration_minutes,
                'therapist_name' => $s->therapist_name,
                'therapistName' => $s->therapist_name,
                'discount_percent' => $s->discount_percent,
                'discountPercent' => $s->discount_percent,
                'chair' => $s->chair,
                'service_name' => $s->service_name,
                'serviceName' => $s->service_name,
                'price_idr' => $s->price_idr,
                'priceIdr' => $s->price_idr,
                'original_price_idr' => $s->original_price_idr,
                'originalPriceIdr' => $s->original_price_idr,
                'is_flash_active' => (bool) $s->is_flash_active,
                'isFlashActive' => (bool) $s->is_flash_active,
                'expires_in_minutes' => 30,
            ];
        });

        return $this->successResponse($slots);
    }

    /**
     * Broadcast a new dynamic flash slot to the database.
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

        $spa = Spa::first();
        $spaId = $spa ? $spa->id : 1;

        $originalPrice = $request->input('original_price_idr', (int) round($request->price_idr / (1 - ($request->discount_percent / 100))));

        $slot = FlashSlot::create([
            'spa_id' => $spaId,
            'therapist_name' => $request->therapist_name,
            'service_name' => $request->service_name,
            'chair' => $request->chair,
            'time_window' => $request->input('time_window', 'Next Available Window'),
            'duration_minutes' => $request->duration_minutes,
            'discount_percent' => $request->discount_percent,
            'price_idr' => $request->price_idr,
            'original_price_idr' => $originalPrice,
            'is_flash_active' => true,
            'expires_at' => now()->addMinutes(60),
        ]);

        return $this->successResponse([
            'id' => 'slot-' . $slot->id,
            'db_id' => $slot->id,
            'therapist_name' => $slot->therapist_name,
            'therapistName' => $slot->therapist_name,
            'service_name' => $slot->service_name,
            'serviceName' => $slot->service_name,
            'duration_minutes' => $slot->duration_minutes,
            'durationMinutes' => $slot->duration_minutes,
            'discount_percent' => $slot->discount_percent,
            'discountPercent' => $slot->discount_percent,
            'chair' => $slot->chair,
            'price_idr' => $slot->price_idr,
            'priceIdr' => $slot->price_idr,
            'original_price_idr' => $slot->original_price_idr,
            'is_flash_active' => true,
            'isFlashActive' => true,
            'broadcasted_at' => now()->toIso8601String(),
        ], 'Flash slot broadcasted live to ferry travelers.');
    }

    /**
     * Toggle flash slot active status in database.
     */
    public function toggleSlot($id)
    {
        $realId = str_replace('slot-', '', $id);
        $slot = FlashSlot::find($realId);
        if ($slot) {
            $slot->is_flash_active = !$slot->is_flash_active;
            $slot->save();
            return $this->successResponse($slot, 'Flash slot status toggled.');
        }
        return $this->errorResponse('Slot not found', 404);
    }

    /**
     * Remove a flash slot from database.
     */
    public function removeSlot($id)
    {
        $realId = str_replace('slot-', '', $id);
        $slot = FlashSlot::find($realId);
        if ($slot) {
            $slot->delete();
        }
        return $this->successResponse(null, 'Flash slot expired/removed.');
    }
}
