<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_ref',
        'booking_id',
        'spa_id',
        'amount_sgd',
        'amount_idr',
        'exchange_rate',
        'platform_fee_idr',
        'merchant_payout_idr',
        'payment_method', // 'PayNow_SG', 'CreditCard', 'QRIS'
        'payout_method',  // 'BI_FAST'
        'status',         // 'settled', 'processing', 'failed'
        'bi_fast_ref',
    ];

    protected $casts = [
        'amount_sgd' => 'float',
        'amount_idr' => 'integer',
        'exchange_rate' => 'float',
        'platform_fee_idr' => 'integer',
        'merchant_payout_idr' => 'integer',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function spa()
    {
        return $this->belongsTo(Spa::class);
    }
}
