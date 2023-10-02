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
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->integer('mpn')->nullable();
            $table->float('price')->nullable();
            $table->float('sale_price')->nullable();
            $table->float('vip_price')->nullable();
            $table->integer('stock')->nullable();
            $table->string('availability');
            $table->string('taglia')->nullable();
            $table->integer('parent_id');
            $table->string('title');
            $table->longText('description');
            $table->string('link');
            $table->string('image_link');
            $table->longText('product_type');
            $table->string('eta')->nullable();
            $table->string('marche');
            $table->string('genere')->nullable();
            $table->string('colore');
            // $table->json('data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
