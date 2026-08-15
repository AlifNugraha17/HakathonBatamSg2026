<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'spa_id',
        'name',
        'duration_minutes',
        'price_idr',
        'category',
        'popular',
        'desc',
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'price_idr' => 'integer',
        'popular' => 'boolean',
    ];

    public function spa()
    {
        return $this->belongsTo(Spa::class);
    }
}
