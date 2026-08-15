<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MerchantController extends Controller
{
    /**
     * Merchant Overview KPIs & Performance.
     */
    public function overview()
    {
        return $this->successResponse([
            'salon_name' => 'Martha Heritage Herbal Spa Grand Batam',
            'location' => 'Batam Harbour Bay Ferry Terminal Walkway',
            'hygiene_score' => 99,
            'today_occupancy' => '88.5%',
            'today_revenue_idr' => 4850000,
            'today_revenue_sgd' => 409.28,
            'active_chairs' => 6,
            'total_chairs' => 8,
            'active_therapists' => 4,
            'incoming_bookings_count' => 3,
        ]);
    }

    /**
     * Incoming Tourist Orders.
     */
    public function orders()
    {
        return $this->successResponse([
            [
                'id' => 'ord-901',
                'booking_code' => 'ZEN-SG-8812',
                'guest_name' => 'Alexandre Tan',
                'guest_phone' => '+65 9123 4567',
                'service_name' => 'Balinese Herbal Oil Deep Tissue',
                'therapist_name' => 'Ibu Ratna',
                'time_slot' => '14:15 - 15:15',
                'duration_minutes' => 60,
                'price_sgd' => 16.88,
                'price_idr' => 200000,
                'status' => 'confirmed',
                'ferry_time' => '16:30 Ferry (HarbourFront SG)',
                'medical_brief' => 'Pegal pundak kronis. Pasien alergi minyak kacang, wajib VCO murni.',
                'allergy_flag' => true,
            ],
            [
                'id' => 'ord-902',
                'booking_code' => 'ZEN-SG-8813',
                'guest_name' => 'Grace Lim',
                'guest_phone' => '+65 8234 5678',
                'service_name' => 'Express Travel Foot & Calf Revival',
                'therapist_name' => 'Mas Budi',
                'time_slot' => '15:30 - 16:15',
                'duration_minutes' => 45,
                'price_sgd' => 11.39,
                'price_idr' => 135000,
                'status' => 'pending',
                'ferry_time' => '17:45 Ferry (HarbourFront SG)',
                'medical_brief' => 'Pegal telapak kaki setelah belanja, tekanan sedang.',
                'allergy_flag' => false,
            ]
        ]);
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:confirmed,completed,cancelled']);

        return $this->successResponse([
            'id' => $id,
            'status' => $request->status,
            'updated_at' => now()->toIso8601String(),
        ], "Order status updated to {$request->status}.");
    }

    /**
     * Therapist Roster & BNSP Accreditations.
     */
    public function therapists()
    {
        return $this->successResponse([
            [
                'id' => 'th-1',
                'name' => 'Ibu Ratna',
                'experience' => '12 yrs exp',
                'specialty' => 'Balinese Pressure & Acupressure',
                'rating' => 4.9,
                'bnsp_certified' => true,
                'status' => 'in_service',
            ],
            [
                'id' => 'th-2',
                'name' => 'Mas Budi',
                'experience' => '8 yrs exp',
                'specialty' => 'Reflexology & Sciatica Release',
                'rating' => 4.8,
                'bnsp_certified' => true,
                'status' => 'available',
            ],
            [
                'id' => 'th-3',
                'name' => 'Mbak Dewi',
                'experience' => '6 yrs exp',
                'specialty' => 'Aroma Therapy & Head Spa',
                'rating' => 4.9,
                'bnsp_certified' => true,
                'status' => 'available',
            ],
        ]);
    }

    /**
     * Spa Profile and Sanitation Compliance.
     */
    public function profile()
    {
        return $this->successResponse([
            'name' => 'Martha Heritage Herbal Spa Grand Batam',
            'hygiene_score' => 99,
            'region' => 'batam',
            'address' => 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
            'operating_hours' => '09:00 - 22:00 (WIB)',
            'bank_account' => [
                'bank' => 'Bank Mandiri (Batam Branch)',
                'account_number' => '109-00-1234567-8',
                'account_name' => 'PT Martha Heritage Batam',
                'bi_fast_id' => 'MDRIDJA1XXX',
            ]
        ]);
    }
}
