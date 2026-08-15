<?php

namespace App\Services;

class AiTouristService
{
    /**
     * Generate an intelligent cross-border tourist itinerary.
     */
    public function generateItinerary(array $params): array
    {
        $days = (int) ($params['days'] ?? 1);
        $travelStyle = $params['travel_style'] ?? 'medical_wellness';
        $port = $params['port'] ?? 'harbourfront-sg';
        $targetPort = $params['target_port'] ?? 'harbour-bay';
        $budgetSgd = (float) ($params['budget_sgd'] ?? 250);
        $passengerCount = (int) ($params['passengers'] ?? 1);
        $exchangeRate = 13920.0;

        $itinerary = [];
        $totalEstimatedSgd = 0;
        $totalBenchmarkSgd = 0;

        // Day 1 Schedule
        $day1Items = [];

        // 1. Ferry Departure
        $day1Items[] = [
            'time' => '08:00 - 08:45',
            'title' => 'Ferry Departure from Singapore',
            'location' => $port === 'tanah-merah-sg' ? 'Tanah Merah Ferry Terminal (SG)' : 'HarbourFront Ferry Terminal (SG)',
            'category' => 'transport',
            'description' => 'Board BatamFast / Majestic Fast Ferry express crossing to Batam (45 minutes voyage). Pass through modern biometric e-gates.',
            'cost_sgd' => 38.00 * $passengerCount,
            'cost_idr' => 38.00 * $passengerCount * $exchangeRate,
            'tips' => 'Arrive 45 mins early for baggage check-in. Singapore passport holders enjoy auto-gate lanes.'
        ];

        if ($travelStyle === 'medical_wellness' || $travelStyle === 'medical') {
            $day1Items[] = [
                'time' => '09:15 - 12:00',
                'title' => 'Executive Medical Screening / Specialist Checkup',
                'location' => 'RS Awal Bros Batam — Executive Health Centre',
                'category' => 'medical',
                'description' => 'Comprehensive executive health screening including 1.5 Tesla MRI / CT-Scan, comprehensive blood panel, and immediate consultation with English-speaking specialists.',
                'cost_sgd' => 280.00 * $passengerCount,
                'cost_idr' => 280.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 880.00 * $passengerCount,
                'tips' => 'Fasting 8-10 hours prior to blood test. VIP clinic liaison picks up directly at terminal.'
            ];
            $day1Items[] = [
                'time' => '12:30 - 14:00',
                'title' => 'Aesthetic Cafe Lunch & Specialty Coffee',
                'location' => 'Mula Cafe & Eatery / Malaya Kopitiam Nagoya',
                'category' => 'dining',
                'description' => 'Artisan brunch, freshly baked croffles, authentic kaya toast, and specialty Indonesian single-origin coffee.',
                'cost_sgd' => 14.00 * $passengerCount,
                'cost_idr' => 14.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 38.00 * $passengerCount,
                'tips' => 'Try the signature avocado coffee and salted egg croissants.'
            ];
            $day1Items[] = [
                'time' => '14:30 - 16:30',
                'title' => 'Post-Checkup Nusantara Herbal Spa & Reflexology',
                'location' => 'Royal Heritage Spa & Wellness / Eska Harbour Bay',
                'category' => 'wellness',
                'description' => '120-minute restorative warm stone herbal massage and traditional lulur scrub for complete stress relief.',
                'cost_sgd' => 45.00 * $passengerCount,
                'cost_idr' => 45.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 180.00 * $passengerCount,
                'tips' => 'Inform therapist of your pressure preferences using the AI Medical Translation Studio.'
            ];
        } elseif ($travelStyle === 'leisure_beach') {
            $day1Items[] = [
                'time' => '09:30 - 13:00',
                'title' => 'White Sand Beach & Water Sports Adventure',
                'location' => 'Pantai Elyora / Pantai Viovio Barelang Bridge',
                'category' => 'tourism',
                'description' => 'Pristine turquoise waters, aesthetic overwater swings, jet-skiing, and picturesque photo spots at Barelang Bridge.',
                'cost_sgd' => 20.00 * $passengerCount,
                'cost_idr' => 20.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 65.00 * $passengerCount,
                'tips' => 'Rent a private charter car (approx $50 SGD for 8 hours) for easy travel to Barelang bridges.'
            ];
            $day1Items[] = [
                'time' => '13:30 - 15:30',
                'title' => 'Live Seafood Feast Over the Water (Kelong 168)',
                'location' => 'Restoran Seafood Kelong Barelang 168',
                'category' => 'dining',
                'description' => 'Fresh black pepper crab, live steamed lobster, chili gonggong snails, and butter garlic prawns directly caught from sea enclosures.',
                'cost_sgd' => 35.00 * $passengerCount,
                'cost_idr' => 35.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 120.00 * $passengerCount,
                'tips' => 'Order the fresh young coconut and steamed garoupa in Hong Kong style.'
            ];
        } else {
            // Golf & Resort
            $day1Items[] = [
                'time' => '09:30 - 14:00',
                'title' => '18-Hole Championship Ocean Golf Course',
                'location' => 'Palm Springs Golf & Beach Resort Nongsa',
                'category' => 'golf',
                'description' => 'World-class 18-hole championship golf facing the Singapore Straits with professional caddie service and clubhouse lunch.',
                'cost_sgd' => 130.00 * $passengerCount,
                'cost_idr' => 130.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 420.00 * $passengerCount,
                'tips' => 'Complimentary buggy and caddie included in package.'
            ];
        }

        // Evening / Sunset & Return
        if ($days === 1) {
            $day1Items[] = [
                'time' => '17:00 - 18:30',
                'title' => 'Waterfront Sunset Drinks & Duty-Free Shopping',
                'location' => 'Level Up Floating Bar & Grand Batam Mall',
                'category' => 'leisure',
                'description' => 'Sunset mocktails overlooking Singapore skyline, duty-free shopping for Indonesian chocolates, layer cake (Kue Lapis), and spa aromas.',
                'cost_sgd' => 20.00 * $passengerCount,
                'cost_idr' => 20.00 * $passengerCount * $exchangeRate,
                'benchmark_sg_sgd' => 50.00 * $passengerCount,
                'tips' => 'Duty free allowance entering SG: 1L spirits, 1L wine, 1L beer for travelers away >48h.'
            ];
            $day1Items[] = [
                'time' => '19:00 - 19:45',
                'title' => 'Return Express Ferry to Singapore',
                'location' => 'Harbour Bay Terminal / Batam Centre',
                'category' => 'transport',
                'description' => 'Comfortable return ferry back to Singapore HarbourFront / Tanah Merah. Submit SG Arrival Card online before landing.',
                'cost_sgd' => 38.00 * $passengerCount,
                'cost_idr' => 38.00 * $passengerCount * $exchangeRate,
                'tips' => 'Fill up your SG Arrival Card on MyICA mobile app 3 days prior or on the ferry.'
            ];
        }

        $itinerary[] = [
            'day' => 1,
            'title' => 'Day 1: Singapore ⇄ Batam Essential Escape',
            'activities' => $day1Items
        ];

        // If 2 days, add Day 2
        if ($days >= 2) {
            $day2Items = [
                [
                    'time' => '08:30 - 10:00',
                    'title' => 'Resort Breakfast & Tropical Pool Relaxation',
                    'location' => 'Batam View Beach Resort / Montigo Resorts Nongsa',
                    'category' => 'leisure',
                    'description' => 'Infinity pool relaxation facing the South China Sea, seaside morning walk, and international buffet breakfast.',
                    'cost_sgd' => 25.00 * $passengerCount,
                    'cost_idr' => 25.00 * $passengerCount * $exchangeRate,
                ],
                [
                    'time' => '10:30 - 12:30',
                    'title' => 'Nagoya Dental Whitening & Aesthetic Smile Care',
                    'location' => 'Nagoya Dental Wellness Centre',
                    'category' => 'medical',
                    'description' => 'Professional laser teeth bleaching and ultrasonic scaling by certified orthodontic specialists.',
                    'cost_sgd' => 180.00 * $passengerCount,
                    'cost_idr' => 180.00 * $passengerCount * $exchangeRate,
                    'benchmark_sg_sgd' => 650.00 * $passengerCount,
                ],
                [
                    'time' => '13:00 - 15:30',
                    'title' => 'One Batam Mall Gourmet Food Trail & Souvenir Hunt',
                    'location' => 'One Batam Mall Sky Garden',
                    'category' => 'dining',
                    'description' => 'Authentic Batam noodle soup (Mie Lendir), fresh layered sponge cake, and duty-free souvenirs.',
                    'cost_sgd' => 20.00 * $passengerCount,
                    'cost_idr' => 20.00 * $passengerCount * $exchangeRate,
                ],
                [
                    'time' => '17:00 - 18:00',
                    'title' => 'Return Ferry to Singapore HarbourFront',
                    'location' => 'Harbour Bay Ferry Terminal',
                    'category' => 'transport',
                    'description' => 'Board afternoon return ferry arriving safely at HarbourFront SG before dinner.',
                    'cost_sgd' => 38.00 * $passengerCount,
                    'cost_idr' => 38.00 * $passengerCount * $exchangeRate,
                ]
            ];

            $itinerary[] = [
                'day' => 2,
                'title' => 'Day 2: Dental Beauty, Lifestyle & Return Crossing',
                'activities' => $day2Items
            ];
        }

        // Calculate totals and savings
        foreach ($itinerary as $day) {
            foreach ($day['activities'] as $act) {
                $totalEstimatedSgd += $act['cost_sgd'] ?? 0;
                $totalBenchmarkSgd += $act['benchmark_sg_sgd'] ?? ($act['cost_sgd'] * 2.5);
            }
        }

        $totalEstimatedIdr = $totalEstimatedSgd * $exchangeRate;
        $totalSavingsSgd = max(0, $totalBenchmarkSgd - $totalEstimatedSgd);
        $savingsPercentage = $totalBenchmarkSgd > 0 ? round(($totalSavingsSgd / $totalBenchmarkSgd) * 100) : 65;

        return [
            'id' => 'itin_' . uniqid(),
            'generated_at' => now()->toISOString(),
            'trip_parameters' => [
                'days' => $days,
                'travel_style' => $travelStyle,
                'port' => $port,
                'target_port' => $targetPort,
                'passengers' => $passengerCount,
                'exchange_rate' => $exchangeRate,
            ],
            'financial_summary' => [
                'total_estimated_sgd' => round($totalEstimatedSgd, 2),
                'total_estimated_idr' => round($totalEstimatedIdr),
                'singapore_benchmark_sgd' => round($totalBenchmarkSgd, 2),
                'total_savings_sgd' => round($totalSavingsSgd, 2),
                'savings_percentage' => $savingsPercentage,
            ],
            'days' => $itinerary,
            'ai_insights' => [
                'ferry_safety' => 'Batam immigration now features e-gates for biometric passports, cutting clearance times to under 3 minutes.',
                'currency_tip' => 'Most clinics and cafes accept Singapore credit cards (Visa/Mastercard) and SG PayNow via QRIS cross-border payments with real-time rate.',
                'medical_note' => 'RS Awal Bros & RS BP Batam provide medical screening reports in English with official clinical stamp.',
            ]
        ];
    }

    /**
     * Interactive AI Cross-Border Tourist Travel & Health Advisor Chat
     */
    public function touristChat(string $query, array $context = []): array
    {
        $q = strtolower(trim($query));
        $reply = '';
        $actionChips = [];
        $category = 'general';

        if (str_contains($q, 'visa') || str_contains($q, 'passport') || str_contains($q, 'e-voa') || str_contains($q, 'immigration')) {
            $category = 'immigration';
            $reply = "🇸🇬 **Informasi Visa & Imigrasi Singapura ⇄ Batam:**\n\n" .
                "1. **Warga Negara Singapura:** Bebas Visa Kunjungan (Visa-Free) hingga 30 hari untuk tujuan wisata & medis.\n" .
                "2. **Paspor:** Wajib memiliki masa berlaku paspor minimal **6 bulan** dari tanggal keberangkatan.\n" .
                "3. **Auto-Gate & E-Pass:** Terminal Harbour Bay dan Batam Centre telah dilengkapi auto-gate biometrik cepat.\n" .
                "4. **SG Arrival Card:** Sebelum kembali ke Singapura, isi deklarasi kesehatan online di aplikasi *MyICA* (maksimal 3 hari sebelum tiba).";
            $actionChips = ['Cek Jadwal Feri', 'Lokasi Terminal Feri', 'Biaya Medical Checkup'];
        } elseif (str_contains($q, 'mri') || str_contains($q, 'medical') || str_contains($q, 'hospital') || str_contains($q, 'rumah sakit') || str_contains($q, 'checkup') || str_contains($q, 'dokter')) {
            $category = 'medical';
            $reply = "🏥 **Rekomendasi Layanan Medis & RS Unggulan di Batam:**\n\n" .
                "• **RS Awal Bros Batam (Baloi):** Spesialis Executive Medical Checkup, MRI 1.5 Tesla, CT-Scan 128-slice (~$280 SGD vs ~$920 SGD di Singapura, hemat ~68%).\n" .
                "• **RS BP Batam (Sekupang):** Pusat Jantung Kateterisasi (Cath Lab) & Terapi Oksigen Hiperbarik (~$220 SGD).\n" .
                "• **RS Budi Kemuliaan (Seraya):** Operasi Katarak Phaco & Laser Mata LASIK Presisi (~$240 SGD).\n" .
                "• **Nagoya Dental Wellness:** Bleaching gigi & Implan Titanium (~$180 SGD vs ~$650 SGD di Singapura).\n\n" .
                "Semua dokter spesialis fasih berbahasa Inggris & laporan medis dicetak dalam bahasa Inggris.";
            $actionChips = ['Buka AI Translation Studio', 'Lihat Daftar 23 RS & Klinik', 'Kalkulator Hemat SGD'];
        } elseif (str_contains($q, 'ferry') || str_contains($q, 'feri') || str_contains($q, 'kapal') || str_contains($q, 'harbourfront') || str_contains($q, 'tanah merah')) {
            $category = 'ferry';
            $reply = "🚢 **Panduan Kapal Feri Lintas Batas (SG ⇄ Batam):**\n\n" .
                "• **Rute Paling Populer:** HarbourFront SG ⇄ Batam Harbour Bay (45 menit, langsung ke pusat belanja & hotel Nagoya).\n" .
                "• **Rute Pusat Bisnis:** Tanah Merah / HarbourFront SG ⇄ Batam Centre (45-50 menit).\n" .
                "• **Rute Wisata Golf/Resort:** Tanah Merah SG ⇄ Nongsa Pura (40 menit).\n" .
                "• **Operator:** BatamFast, Majestic Fast Ferry, Sindo Ferry.\n" .
                "• **Tarif Tiket:** Sekitar $38 SGD sekali jalan ($73-$76 SGD PP termasuk sea tax).";
            $actionChips = ['Lihat Jadwal Feri Real-Time', 'Rute ke Harbour Bay', 'Booking Feri'];
        } elseif (str_contains($q, 'paynow') || str_contains($q, 'bayar') || str_contains($q, 'uang') || str_contains($q, 'currency') || str_contains($q, 'kurs') || str_contains($q, 'sgd') || str_contains($q, 'idr')) {
            $category = 'payment';
            $reply = "💰 **Metode Pembayaran & Transparansi Kurs SGD / IDR:**\n\n" .
                "• **Kurs Hari Ini:** 1 SGD ≈ Rp 13.920 IDR (Transparan tanpa biaya tersembunyi).\n" .
                "• **SG PayNow / QRIS:** Sebagian besar merchant, klinik, dan restoran di Batam menerima pembayaran scan QRIS yang langsung terkoneksi dengan aplikasi bank Singapura (DBS PayLah!, OCBC, UOB TMRW).\n" .
                "• **Kartu Kredit/Debit:** Visa & Mastercard diterima luas di rumah sakit, resort, dan mall.\n" .
                "• **Uang Tunai:** ATM tersedia di seluruh terminal pelabuhan dan pusat kota.";
            $actionChips = ['Kalkulator Kurs Live', 'Price Check OCR', 'Estimasi Biaya'];
        } else {
            $category = 'general';
            $reply = "👋 **Halo! Saya Asisten AI LokaBatam Concierge.**\n\n" .
                "Saya dapat membantu Anda merencanakan perjalanan medis, spa, dan liburan terbaik antara Singapura dan Batam:\n\n" .
                "1. 🏥 Rekomendasi Rumah Sakit, MRI, Dokter Spesialis, & Perawatan Gigi berstandar internasional.\n" .
                "2. 🚢 Jadwal Kapal Feri, auto-gate biometrik, dan panduan pelabuhan (HarbourFront / Harbour Bay).\n" .
                "3. 💰 Kalkulasi penghematan biaya (hemat hingga 70% vs RS Singapura).\n" .
                "4. 🗣️ AI Translation Studio untuk menerjemahkan keluhan medis & permintaan terapis secara instan.\n" .
                "5. 📅 Pembuatan jadwal rencana perjalanan (AI Smart Itinerary) 1 hingga 3 hari.";
            $actionChips = ['Buat Rencana 1 Hari', 'Daftar RS & Klinik Batam', 'Jadwal Feri SG-Batam', 'Cek Kurs SGD/IDR'];
        }

        return [
            'reply' => $reply,
            'category' => $category,
            'action_chips' => $actionChips,
            'timestamp' => now()->toISOString(),
        ];
    }
}
