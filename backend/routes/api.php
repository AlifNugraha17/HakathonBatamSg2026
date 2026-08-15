<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\BookingController;

/*
|--------------------------------------------------------------------------
| API Routes for SG ⇄ Batam Cross-Border Tourism Hub
|--------------------------------------------------------------------------
*/

Route::get('/places', [PlaceController::class, 'index']);
Route::get('/places/{id}', [PlaceController::class, 'show']);
Route::post('/bookings', [BookingController::class, 'store']);

// Live Exchange Rate API Endpoint (SGD ⇄ IDR)
Route::get('/exchange-rate', function () {
    try {
        $response = \Illuminate\Support\Facades\Http::timeout(3)->get('https://open.er-api.com/v6/latest/SGD');
        if ($response->successful()) {
            $data = $response->json();
            $rate = $data['rates']['IDR'] ?? 13920.00;
            return response()->json([
                'base' => 'SGD',
                'target' => 'IDR',
                'rate' => (float)$rate,
                'provider' => 'Open Exchange Rates API',
                'last_updated' => now()->toIso8601String()
            ]);
        }
    } catch (\Throwable $e) {
        // Fallback
    }

    return response()->json([
        'base' => 'SGD',
        'target' => 'IDR',
        'rate' => 13920.00,
        'provider' => 'Default 2026 Rate',
        'last_updated' => now()->toIso8601String()
    ]);
});

