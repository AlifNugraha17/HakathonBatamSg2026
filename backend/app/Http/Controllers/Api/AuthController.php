<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Authenticate user with dynamic role identification based on email.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $email = strtolower($request->email);
        $role = 'tourist';

        if (str_contains($email, 'admin') || $email === 'admin@zentura.com') {
            $role = 'admin';
            $user = [
                'id' => 'usr-admin',
                'name' => 'Super Admin HQ',
                'email' => $email,
                'role' => 'admin',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                'title' => 'Platform Master Admin',
                'permissions' => ['kyc_approvals', 'ai_logs_read', 'bi_fast_disbursements', 'system_config'],
            ];
        } elseif (str_contains($email, 'partner') || str_contains($email, 'merchant') || str_contains($email, 'spa') || $email === 'partner@heritage-spa.id') {
            $role = 'merchant';
            $user = [
                'id' => 'usr-merch',
                'name' => 'Ratna Dewi',
                'email' => $email,
                'role' => 'merchant',
                'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
                'title' => 'Owner — Martha Tilaar Spa Grand Batam',
                'spa_id' => 'salon-1',
                'permissions' => ['flash_slot_broadcast', 'order_management', 'therapist_roster'],
            ];
        } else {
            $user = [
                'id' => 'usr-tourist',
                'name' => 'Alexandre Tan',
                'email' => $email,
                'role' => 'tourist',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                'title' => 'Singapore Cross-Border Traveler',
                'permissions' => ['book_flash_slot', 'ai_translation', 'view_vetted_spas'],
            ];
        }

        return $this->successResponse([
            'user' => $user,
            'token' => 'zentura_mock_bearer_' . bin2hex(random_bytes(16)),
            'role' => $role,
        ], 'Successfully authenticated.');
    }

    /**
     * 1-Click direct role login for evaluators.
     */
    public function quickLogin(Request $request)
    {
        $role = $request->input('role', 'admin');
        
        $emailMap = [
            'admin' => 'admin@zentura.com',
            'merchant' => 'partner@heritage-spa.id',
            'tourist' => 'traveler@singapore.sg',
        ];

        $request->merge(['email' => $emailMap[$role] ?? 'admin@zentura.com', 'password' => 'password123']);
        return $this->login($request);
    }

    /**
     * Get authenticated user profile.
     */
    public function me(Request $request)
    {
        return $this->successResponse([
            'id' => 'usr-admin',
            'name' => 'Super Admin HQ',
            'email' => 'admin@zentura.com',
            'role' => 'admin',
        ]);
    }

    /**
     * Logout user.
     */
    public function logout()
    {
        return $this->successResponse(null, 'Signed out successfully.');
    }
}
