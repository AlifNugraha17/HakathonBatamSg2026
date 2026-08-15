<?php

namespace App\Services;

class YieldManagementService
{
    /**
     * Compute dynamic discount recommendation based on time left until ferry departure.
     */
    public function computeDynamicDiscount(int $minutesUntilFerry, int $basePriceIdr): array
    {
        // Shorter free transit window -> higher discount urgency to avoid dead chair time
        if ($minutesUntilFerry <= 40) {
            $discountPercent = 25;
        } elseif ($minutesUntilFerry <= 60) {
            $discountPercent = 20;
        } elseif ($minutesUntilFerry <= 90) {
            $discountPercent = 15;
        } else {
            $discountPercent = 10;
        }

        $discountAmount = (int) round($basePriceIdr * ($discountPercent / 100));
        $flashPriceIdr = $basePriceIdr - $discountAmount;

        return [
            'original_price_idr' => $basePriceIdr,
            'discount_percent' => $discountPercent,
            'discount_amount_idr' => $discountAmount,
            'flash_price_idr' => $flashPriceIdr,
            'flash_price_sgd' => round($flashPriceIdr / 11850, 2),
            'urgency_score' => $minutesUntilFerry < 45 ? 'HIGH' : 'MEDIUM',
        ];
    }
}
