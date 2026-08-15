<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flash_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spa_id')->constrained('spas')->cascadeOnDelete();
            $table->string('therapist_name');
            $table->string('service_name');
            $table->string('chair')->default('Chair 1');
            $table->string('time_window')->nullable();
            $table->integer('duration_minutes')->default(45);
            $table->integer('discount_percent')->default(20);
            $table->bigInteger('price_idr');
            $table->bigInteger('original_price_idr');
            $table->boolean('is_flash_active')->default(true);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flash_slots');
    }
};
