<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'ferry_terminal_id',
        'name',
        'description',
        'address',
        'latitude',
        'longitude',
        'price_sgd',
        'savings_percent',
        'rating',
        'image_url'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function ferryTerminal()
    {
        return $this->belongsTo(FerryTerminal::class);
    }

    /**
     * Scope query to find places near a given latitude/longitude using PostgreSQL PostGIS (with SQLite fallback)
     */
    public function scopeNearLocation($query, $lat, $lng, $distanceInMeters = 10000)
    {
        if (DB::getDriverName() === 'pgsql') {
            return $query->select('*')
                ->selectRaw(
                    "ST_DistanceSphere(location, ST_MakePoint(?, ?)) as distance_meters",
                    [$lng, $lat]
                )
                ->whereRaw(
                    "ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)",
                    [$lng, $lat, $distanceInMeters]
                )
                ->orderBy('distance_meters', 'asc');
        }

        return $query->select('*')
            ->selectRaw(
                "((latitude - ?) * (latitude - ?) + (longitude - ?) * (longitude - ?)) * 111320 as distance_meters",
                [$lat, $lat, $lng, $lng]
            )
            ->orderBy('distance_meters', 'asc');
    }
}
