<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Spa;
use App\Services\WhatsAppCloudService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class BookingController extends Controller
{
    protected WhatsAppCloudService $waService;

    public function __construct(WhatsAppCloudService $waService)
    {
        $this->waService = $waService;
    }

    /**
     * List bookings from the database with fast caching.
     */
    public function index(Request $request)
    {
        $spaId = $request->query('spa_id') ?: $request->query('spaId');
        $status = $request->query('status');
        $guestPhone = $request->query('guest_phone') ?: $request->query('phone');

        $cacheKey = "bookings_index_{$spaId}_{$status}_{$guestPhone}";

        $bookings = Cache::remember($cacheKey, 60, function () use ($spaId, $status, $guestPhone) {
            $query = Booking::with('spa')->orderByDesc('id');

            if ($spaId) {
                $realSpaId = (int) str_replace('salon-', '', (string) $spaId);
                $query->where('spa_id', $realSpaId);
            }

            if ($status) {
                $query->where('status', $status);
            }

            if ($guestPhone) {
                $query->where('guest_phone', $guestPhone);
            }

            return $query->get()->map(function ($b) {
                return [
                    'id' => 'bk-' . $b->id,
                    'db_id' => $b->id,
                    'booking_code' => $b->booking_code,
                    'bookingCode' => $b->booking_code,
                    'spa_id' => 'salon-' . $b->spa_id,
                    'salonId' => 'salon-' . $b->spa_id,
                    'spa_name' => $b->spa ? $b->spa->name : 'Martha Heritage Herbal Spa',
                    'salonName' => $b->spa ? $b->spa->name : 'Martha Heritage Herbal Spa',
                    'guest_name' => $b->guest_name,
                    'guestName' => $b->guest_name,
                    'guest_phone' => $b->guest_phone,
                    'guestPhone' => $b->guest_phone,
                    'service_name' => $b->service_name,
                    'serviceName' => $b->service_name,
                    'therapist_name' => $b->therapist_name ?? 'Senior Therapist',
                    'therapistName' => $b->therapist_name ?? 'Senior Therapist',
                    'booking_time' => $b->booking_time,
                    'timeSlot' => $b->booking_time,
                    'time' => $b->booking_time,
                    'duration_minutes' => $b->duration_minutes,
                    'durationMinutes' => $b->duration_minutes,
                    'price_sgd' => $b->price_sgd,
                    'priceSgd' => $b->price_sgd,
                    'price_idr' => $b->price_idr,
                    'priceIdr' => $b->price_idr,
                    'status' => $b->status,
                    'ferry_time' => $b->ferry_time,
                    'ferryTime' => $b->ferry_time,
                    'medical_notes' => $b->medical_notes,
                    'medicalNotes' => $b->medical_notes,
                    'allergy_alert' => $b->allergy_alert,
                    'allergyAlert' => $b->allergy_alert,
                    'whatsapp_sent' => (bool) $b->whatsapp_sent,
                    'createdAt' => $b->created_at ? $b->created_at->format('Y-m-d H:i') : now()->format('Y-m-d H:i'),
                ];
            });
        });

        return $this->successResponse($bookings);
    }

    /**
     * Create and persist new booking to the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'guest_name' => 'required',
            'guest_phone' => 'required',
            'service_name' => 'required',
            'duration_minutes' => 'required|integer',
            'price_idr' => 'required|integer',
        ]);

        $rawSpaId = $request->input('spa_id', '1');
        $realSpaId = (int) str_replace('salon-', '', (string) $rawSpaId);
        $spa = Spa::find($realSpaId) ?: Spa::first();

        $bookingCode = 'ZEN-' . strtoupper(Str::random(6));
        $priceIdr = (int) $request->input('price_idr');
        $priceSgd = round($priceIdr / 11850, 2);

        $booking = Booking::create([
            'booking_code' => $bookingCode,
            'spa_id' => $spa ? $spa->id : 1,
            'tourist_id' => null,
            'guest_name' => $request->input('guest_name'),
            'guest_phone' => $request->input('guest_phone'),
            'service_name' => $request->input('service_name'),
            'therapist_name' => $request->input('therapist_name', 'Senior Therapist'),
            'booking_time' => $request->input('booking_time', '14:30 WIB'),
            'duration_minutes' => (int) $request->input('duration_minutes', 60),
            'price_idr' => $priceIdr,
            'price_sgd' => $priceSgd,
            'status' => 'pending',
            'ferry_time' => $request->input('ferry_time', '17:00 Ferry'),
            'medical_notes' => $request->input('medical_notes', ''),
            'allergy_alert' => $request->input('allergy_alert', ''),
            'whatsapp_sent' => false,
        ]);

        // Flush cache on mutation
        Cache::flush();

        $formatted = [
            'id' => 'bk-' . $booking->id,
            'db_id' => $booking->id,
            'booking_code' => $booking->booking_code,
            'bookingCode' => $booking->booking_code,
            'spa_id' => 'salon-' . $booking->spa_id,
            'salonId' => 'salon-' . $booking->spa_id,
            'spa_name' => $spa ? $spa->name : 'Martha Heritage Herbal Spa',
            'salonName' => $spa ? $spa->name : 'Martha Heritage Herbal Spa',
            'guest_name' => $booking->guest_name,
            'guestName' => $booking->guest_name,
            'guest_phone' => $booking->guest_phone,
            'guestPhone' => $booking->guest_phone,
            'service_name' => $booking->service_name,
            'serviceName' => $booking->service_name,
            'therapist_name' => $booking->therapist_name,
            'therapistName' => $booking->therapist_name,
            'booking_time' => $booking->booking_time,
            'time' => $booking->booking_time,
            'duration_minutes' => $booking->duration_minutes,
            'durationMinutes' => $booking->duration_minutes,
            'price_sgd' => $booking->price_sgd,
            'priceSgd' => $booking->price_sgd,
            'price_idr' => $booking->price_idr,
            'priceIdr' => $booking->price_idr,
            'status' => $booking->status,
            'ferry_time' => $booking->ferry_time,
            'ferryTime' => $booking->ferry_time,
            'medical_notes' => $booking->medical_notes,
            'medicalNotes' => $booking->medical_notes,
            'allergy_alert' => $booking->allergy_alert,
            'allergyAlert' => $booking->allergy_alert,
        ];

        return $this->successResponse($formatted, 'Booking created and stored in Supabase database.');
    }

    /**
     * Get booking details.
     */
    public function show($id)
    {
        $realId = str_replace('bk-', '', $id);
        $booking = Booking::with('spa')->find($realId);

        if (!$booking) {
            return $this->errorResponse('Booking not found', 404);
        }

        return $this->successResponse($booking);
    }
}
