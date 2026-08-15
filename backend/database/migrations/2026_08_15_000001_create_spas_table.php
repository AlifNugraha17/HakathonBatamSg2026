<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('spas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tagline')->nullable();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('region')->default('batam'); // 'batam', 'batam_centre', 'batam_nongsa'
            $table->string('landmark')->nullable();
            $table->integer('distance_minutes')->default(5);
            $table->string('address');
            $table->string('phone');
            $table->float('rating', 3, 2)->default(4.8);
            $table->integer('review_count')->default(0);
            $table->integer('hygiene_score')->default(98);
            $table->json('hygiene_badges')->nullable();
            $table->json('categories')->nullable();
            $table->string('image_url')->nullable();
            $table->string('status')->default('active'); // 'active', 'pending', 'suspended'
            $table->float('commission_rate')->default(12.0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spas');
    }
};
