<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Department;
use App\Models\Product;
use Inertia\Inertia;

class UserController extends Controller
{
    public function home()
    {
        // Use PascalCase component path for Inertia (match resources/js/Pages directory)
        return Inertia::render('users/home');
    }

    public function cat()
    {

        // $categories = Category::withCount('products')
        //     ->where('is_active', true)
        //     ->get()
        //     ->map(function ($category) {
        //         return [
        //             'id' => $category->id,
        //             'name' => $category->name,
        //             'products' => $category->products_count,
        //             'image' => $category->getFirstMediaUrl('category_images')
        //                 ?: asset('images/category-placeholder.jpg'),
        //             'featured' => (bool) $category->is_featured,
        //             'slug' => $category->slug,
        //         ];

        //     });
        // return Inertia::render('users/products/categories', [
        //     'categories' => $categories,
        // ]);
        $departments = Department::withCount('products')
            ->where('is_active', true)
            ->get()
            ->map(function ($department) {
                return [
                    'id' => $department->id,
                    'name' => $department->name,
                    'products' => $department->products_count,
                   'image' => asset('images/' . $department->image),
                    'featured' => (bool) $department->is_featured,
                    'slug' => $department->slug,
                ];
            });

        return Inertia::render('users/products/categories', [
            'departments' => $departments,
        ]);

    }
//     public function product_detail(){
//     $products = Product::where('department_id', $department->id)
//         ->with('media')
//         ->get();

//     return Inertia::render('users/products/product-listing', [
//         'department' => $department,
//         'products' => $products->map(function ($product) {
//             return [
//                 'id' => $product->id,
//                 'name' => $product->name,
//                 'slug' => $product->slug,
//                 'price' => $product->price,
//                 'final_price' => $product->final_price,
//                 'discount_percent' => $product->discount_percent,
//                 'rating' => 5,
//                 'stock_quantity' => $product->stock_quantity,
//                 'is_new_arrival' => $product->is_new_arrival,
//                 'is_best_seller' => $product->is_best_seller,
//                 'image' => $product->getFirstMediaUrl('product_images'),
//             ];
//         }),
//     ]);
// }
public function product_detail(Department $department)
{
    $products = Product::where('department_id', $department->id)
        ->with('media')
        ->get();

    return Inertia::render('users/products/product-listing', [
        'department' => [
            'id' => $department->id,
            'name' => $department->name,
            'slug' => $department->slug,
            'description' => $department->description,
        ],

        'products' => $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => (float) $product->price,
                'final_price' => (float) $product->final_price,
                'discount_percent' => (float) $product->discount_percent,
                'rating' => 5,
                'stock_quantity' => $product->stock_quantity,
                'is_new_arrival' => $product->is_new_arrival,
                'is_best_seller' => $product->is_best_seller,
                'image' => $product->getFirstMediaUrl('product_images'),
            ];
        }),
    ]);
}
}
