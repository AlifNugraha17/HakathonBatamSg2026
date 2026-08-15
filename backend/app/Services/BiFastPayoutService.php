<?php

namespace App\Services;

class BiFastPayoutService
{
    /**
     * Calculate cross-border currency conversion & BI-FAST payout breakdown.
     */
    public function calculatePayout(float $amountSgd, float $exchangeRate = 11850.0, float $takeRatePercent = 12.0): array
    {
        $grossIdr = (int) round($amountSgd * $exchangeRate);
        $platformFeeIdr = (int) round($grossIdr * ($takeRatePercent / 100));
        $netPayoutIdr = $grossIdr - $platformFeeIdr;

        return [
            'amount_sgd' => $amountSgd,
            'exchange_rate' => $exchangeRate,
            'gross_idr' => $grossIdr,
            'platform_fee_idr' => $platformFeeIdr,
            'take_rate_percent' => $takeRatePercent,
            'net_payout_idr' => $netPayoutIdr,
            'payout_rail' => 'BI-FAST (Bank Indonesia)',
            'settlement_speed' => '< 15 seconds real-time',
        ];
    }

    /**
     * Simulate automated BI-FAST bank dispatch.
     */
    public function executeSettlement(string $merchantName, string $bankCode, string $accountNumber, int $amountIdr): array
    {
        $refNo = 'BIF-' . strtoupper(bin2hex(random_bytes(4))) . '-' . date('Ymd');

        return [
            'success' => true,
            'status' => 'settled',
            'transaction_reference' => $refNo,
            'merchant_name' => $merchantName,
            'destination_bank' => $bankCode,
            'account_masked' => substr($accountNumber, 0, 3) . '****' . substr($accountNumber, -3),
            'amount_idr' => $amountIdr,
            'executed_at' => now()->toIso8601String(),
            'message' => 'BI-FAST cross-border settlement dispatched directly to merchant bank account.',
        ];
    }
}
