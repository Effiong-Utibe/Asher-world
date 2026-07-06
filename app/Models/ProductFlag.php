<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductFlag extends Model
{
protected $fillable = [
        'product_id',
        'is_active',
        'is_featured',
        'is_trending',
        'is_new_arrival',
        'is_best_seller',
        'is_limited_edition',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
