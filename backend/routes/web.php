<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'platform' => 'Zentura Cross-Border Maritime Wellness API',
        'corridor' => 'Singapore - Batam',
        'status' => 'operational',
        'version' => '1.0.0',
        'documentation' => '/api/v1/health',
    ]);
});
