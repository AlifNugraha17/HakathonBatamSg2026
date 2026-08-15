<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_ref')->unique();
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->nullOnDelete();
            $table->foreignId('spa_id')->constrained('spas')->cascadeOnDelete();
            $table->float('amount_sgd', 8, 2);
            $table->bigInteger('amount_idr');
            $table->float('exchange_rate', 8, 2)->default(11850.0);
            $table->bigInteger('platform_fee_idr');
            $table->bigInteger('merchant_payout_idr');
            $table->string('payment_method')->default('PayNow_SG');
            $table->string('payout_method')->default('BI_FAST');
            $table->string('status')->default('settled'); // 'settled', 'processing', 'failed'
            $table->string('bi_fast_ref')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
