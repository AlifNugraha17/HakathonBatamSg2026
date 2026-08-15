<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Zentura Cross-Border Maritime Corridor Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration settings for the Singapore-Batam wellness network,
    | including FX rates, ferry terminal hubs, and simulation parameters.
    |
    */

    'corridor' => env('ZENTURA_CORRIDOR', 'singapore_batam'),

    'currency' => [
        'base' => 'IDR',
        'tourist' => 'SGD',
        'default_exchange_rate' => env('ZENTURA_FX_SGD_TO_IDR', 11850),
    ],

    'ferry_terminals' => [
        'singapore' => [
            'harbourfront' => 'HarbourFront Cruise and Ferry Centre',
            'tanah_merah' => 'Tanah Merah Ferry Terminal',
        ],
        'batam' => [
            'harbour_bay' => 'Batam Harbour Bay International Terminal (45 mins)',
            'batam_centre' => 'Batam Centre International Ferry Terminal (45 mins)',
            'nongsa_pura' => 'Nongsa Pura Ferry Terminal (35 mins)',
        ],
    ],

    'payouts' => [
        'mode' => env('ZENTURA_BIFAST_MODE', 'simulation'),
        'fee_percent' => 12.0, // 12% platform take rate
        'payout_system' => 'BI-FAST (Bank Indonesia Fast Payment)',
    ],

    'ai_nlp' => [
        'model' => 'Zentura-MedNLP-v3',
        'avg_latency_ms' => 185,
        'supported_tourist_languages' => ['en', 'zh', 'ko', 'ja'],
        'target_practitioner_language' => 'id',
    ],
];
