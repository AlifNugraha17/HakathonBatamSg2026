<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AiTranslationService;
use Illuminate\Http\Request;

class AiTranslationController extends Controller
{
    protected AiTranslationService $aiService;

    public function __construct(AiTranslationService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * Translate multi-lingual tourist complaint into structured Indonesian therapist brief card.
     */
    public function translate(Request $request)
    {
        $request->validate([
            'text' => 'required|string|min:3',
        ]);

        $result = $this->aiService->translateMedicalComplaint($request->text);

        return $this->successResponse($result, 'AI medical instruction brief generated successfully.');
    }

    /**
     * Sample prompt presets.
     */
    public function presets()
    {
        return $this->successResponse([
            [
                'id' => 'shoulder',
                'title_en' => 'Shoulder Knots + No Peanut Oil',
                'title_id' => 'Pegal Bahu + Tanpa Minyak Kacang',
                'prompt' => 'Chronic neck and shoulder stiffness, please avoid peanut massage oil due to skin allergy, prefer firm pressure.',
            ],
            [
                'id' => 'pregnancy',
                'title_en' => 'Pregnancy 16 Wks (Gentle)',
                'title_id' => 'Ibu Hamil 16 Minggu (Lembut)',
                'prompt' => 'Guest is 16 weeks pregnant, gentle relaxing foot and leg relief only.',
            ],
            [
                'id' => 'ferry',
                'title_en' => 'Express 30m Before 16:30 Ferry',
                'title_id' => 'Refleksi Kilat 30m Sebelum Feri 16:30',
                'prompt' => 'Quick express 30 min reflexology, need to catch the 16:30 ferry back to HarbourFront Singapore.',
            ],
        ]);
    }
}
