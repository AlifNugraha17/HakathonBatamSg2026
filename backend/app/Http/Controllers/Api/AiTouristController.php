<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AiTouristService;
use App\Services\AiTranslationService;
use Illuminate\Http\Request;

class AiTouristController extends Controller
{
    protected AiTouristService $touristService;
    protected AiTranslationService $translationService;

    public function __construct(AiTouristService $touristService, AiTranslationService $translationService)
    {
        $this->touristService = $touristService;
        $this->translationService = $translationService;
    }

    /**
     * Generate custom personalized cross-border itinerary with AI.
     */
    public function generateItinerary(Request $request)
    {
        $params = $request->all();
        $result = $this->touristService->generateItinerary($params);

        return $this->successResponse($result, 'AI smart cross-border itinerary generated successfully.');
    }

    /**
     * Interactive AI Tourist & Medical Travel Advisor Chat.
     */
    public function chat(Request $request)
    {
        $input = $request->input('message') ?: $request->input('query') ?: $request->input('prompt') ?: 'What are the best hospitals near Harbour Bay?';
        $result = $this->touristService->touristChat($input);

        return $this->successResponse($result, 'AI response generated successfully.');
    }

    /**
     * Multilingual Clinical & Wellness Translation.
     */
    public function translate(Request $request)
    {
        $request->validate([
            'text' => 'required|string|min:3',
        ]);

        $result = $this->translationService->translateMedicalComplaint($request->input('text'));

        return $this->successResponse($result, 'AI medical instruction brief generated successfully.');
    }
}
