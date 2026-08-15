<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\MerchantController;
use App\Http\Controllers\Api\SpaController;
use App\Http\Controllers\Api\FlashSlotController;
use App\Http\Controllers\Api\AiTranslationController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\EnhancedTourismController;

/*
|--------------------------------------------------------------------------
| API Routes for LokaBatam (SG ⇄ Batam Cross-Border Tourism Hub)
|--------------------------------------------------------------------------
*/

// =========================================================================
// 1. Cross-Border Public API Endpoints (HakathonBatamSg2026 Core)
// =========================================================================

Route::get('/places', [PlaceController::class, 'index']);
Route::get('/places/{id}', [PlaceController::class, 'show']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);

// Enhanced Tourism API Endpoints
Route::get('/ferry-schedules', [EnhancedTourismController::class, 'ferrySchedules']);
Route::get('/fair-prices', [EnhancedTourismController::class, 'fairPrices']);
Route::get('/doctors', [EnhancedTourismController::class, 'doctors']);
Route::get('/itinerary-packages', [EnhancedTourismController::class, 'itineraryPackages']);

// Root AI Endpoints
Route::post('/ai/translate-medical', [\App\Http\Controllers\Api\AiTouristController::class, 'translate']);
Route::post('/ai/generate-itinerary', [\App\Http\Controllers\Api\AiTouristController::class, 'generateItinerary']);
Route::get('/ai/generate-itinerary', [\App\Http\Controllers\Api\AiTouristController::class, 'generateItinerary']);
Route::post('/ai/tourist-chat', [\App\Http\Controllers\Api\AiTouristController::class, 'chat']);
Route::get('/ai/tourist-chat', [\App\Http\Controllers\Api\AiTouristController::class, 'chat']);

// Verified Reviews & Ratings Endpoints
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::post('/reviews/{id}/helpful', [ReviewController::class, 'helpful']);

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


// =========================================================================
// 2. Multi-Role Portal APIs (Admin, Merchant, Tourist & Auth)
// =========================================================================

Route::prefix('v1')->group(function () {
    
    // Health & System Info
    Route::get('/health', function () {
        return response()->json([
            'status' => 'healthy',
            'corridor' => 'Singapore - Batam',
            'timestamp' => now()->toISOString(),
            'supported_ferry_ports' => ['HarbourFront', 'Tanah Merah', 'Harbour Bay', 'Batam Centre', 'Nongsa Pura'],
        ]);
    });

    // 1. Authentication
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/quick-login', [AuthController::class, 'quickLogin']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // 2. Public / Tourist Concierge Endpoints
    Route::prefix('spas')->group(function () {
        Route::get('/', [SpaController::class, 'index']);
        Route::get('/{id}', [SpaController::class, 'show']);
        Route::get('/{id}/services', [SpaController::class, 'services']);
        Route::get('/{id}/slots', [SpaController::class, 'slots']);
    });

    // Dynamic Micro-Moment Gap Matcher
    Route::get('/matcher/find-gaps', [FlashSlotController::class, 'matchGaps']);

    // AI Medical & Linguistic Translation Studio + Smart Itinerary Generator + Tourist Concierge
    Route::post('/ai/translate-medical', [\App\Http\Controllers\Api\AiTouristController::class, 'translate']);
    Route::post('/ai/generate-itinerary', [\App\Http\Controllers\Api\AiTouristController::class, 'generateItinerary']);
    Route::get('/ai/generate-itinerary', [\App\Http\Controllers\Api\AiTouristController::class, 'generateItinerary']);
    Route::post('/ai/tourist-chat', [\App\Http\Controllers\Api\AiTouristController::class, 'chat']);
    Route::get('/ai/tourist-chat', [\App\Http\Controllers\Api\AiTouristController::class, 'chat']);
    Route::get('/ai/presets', [AiTranslationController::class, 'presets']);

    // Bookings & WhatsApp Payload Generator
    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingController::class, 'index']);
        Route::post('/', [BookingController::class, 'store']);
        Route::get('/{id}', [BookingController::class, 'show']);
        Route::post('/generate-whatsapp-payload', [BookingController::class, 'generateWhatsAppPayload']);
    });

    // 3. Healthcare & Destination Partner Portal
    Route::prefix('merchant')->group(function () {
        Route::get('/overview', [MerchantController::class, 'overview']);
        Route::get('/orders', [MerchantController::class, 'orders']);
        Route::post('/orders/{id}/status', [MerchantController::class, 'updateOrderStatus']);
        Route::get('/slots', [FlashSlotController::class, 'merchantSlots']);
        Route::post('/slots/broadcast', [FlashSlotController::class, 'broadcastSlot']);
        Route::delete('/slots/{id}', [FlashSlotController::class, 'removeSlot']);
        Route::get('/therapists', [MerchantController::class, 'therapists']);
        Route::get('/profile', [MerchantController::class, 'profile']);
        Route::put('/profile', [MerchantController::class, 'updateProfile']);
    });

    Route::prefix('partner')->group(function () {
        Route::get('/overview', [MerchantController::class, 'overview']);
        Route::get('/orders', [MerchantController::class, 'orders']);
        Route::post('/orders/{id}/status', [MerchantController::class, 'updateOrderStatus']);
        Route::get('/slots', [FlashSlotController::class, 'merchantSlots']);
        Route::post('/slots/broadcast', [FlashSlotController::class, 'broadcastSlot']);
        Route::delete('/slots/{id}', [FlashSlotController::class, 'removeSlot']);
        Route::get('/therapists', [MerchantController::class, 'therapists']);
        Route::get('/profile', [MerchantController::class, 'profile']);
        Route::put('/profile', [MerchantController::class, 'updateProfile']);
    });

    // 4. Super Admin HQ Console
    Route::prefix('admin')->group(function () {
        Route::get('/metrics', [AdminController::class, 'metrics']);
        Route::get('/dashboard-metrics', [AdminController::class, 'metrics']);
        Route::get('/merchants', [AdminController::class, 'merchants']);
        Route::get('/partners', [AdminController::class, 'merchants']);
        Route::post('/merchants/{id}/approve', [AdminController::class, 'approveMerchant']);
        Route::post('/merchants/{id}/suspend', [AdminController::class, 'suspendMerchant']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/ai-logs', [AdminController::class, 'aiLogs']);
        Route::get('/treasury-summary', [FinanceController::class, 'treasurySummary']);
        Route::post('/payouts/execute-bi-fast', [FinanceController::class, 'executeBiFastPayout']);
        Route::get('/settings', [AdminController::class, 'settings']);
        Route::put('/settings', [AdminController::class, 'updateSettings']);
    });
});
