<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
        'spa_id',
        'tourist_id',
        'guest_name',
        'guest_phone',
        'service_name',
        'therapist_name',
        'booking_time',
        'duration_minutes',
        'price_idr',
        'price_sgd',
        'status', // 'pending', 'confirmed', 'completed', 'cancelled'
        'ferry_time',
        'medical_notes',
        'allergy_alert',
        'whatsapp_sent',
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'price_idr' => 'integer',
        'price_sgd' => 'float',
        'whatsapp_sent' => 'boolean',
    ];

    public function spa()
    {
        return $this->belongsTo(Spa::class);
    }

    public function tourist()
    {
        return $this->belongsTo(User::class, 'tourist_id');
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }
}
