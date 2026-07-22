<?php

use App\Enum\ProductStatusEnum;
use App\Models\User;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name', 2000);
            $table->string('slug', 2000)->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('material')->nullable();
            $table->string('color')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('status')->default(ProductStatusEnum::Draft->value);
            $table->decimal('discount_percent', 5, 2)->nullable();
            $table->decimal('final_price', 10, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->foreignIdFor(User::class,'created_by')->nullable();
            $table->foreignIdFor(User::class,'updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
