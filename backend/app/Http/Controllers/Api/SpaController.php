<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Spa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SpaController extends Controller
{
    /**
     * Vetted Spas across Singapore-Batam Ferry Zones (High Performance Caching).
     */
    public function index(Request $request)
    {
        $region = $request->query('region', 'all');
        $category = $request->query('category', 'all');
        $search = $request->query('search', '');

        $cacheKey = "spas_index_{$region}_{$category}_{$search}";

        $spas = Cache::remember($cacheKey, 60, function () use ($region, $category, $search) {
            $query = Spa::with(['services', 'therapists', 'flashSlots']);

            if ($region && $region !== 'all') {
                $query->where('region', $region);
            }

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('tagline', 'like', "%{$search}%")
                      ->orWhere('landmark', 'like', "%{$search}%");
                });
            }

            $list = $query->get()->map(function ($spa) {
                return [
                    'id' => 'salon-' . $spa->id,
                    'db_id' => $spa->id,
                    'name' => $spa->name,
                    'tagline' => $spa->tagline,
                    'region' => $spa->region,
                    'landmark' => $spa->landmark,
                    'distanceMinutes' => $spa->distance_minutes,
                    'distance_minutes' => $spa->distance_minutes,
                    'rating' => $spa->rating,
                    'reviewCount' => $spa->review_count,
                    'review_count' => $spa->review_count,
                    'hygieneScore' => $spa->hygiene_score,
                    'hygiene_score' => $spa->hygiene_score,
                    'hygieneBadges' => $spa->hygiene_badges ?? [],
                    'hygiene_badges' => $spa->hygiene_badges ?? [],
                    'phone' => $spa->phone,
                    'address' => $spa->address,
                    'imageUrl' => $spa->image_url,
                    'image_url' => $spa->image_url,
                    'gallery' => [
                        $spa->image_url,
                        'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
                        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
                    ],
                    'categories' => $spa->categories ?? ['massage', 'reflexology'],
                    'status' => $spa->status,
                    'commission_rate' => $spa->commission_rate,
                    'services' => $spa->services->map(function ($s) {
                        return [
                            'id' => 'srv-' . $s->id,
                            'db_id' => $s->id,
                            'name' => $s->name,
                            'durationMinutes' => $s->duration_minutes,
                            'duration_minutes' => $s->duration_minutes,
                            'priceIdr' => $s->price_idr,
                            'price_idr' => $s->price_idr,
                            'category' => $s->category,
                            'popular' => (bool) $s->popular,
                            'desc' => $s->desc,
                        ];
                    }),
                    'therapists' => $spa->therapists->map(function ($t) {
                        return [
                            'id' => 'th-' . $t->id,
                            'db_id' => $t->id,
                            'name' => $t->name,
                            'experience' => $t->experience,
                            'specialty' => $t->specialty,
                            'rating' => $t->rating,
                            'bnspCertified' => (bool) $t->bnsp_certified,
                            'bnsp_certified' => (bool) $t->bnsp_certified,
                            'status' => $t->status,
                        ];
                    }),
                    'flashSlots' => $spa->flashSlots->map(function ($f) {
                        return [
                            'id' => 'slot-' . $f->id,
                            'db_id' => $f->id,
                            'therapistName' => $f->therapist_name,
                            'therapist_name' => $f->therapist_name,
                            'serviceName' => $f->service_name,
                            'service_name' => $f->service_name,
                            'chair' => $f->chair,
                            'time' => $f->time_window,
                            'time_window' => $f->time_window,
                            'durationMinutes' => $f->duration_minutes,
                            'duration_minutes' => $f->duration_minutes,
                            'discountPercent' => $f->discount_percent,
                            'discount_percent' => $f->discount_percent,
                            'priceIdr' => $f->price_idr,
                            'price_idr' => $f->price_idr,
                            'originalPriceIdr' => $f->original_price_idr,
                            'original_price_idr' => $f->original_price_idr,
                            'isFlashActive' => (bool) $f->is_flash_active,
                            'is_flash_active' => (bool) $f->is_flash_active,
                            'expiresAt' => $f->expires_at ? $f->expires_at->toIso8601String() : null,
                            'expires_at' => $f->expires_at ? $f->expires_at->toIso8601String() : null,
                        ];
                    }),
                ];
            });

            if ($category && $category !== 'all') {
                $list = $list->filter(function ($spa) use ($category) {
                    return in_array($category, $spa['categories'] ?? []);
                })->values();
            }

            return $list;
        });

        return $this->successResponse($spas);
    }

    /**
     * Get single spa details.
     */
    public function show($id)
    {
        $realId = str_replace('salon-', '', $id);
        $spa = Spa::with(['services', 'therapists', 'flashSlots'])->find($realId);

        if (!$spa) {
            return $this->errorResponse('Spa center not found in registry', 404);
        }

        return $this->successResponse([
            'id' => 'salon-' . $spa->id,
            'db_id' => $spa->id,
            'name' => $spa->name,
            'tagline' => $spa->tagline,
            'region' => $spa->region,
            'landmark' => $spa->landmark,
            'distanceMinutes' => $spa->distance_minutes,
            'rating' => $spa->rating,
            'reviewCount' => $spa->review_count,
            'hygieneScore' => $spa->hygiene_score,
            'hygieneBadges' => $spa->hygiene_badges ?? [],
            'phone' => $spa->phone,
            'address' => $spa->address,
            'imageUrl' => $spa->image_url,
            'categories' => $spa->categories ?? [],
            'status' => $spa->status,
            'services' => $spa->services,
            'therapists' => $spa->therapists,
            'flashSlots' => $spa->flashSlots,
        ]);
    }
}
