<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spa extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'tagline',
        'owner_id',
        'region', // 'batam', 'batam_centre', 'batam_nongsa'
        'landmark',
        'distance_minutes',
        'address',
        'phone',
        'rating',
        'review_count',
        'hygiene_score',
        'hygiene_badges',
        'categories',
        'image_url',
        'status', // 'active', 'pending', 'suspended'
        'commission_rate',
    ];

    protected $casts = [
        'hygiene_badges' => 'array',
        'categories' => 'array',
        'rating' => 'float',
        'hygiene_score' => 'integer',
        'distance_minutes' => 'integer',
        'commission_rate' => 'float',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function therapists()
    {
        return $this->hasMany(Therapist::class);
    }

    public function flashSlots()
    {
        return $this->hasMany(FlashSlot::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
