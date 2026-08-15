<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->foreignId('spa_id')->constrained('spas')->cascadeOnDelete();
            $table->foreignId('tourist_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('guest_name');
            $table->string('guest_phone');
            $table->string('service_name');
            $table->string('therapist_name')->nullable();
            $table->string('booking_time');
            $table->integer('duration_minutes')->default(60);
            $table->bigInteger('price_idr');
            $table->float('price_sgd', 8, 2);
            $table->string('status')->default('pending'); // 'pending', 'confirmed', 'completed', 'cancelled'
            $table->string('ferry_time')->nullable();
            $table->text('medical_notes')->nullable();
            $table->string('allergy_alert')->nullable();
            $table->boolean('whatsapp_sent')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
