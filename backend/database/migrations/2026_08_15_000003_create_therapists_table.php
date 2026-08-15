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
        Schema::create('therapists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spa_id')->constrained('spas')->cascadeOnDelete();
            $table->string('name');
            $table->string('experience')->nullable();
            $table->string('specialty')->nullable();
            $table->decimal('rating', 3, 2)->default(5.0);
            $table->boolean('bnsp_certified')->default(true);
            $table->string('status')->default('available'); // 'available', 'in_service', 'off_duty'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('therapists');
    }
};
