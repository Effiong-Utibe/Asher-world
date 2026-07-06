<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class UserproductController extends Controller
{
     public function Product_list(Request $request)
    {
        // getting all product with categories
        $query = Product::with('media','category', 'flag');
        $product = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'category' => $product->category ? $product->category->name : null,
                'image' => $product->media ? $product->media->first()->getUrl() : null,
                'rating' => 4.5, // Default rating - can be calculated from reviews if available
                'sale' => (float) $product->discount_percent > 0, // Product is on sale if discount exists
            ];
        });

        return Inertia::render('users/products/product-listing', [
            'products' => $product,
        ]);
    }
}
