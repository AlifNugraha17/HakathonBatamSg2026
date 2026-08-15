<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Spa;
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
     * Treasury & Cross-Border FX Summary from database.
     */
    public function treasurySummary()
    {
        $transactions = Transaction::with('spa')->orderByDesc('id')->get();
        $totalSettledIdr = $transactions->where('status', 'settled')->sum('amount_idr');
        $totalSettledSgd = $transactions->where('status', 'settled')->sum('amount_sgd');
        $totalFeeIdr = $transactions->where('status', 'settled')->sum('platform_fee_idr');

        $payoutList = $transactions->map(function ($t) {
            return [
                'id' => 'tx-' . $t->id,
                'db_id' => $t->id,
                'ref' => $t->transaction_ref,
                'merchant_name' => $t->spa ? $t->spa->name : 'Martha Heritage Herbal Spa Grand Batam',
                'merchantName' => $t->spa ? $t->spa->name : 'Martha Heritage Herbal Spa Grand Batam',
                'gross_sgd' => $t->amount_sgd,
                'amountSgd' => $t->amount_sgd,
                'gross_idr' => $t->amount_idr,
                'amountIdr' => $t->amount_idr,
                'commission_idr' => $t->platform_fee_idr,
                'platformFeeIdr' => $t->platform_fee_idr,
                'payout_idr' => $t->merchant_payout_idr,
                'netPayoutIdr' => $t->merchant_payout_idr,
                'status' => $t->status,
                'payoutStatus' => $t->status,
                'channel' => 'BI-FAST (Mandiri)',
                'timestamp' => $t->created_at ? $t->created_at->toIso8601String() : now()->toIso8601String(),
                'date' => $t->created_at ? $t->created_at->format('Y-m-d H:i') : now()->format('Y-m-d H:i'),
            ];
        });

        return $this->successResponse([
            'total_settled_idr' => $totalSettledIdr,
            'total_settled_sgd' => $totalSettledSgd,
            'totalSettledIdr' => $totalSettledIdr,
            'totalSettledSgd' => $totalSettledSgd,
            'platform_take_rate_revenue_idr' => $totalFeeIdr,
            'platformFeeIdr' => $totalFeeIdr,
            'pending_payouts_idr' => 0,
            'active_exchange_rate' => 11850.00,
            'bi_fast_status' => 'CONNECTED (Bank Indonesia Gateway)',
            'recent_payouts' => $payoutList->values(),
        ]);
    }

    /**
     * Trigger manual / automated BI-FAST bank payout batch and persist transaction.
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

        $spa = Spa::first();

        $ref = $settlement['transaction_reference'] ?? ('BIF-' . strtoupper(bin2hex(random_bytes(4))));

        // Create transaction in database
        $txn = Transaction::create([
            'transaction_ref' => $ref,
            'spa_id' => $spa ? $spa->id : 1,
            'amount_sgd' => $request->amount_sgd,
            'amount_idr' => $calculation['gross_idr'],
            'exchange_rate' => $calculation['exchange_rate'] ?? 11850.0,
            'platform_fee_idr' => $calculation['platform_fee_idr'],
            'merchant_payout_idr' => $calculation['net_payout_idr'],
            'payment_method' => 'PayNow_SG',
            'payout_method' => 'BI_FAST',
            'status' => 'settled',
            'bi_fast_ref' => $ref,
        ]);

        return $this->successResponse([
            'transaction' => $txn,
            'calculation' => $calculation,
            'settlement' => $settlement,
        ], 'BI-FAST cross-border settlement successfully executed.');
    }
}
