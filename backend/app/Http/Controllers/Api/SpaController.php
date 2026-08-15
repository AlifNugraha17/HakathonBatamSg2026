<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Models\Spa;
use App\Models\Doctor;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    /**
     * Vetted Destinations (Hospitals, Dental, Clinics, Wellness, Seafood, Beaches, Golf) across Singapore-Batam.
     */
    public function index(Request $request)
    {
        $places = Place::with(['category', 'ferryTerminal'])->get();

        if ($places->isNotEmpty()) {
            $doctors = Doctor::all();

            $list = $places->map(function ($p) use ($doctors) {
                $categorySlug = $p->category ? $p->category->slug : $p->type;
                $terminalName = $p->ferryTerminal ? $p->ferryTerminal->name : 'Harbour Bay Ferry Terminal';

                return [
                    'id' => 'salon-' . $p->id,
                    'db_id' => $p->id,
                    'name' => $p->name,
                    'tagline' => $p->description,
                    'region' => 'batam',
                    'landmark' => 'Near ' . $terminalName,
                    'distanceMinutes' => 5,
                    'distance_minutes' => 5,
                    'rating' => (float) $p->rating,
                    'reviewCount' => 180 + ($p->id * 15),
                    'review_count' => 180 + ($p->id * 15),
                    'hygieneScore' => 99,
                    'hygiene_score' => 99,
                    'hygieneBadges' => [
                        'KARS / ISO Accredited',
                        'English Speaking Specialists',
                        'Real-time SGD Currency Rate',
                        'Express Ferry VIP Liaison'
                    ],
                    'hygiene_badges' => [
                        'KARS / ISO Accredited',
                        'English Speaking Specialists',
                        'Real-time SGD Currency Rate',
                        'Express Ferry VIP Liaison'
                    ],
                    'phone' => $p->phone ?: '+62 778 431 777',
                    'address' => $p->address,
                    'imageUrl' => $p->image_url,
                    'image_url' => $p->image_url,
                    'gallery' => [
                        $p->image_url,
                        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                    ],
                    'categories' => [$categorySlug, $p->type ?: 'medical'],
                    'price_sgd' => (float) $p->price_sgd,
                    'price_idr' => (float) $p->price_idr,
                    'savings_percent' => (int) $p->savings_percent,
                    'status' => 'active',
                    'commission_rate' => 12.0,
                    'services' => [
                        [
                            'id' => 'srv-1',
                            'name' => $p->type === 'dental' ? 'Laser Teeth Bleaching & Implan' : ($p->type === 'medical' ? 'Executive Health Screening + MRI 1.5T' : 'Nusantara Herbal Relaxation'),
                            'durationMinutes' => 60,
                            'duration_minutes' => 60,
                            'priceIdr' => (int) ($p->price_idr ?: 1500000),
                            'price_idr' => (int) ($p->price_idr ?: 1500000),
                            'category' => $categorySlug,
                            'popular' => true,
                            'desc' => $p->description,
                        ]
                    ],
                    'therapists' => $doctors->map(function ($d) {
                        return [
                            'id' => 'th-' . $d->id,
                            'db_id' => $d->id,
                            'name' => $d->name,
                            'experience' => $d->degree ?: 'Senior Specialist',
                            'specialty' => $d->specialization,
                            'rating' => (float) $d->rating,
                            'bnspCertified' => true,
                            'bnsp_certified' => true,
                            'status' => 'available',
                        ];
                    }),
                    'flashSlots' => [
                        [
                            'id' => 'slot-1',
                            'db_id' => 1,
                            'therapistName' => 'dr. Bambang Hermanto, Sp.JP',
                            'therapist_name' => 'dr. Bambang Hermanto, Sp.JP',
                            'serviceName' => 'Executive Health Screening Slot',
                            'service_name' => 'Executive Health Screening Slot',
                            'chair' => 'VIP Suite 1',
                            'time' => '10:00 - 11:30',
                            'time_window' => '10:00 - 11:30',
                            'durationMinutes' => 90,
                            'duration_minutes' => 90,
                            'discountPercent' => 20,
                            'discount_percent' => 20,
                            'priceIdr' => (int) ($p->price_idr ?: 2800000),
                            'price_idr' => (int) ($p->price_idr ?: 2800000),
                            'originalPriceIdr' => (int) (($p->price_idr ?: 2800000) * 1.25),
                            'original_price_idr' => (int) (($p->price_idr ?: 2800000) * 1.25),
                            'isFlashActive' => true,
                            'is_flash_active' => true,
                            'expiresAt' => now()->addHours(3)->toIso8601String(),
                            'expires_at' => now()->addHours(3)->toIso8601String(),
                        ]
                    ]
                ];
            });

            return $this->successResponse($list);
        }

        // Fallback to Spa if Place empty
        $spas = Spa::with(['services', 'therapists', 'flashSlots'])->get();
        return $this->successResponse($spas);
    }

    /**
     * Get single destination details.
     */
    public function show($id)
    {
        $realId = str_replace('salon-', '', $id);
        $place = Place::with(['category', 'ferryTerminal'])->find($realId);

        if ($place) {
            $doctors = Doctor::where('place_id', $place->id)->get();
            return $this->successResponse([
                'id' => 'salon-' . $place->id,
                'db_id' => $place->id,
                'name' => $place->name,
                'tagline' => $place->description,
                'address' => $place->address,
                'rating' => (float) $place->rating,
                'price_sgd' => (float) $place->price_sgd,
                'price_idr' => (float) $place->price_idr,
                'imageUrl' => $place->image_url,
                'phone' => $place->phone,
                'doctors' => $doctors,
            ]);
        }

        $spa = Spa::with(['services', 'therapists', 'flashSlots'])->find($realId);
        if (!$spa) {
            return $this->errorResponse('Destination not found', 404);
        }

        return $this->successResponse($spa);
    }
}
