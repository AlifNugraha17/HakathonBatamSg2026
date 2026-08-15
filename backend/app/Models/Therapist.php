<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Therapist extends Model
{
    use HasFactory;

    protected $fillable = [
        'spa_id',
        'name',
        'experience',
        'specialty',
        'rating',
        'bnsp_certified',
        'status', // 'available', 'in_service', 'off_duty'
    ];

    protected $casts = [
        'rating' => 'float',
        'bnsp_certified' => 'boolean',
    ];

    public function spa()
    {
        return $this->belongsTo(Spa::class);
    }
}
