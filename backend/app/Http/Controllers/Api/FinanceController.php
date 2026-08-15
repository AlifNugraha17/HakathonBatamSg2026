<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BiFastPayoutService;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    protected BiFastPayoutService $payoutService;

    public function __construct(BiFastPayoutService $payoutService)
    {
        $this->payoutService = $payoutService;
    }

    /**
     * Treasury & Cross-Border FX Summary.
     */
    public function treasurySummary()
    {
        return $this->successResponse([
            'total_settled_idr' => 376659360,
            'total_settled_sgd' => 31785.60,
            'platform_take_rate_revenue_idr' => 51362640,
            'pending_payouts_idr' => 14220000,
            'active_exchange_rate' => 11850.00,
            'bi_fast_status' => 'CONNECTED (Bank Indonesia Gateway)',
            'recent_payouts' => [
                [
                    'id' => 'tx-801',
                    'ref' => 'BIF-9921-20260815',
                    'merchant_name' => 'Martha Heritage Herbal Spa Grand Batam',
                    'gross_sgd' => 180.00,
                    'gross_idr' => 2133000,
                    'commission_idr' => 255960,
                    'payout_idr' => 1877040,
                    'status' => 'settled',
                    'channel' => 'BI-FAST (Mandiri)',
                    'timestamp' => now()->subHours(2)->toIso8601String(),
                ],
                [
                    'id' => 'tx-802',
                    'ref' => 'BIF-9922-20260815',
                    'merchant_name' => 'Eska Wellness & Reflexology Harbour Bay',
                    'gross_sgd' => 125.00,
                    'gross_idr' => 1481250,
                    'commission_idr' => 177750,
                    'payout_idr' => 1303500,
                    'status' => 'settled',
                    'channel' => 'BI-FAST (BCA)',
                    'timestamp' => now()->subHours(4)->toIso8601String(),
                ]
            ]
        ]);
    }

    /**
     * Trigger manual / automated BI-FAST bank payout batch.
     */
    public function executeBiFastPayout(Request $request)
    {
        $request->validate([
            'merchant_name' => 'required',
            'amount_sgd' => 'required|numeric',
            'bank_code' => 'required',
            'account_number' => 'required',
        ]);

        $calculation = $this->payoutService->calculatePayout((float) $request->amount_sgd);
        $settlement = $this->payoutService->executeSettlement(
            $request->merchant_name,
            $request->bank_code,
            $request->account_number,
            $calculation['net_payout_idr']
        );

        return $this->successResponse([
            'calculation' => $calculation,
            'settlement' => $settlement,
        ], 'BI-FAST cross-border settlement successfully executed.');
    }
}
