<?php

namespace App\Models;

use App\Enum\ProductStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'category_id',
        'department_id',
        'name',
        'slug',
        'short_description',
        'description',
        'material',
        'color',
        'price',
        'final_price',
        'stock_quantity',
        'discount_percent',
        'status',
        'created_by',
        'updated_by'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'final_price' => 'decimal:2',
        'discount_percent' => 'decimal:2',
        'stock_quantity' => 'integer',
        'status' => ProductStatusEnum::class,
];


    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }
    public function flag(): HasOne
    {
        return $this->hasOne(ProductFlag::class);
    }
    public function tags(): HasMany
    {
        return $this->hasMany(ProductTag::class);
    }
    public function cartItems()
{
    return $this->hasMany(CartItem::class);
}
}
