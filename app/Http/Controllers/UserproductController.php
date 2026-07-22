<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class UserproductController extends Controller
{
    //  public function Product_list(Request $request)
    // {
    //     // getting all product with categories
    //     $query = Product::with('media','category', 'flag');
    //     $product = $query->get()->map(function ($product) {
    //         return [
    //             'id' => $product->id,
    //             'name' => $product->name,
    //             'description' => $product->description,
    //             'price' => (float) $product->price,
    //             'category' => $product->category ? $product->category->name : null,
    //             'image' => $product->media ? $product->media->first()->getUrl() : null,
    //             'rating' => 4.5, // Default rating - can be calculated from reviews if available
    //             'sale' => (float) $product->discount_percent > 0, // Product is on sale if discount exists
    //              'media' => $product->getFirstMediaUrl('products'),
    //         ];
    //     });

    //     return Inertia::render('users/products/product-listing', [
    //         'products' => $product,
    //     ]);
    // }
    public function Product_list(Request $request)
{

    $products = Product::with(['category', 'flag'])
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => (float) $product->price,
                'category' => optional($product->category)->name,
                'rating' => 4.5,
                'sale' => $product->discount_percent > 0,
                'images' => $product->getFirstMediaUrl('product_images'),

            ];

        });

    return Inertia::render('users/products/product-listing', [
        'products' => $products,

    ]);
}

public function product_detail(Product $product)
{
    $product->load([
        'category',
        'department',
        'variants',
        'flag',
    ]);

    $relatedProducts = Product::firstwhere('category_id', $product->category_id)
        ->whereKeyNot($product->id)
        ->take(4)
        ->get()
        ->map(fn ($item) => [
            'id' => $item->id,
            'name' => $item->name,
            'slug' => $item->slug,
            'price' => (float) ($item->final_price ?: $item->price),
            'image' => $item->getFirstMediaUrl('product_images'),
        ]);

    return Inertia::render('users/products/productdetails', [

        'product' => [

            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'sku' => $product->sku,

            'short_description' => $product->short_description,
            'description' => $product->description,

            'material' => $product->material,
            'color' => $product->color,

            'price' => (float) $product->price,
            'discount_percent' => (float) $product->discount_percent,
            'final_price' => (float) ($product->final_price ?: $product->price),

            'stock_quantity' => $product->stock_quantity,

            'category' => $product->category,
            'department' => $product->department,

            'flags' => [
                'is_featured'    => (bool) optional($product->flag)->is_featured,
                'is_best_seller' => (bool) optional($product->flag)->is_best_seller,
                'is_new_arrival' => (bool) optional($product->flag)->is_new_arrival,
                'is_trending'    => (bool) optional($product->flag)->is_trending,
            ],

            'variants' => $product->variants->map(fn ($variant) => [
                'id' => $variant->id,
                'size' => $variant->size,
                'color' => $variant->color,
                'sku' => $variant->sku,
                'stock_quantity' => $variant->stock_quantity,
                'price_adjustment' => (float) $variant->price_adjustment,
            ]),

            'images' => $product->getMedia('product_images')
                ->map(fn ($media) => [
                    'id' => $media->id,
                    'url' => $media->getFullUrl(),
                ])
                ->values(),

        ],

        'relatedProducts' => $relatedProducts,

    ]);
}
}
