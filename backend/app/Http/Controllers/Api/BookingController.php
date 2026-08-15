<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WhatsAppCloudService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected WhatsAppCloudService $waService;

    public function __construct(WhatsAppCloudService $waService)
    {
        $this->waService = $waService;
    }

    /**
     * List user bookings.
     */
    public function index()
    {
        return $this->successResponse([
            [
                'id' => 'bk-1001',
                'booking_code' => 'ZEN-SG-2408',
                'spa_name' => 'Martha Heritage Herbal Spa Grand Batam',
                'guest_name' => 'Alexandre Tan',
                'guest_phone' => '+65 9123 4567',
                'service_name' => 'Balinese Herbal Oil Deep Tissue',
                'therapist_name' => 'Ibu Ratna',
                'booking_time' => 'Today, 14:15 WIB',
                'duration_minutes' => 60,
                'price_sgd' => 16.88,
                'price_idr' => 200000,
                'status' => 'confirmed',
                'ferry_time' => '16:30 Ferry (HarbourFront SG)',
                'medical_notes' => 'Pegal bahu kronis, tekanan kuat, hindari minyak kacang (VCO murni).',
                'allergy_alert' => 'Alergi minyak kacang',
                'whatsapp_sent' => true,
            ]
        ]);
    }

    /**
     * Create new booking.
     */
    public function store(Request $request)
    {
        $request->validate([
            'spa_id' => 'required',
            'guest_name' => 'required',
            'guest_phone' => 'required',
            'service_name' => 'required',
            'duration_minutes' => 'required|integer',
            'price_idr' => 'required|integer',
        ]);

        $bookingCode = 'ZEN-SG-' . rand(1000, 9999);
        $priceSgd = round($request->price_idr / 11850, 2);

        $booking = [
            'id' => 'bk-' . rand(2000, 9999),
            'booking_code' => $bookingCode,
            'spa_id' => $request->spa_id,
            'spa_name' => $request->input('spa_name', 'Martha Heritage Herbal Spa Grand Batam'),
            'guest_name' => $request->guest_name,
            'guest_phone' => $request->guest_phone,
            'service_name' => $request->service_name,
            'therapist_name' => $request->input('therapist_name', 'Senior Therapist'),
            'booking_time' => $request->input('booking_time', '14:30 WIB'),
            'duration_minutes' => $request->duration_minutes,
            'price_sgd' => $priceSgd,
            'price_idr' => $request->price_idr,
            'status' => 'pending',
            'ferry_time' => $request->input('ferry_time', '17:00 Ferry'),
            'medical_notes' => $request->input('medical_notes', ''),
            'allergy_alert' => $request->input('allergy_alert', ''),
            'whatsapp_sent' => false,
            'created_at' => now()->toIso8601String(),
        ];

        return $this->successResponse($booking, 'Booking successfully created.', 201);
    }

    /**
     * Format WhatsApp reservation payload.
     */
    public function generateWhatsAppPayload(Request $request)
    {
        $payload = $this->waService->formatBookingPayload($request->all());

        return $this->successResponse([
            'formatted_text' => $payload,
            'encoded_url' => 'https://wa.me/' . preg_replace('/\D/', '', $request->input('merchant_phone', '6281270088990')) . '?text=' . urlencode($payload),
        ]);
    }
}
