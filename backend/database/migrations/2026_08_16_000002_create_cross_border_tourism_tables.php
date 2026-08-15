<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Categories (Hospital, Dental, Clinic, Wellness, Seafood, Beach, Golf, Cafe)
        if (!Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('icon')->nullable();
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }

        // 2. Ferry Terminals
        if (!Schema::hasTable('ferry_terminals')) {
            Schema::create('ferry_terminals', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('city'); // Singapore or Batam
                $table->decimal('latitude', 10, 8)->nullable();
                $table->decimal('longitude', 11, 8)->nullable();
                $table->timestamps();
            });
        }

        // 3. Places (Hospitals, Clinics, Dental, Spas, Seafood, Beaches, Golf)
        if (!Schema::hasTable('places')) {
            Schema::create('places', function (Blueprint $table) {
                $table->id();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->foreignId('ferry_terminal_id')->nullable()->constrained('ferry_terminals')->nullOnDelete();
                $table->string('name');
                $table->text('description')->nullable();
                $table->text('address')->nullable();
                $table->decimal('latitude', 10, 8)->nullable();
                $table->decimal('longitude', 11, 8)->nullable();
                $table->decimal('price_sgd', 10, 2)->default(0);
                $table->decimal('price_idr', 14, 2)->default(0);
                $table->integer('savings_percent')->default(50);
                $table->decimal('rating', 3, 2)->default(4.80);
                $table->string('image_url')->nullable();
                $table->string('phone')->nullable();
                $table->string('type')->default('medical'); // medical, dental, wellness, dining, tourism, golf
                $table->boolean('is_featured')->default(false);
                $table->timestamps();
            });
        }

        // 4. Doctors & Medical Specialists
        if (!Schema::hasTable('doctors')) {
            Schema::create('doctors', function (Blueprint $table) {
                $table->id();
                $table->foreignId('place_id')->constrained('places')->cascadeOnDelete();
                $table->string('name');
                $table->string('specialization'); // e.g. Cardiologist, Orthopedic, Dental Aesthetic, Cataract Surgeon
                $table->string('degree')->nullable();
                $table->string('languages_spoken')->default('English, Indonesian, Malay, Mandarin');
                $table->decimal('consultation_fee_sgd', 8, 2)->default(45.00);
                $table->decimal('consultation_fee_idr', 12, 2)->default(600000);
                $table->string('schedule_days')->default('Mon - Sat (09:00 - 17:00)');
                $table->decimal('rating', 3, 2)->default(4.90);
                $table->string('avatar_url')->nullable();
                $table->timestamps();
            });
        }

        // 5. Ferry Schedules
        if (!Schema::hasTable('ferry_schedules')) {
            Schema::create('ferry_schedules', function (Blueprint $table) {
                $table->id();
                $table->foreignId('departure_terminal_id')->constrained('ferry_terminals')->cascadeOnDelete();
                $table->foreignId('arrival_terminal_id')->constrained('ferry_terminals')->cascadeOnDelete();
                $table->string('operator_name'); // BatamFast, Majestic, Sindo
                $table->time('departure_time');
                $table->time('arrival_time');
                $table->decimal('price_sgd', 8, 2)->default(38.00);
                $table->decimal('price_idr', 12, 2)->default(500000);
                $table->string('days_available')->default('Daily');
                $table->timestamps();
            });
        }

        // 6. Fair Price Benchmarks
        if (!Schema::hasTable('fair_price_benchmarks')) {
            Schema::create('fair_price_benchmarks', function (Blueprint $table) {
                $table->id();
                $table->string('category');
                $table->string('item_name');
                $table->decimal('fair_price_min_idr', 12, 2);
                $table->decimal('fair_price_max_idr', 12, 2);
                $table->decimal('price_sgd_benchmark', 8, 2)->default(0);
                $table->string('unit')->default('per item/session');
                $table->decimal('warning_threshold_idr', 12, 2)->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        // 7. Itinerary Packages
        if (!Schema::hasTable('itinerary_packages')) {
            Schema::create('itinerary_packages', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->integer('duration_days')->default(1);
                $table->string('theme'); // medical, dental, wellness, family, golf
                $table->decimal('price_sgd', 10, 2);
                $table->decimal('savings_sgd', 10, 2);
                $table->text('highlights')->nullable();
                $table->json('schedule_json')->nullable();
                $table->string('image_url')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itinerary_packages');
        Schema::dropIfExists('fair_price_benchmarks');
        Schema::dropIfExists('ferry_schedules');
        Schema::dropIfExists('doctors');
        Schema::dropIfExists('places');
        Schema::dropIfExists('ferry_terminals');
        Schema::dropIfExists('categories');
    }
};
