<?php

namespace App\Services;

class WhatsAppCloudService
{
    /**
     * Build standard formatted WhatsApp reservation message payload.
     */
    public function formatBookingPayload(array $bookingData): string
    {
        $lines = [
            "Halo {$bookingData['spa_name']}! 👋",
            "Saya ingin konfirmasi reservasi via *Zentura Cross-Border Platform*:",
            "",
            "👤 *Nama Tamu:* {$bookingData['guest_name']}",
            "📱 *Kontak:* {$bookingData['guest_phone']}",
            "💆 *Layanan:* {$bookingData['service_name']} ({$bookingData['duration_minutes']} Menit)",
            "⏰ *Waktu:* {$bookingData['booking_time']} WIB",
            "🚢 *Feri Kepulangan:* {$bookingData['ferry_time']} (HarbourFront SG)",
            "💵 *Estimasi Tarif:* SGD {$bookingData['price_sgd']} (Rp " . number_format($bookingData['price_idr'], 0, ',', '.') . ")",
        ];

        if (!empty($bookingData['medical_notes'])) {
            $lines[] = "";
            $lines[] = "📋 *Catatan Medis / AI Brief:*";
            $lines[] = "_{$bookingData['medical_notes']}_";
        }

        if (!empty($bookingData['allergy_alert'])) {
            $lines[] = "";
            $lines[] = "⚠️ *Peringatan Alergi / Kondisi:* {$bookingData['allergy_alert']}";
        }

        $lines[] = "";
        $lines[] = "Mohon konfirmasi ketersediaan slot kursi ini. Terima kasih!";

        return implode("\n", $lines);
    }
}
