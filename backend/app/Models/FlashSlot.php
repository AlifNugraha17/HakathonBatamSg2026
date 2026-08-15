<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'spa_id',
        'therapist_name',
        'service_name',
        'chair',
        'time_window',
        'duration_minutes',
        'discount_percent',
        'price_idr',
        'original_price_idr',
        'is_flash_active',
        'expires_at',
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'discount_percent' => 'integer',
        'price_idr' => 'integer',
        'original_price_idr' => 'integer',
        'is_flash_active' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function spa()
    {
        return $this->belongsTo(Spa::class);
    }
}
