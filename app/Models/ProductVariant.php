<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'size',
        'color',
        'stock_quantity',
        'price_adjustment',
    ];

    protected $casts = [
        'price_adjustment' => 'decimal:2',
        'stock_quantity' => 'integer',
    ];



    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }
}
