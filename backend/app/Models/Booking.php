<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'whatsapp_sent' => 'boolean',
        'is_flash_deal' => 'boolean',
    ];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function pickupTerminal()
    {
        return $this->belongsTo(FerryTerminal::class, 'pickup_terminal_id');
    }
}
