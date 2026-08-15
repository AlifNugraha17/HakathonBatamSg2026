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

/*
|--------------------------------------------------------------------------
| API Routes for Zentura (Singapore - Batam Maritime Platform)
|--------------------------------------------------------------------------
*/

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

    // AI Medical & Linguistic Translation Studio
    Route::post('/ai/translate-medical', [AiTranslationController::class, 'translate']);
    Route::get('/ai/presets', [AiTranslationController::class, 'presets']);

    // Bookings & WhatsApp Payload Generator
    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingController::class, 'index']);
        Route::post('/', [BookingController::class, 'store']);
        Route::get('/{id}', [BookingController::class, 'show']);
        Route::post('/generate-whatsapp-payload', [BookingController::class, 'generateWhatsAppPayload']);
    });

    // 3. Merchant Partner Portal
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

    // 4. Super Admin HQ Console
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard-metrics', [AdminController::class, 'metrics']);
        Route::get('/merchants', [AdminController::class, 'merchants']);
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
