<?php

namespace App\Http\Controllers;

use App\Enum\ProductStatusEnum;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Department;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $this->authorize('viewAny', Product::class);

    $products = Product::query()
        ->with([
            'department',
            'category',
            'variants',
            'flag',
            'media',
        ])
        ->latest()
        ->get()
        ->map(function ($product) {

            return [

                /*
                |--------------------------------------------------------------------------
                | Product Information
                |--------------------------------------------------------------------------
                */

                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'short_description' => $product->short_description,
                'description' => $product->description,
                'material' => $product->material,
                'color' => $product->color,

                /*
                |--------------------------------------------------------------------------
                | Pricing
                |--------------------------------------------------------------------------
                */

                'price' => (float) $product->price,

                'discount_percent' => (float) $product->discount_percent,

                'final_price' => (float) $product->final_price,

                /*
                |--------------------------------------------------------------------------
                | Inventory
                |--------------------------------------------------------------------------
                */

                'stock_quantity' => $product->stock_quantity,

                /*
                |--------------------------------------------------------------------------
                | Status
                |--------------------------------------------------------------------------
                */

                'status' => $product->status,

                /*
                |--------------------------------------------------------------------------
                | Department
                |--------------------------------------------------------------------------
                */

                'department' => $product->department
                    ? [
                        'id' => $product->department->id,
                        'name' => $product->department->name,
                    ]
                    : null,

                /*
                |--------------------------------------------------------------------------
                | Category
                |--------------------------------------------------------------------------
                */

                'category' => $product->category
                    ? [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                    ]
                    : null,

                /*
                |--------------------------------------------------------------------------
                | Variants
                |--------------------------------------------------------------------------
                */

                'variants' => $product->variants
                    ->map(fn ($variant) => [
                        'id' => $variant->id,
                        'size' => $variant->size,
                        'color' => $variant->color,
                        'stock_quantity' => $variant->stock_quantity,
                        'price_adjustment' => $variant->price_adjustment,

                    ])
                    ->values(),

                /*
                |--------------------------------------------------------------------------
                | Flags
                |--------------------------------------------------------------------------
                */

                'flags' => [
                    'is_active' => optional($product->flag)->is_active,
                    'is_featured' => optional($product->flag)->is_featured,
                    'is_trending' => optional($product->flag)->is_trending,
                    'is_new_arrival' => optional($product->flag)->is_new_arrival,
                    'is_best_seller' => optional($product->flag)->is_best_seller,
                    'is_limited_edition' => optional($product->flag)->is_limited_edition,
                ],

                /*
                |--------------------------------------------------------------------------
                | Images
                |--------------------------------------------------------------------------
                */

                'image' => $product->getFirstMediaUrl('product_images'),
                'images' => $product->getMedia('product_images')
                    ->map(fn ($media) => [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                        'thumbnail' => $media->hasGeneratedConversion('thumb')
                            ? $media->getUrl('thumb')
                            : $media->getUrl(),
                    ])
                    ->values(),
            ];

        });

    return Inertia::render('admin/products/index', [
        'products' => $products,
        'departments' => Department::with('categories')->get(),
        'statuses' => collect(ProductStatusEnum::cases())
            ->map(fn ($status) => [
                'value' => $status->value,
                'label' => ProductStatusEnum::labels()[$status->value],
                'color' => ProductStatusEnum::colors()[$status->value],
            ]),
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         $this->authorize('create', Product::class);
        return Inertia::render('admin/products/create', [
            // 'categories' => Category::select('id', 'name')->get()
            'departments' => Department::with('categories')->get(),
             'statuses' => collect(ProductStatusEnum::cases())->map(fn ($status) => [
            'value' => $status->value,
            'label' => ProductStatusEnum::labels()[$status->value],
            'color' => ProductStatusEnum::colors()[$status->value],
        ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(StoreProductRequest $request)
{
       $this->authorize('create', Product::class);
    $validated = $request->validated();

    // Generate unique slug
    $originalSlug = Str::slug($validated['name']);
    $slug = $originalSlug;
    $i = 1;

    while (Product::where('slug','=', $slug)->exists()) {
        $slug = "{$originalSlug}-{$i}";
        $i++;
    }


    // Calculate final price
    $price = (float) $validated['price'];
    $discount = (float) $validated['discount_percent'];

    $productData = $request->productData();

    $productData['slug'] = $slug;
    $productData['status'] = $validated['status'];
    $productData['final_price'] = $price - (($price * $discount) / 100);
    $product = Product::create($productData);
    $product->flag()->create($request->flagData());

    foreach ($validated['variants'] ?? [] as $variant) {
        $product->variants()->create([
            'size' => $variant['size'],
            'color' => $variant['color'],
            'stock_quantity' => $variant['stock_quantity'],
            'price_adjustment' => $variant['price_adjustment'],
        ]);
    }

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $product
                ->addMedia($image)
                ->toMediaCollection('product_images');
        }
    }

    return redirect()
        ->route('products.index')
        ->with('success', 'Product created successfully.');
}

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
         $this->authorize('view', $product);
        // Single product payload built similarly to relatedProducts to ensure fields are present
        $p = $product->load(['category', 'variants']);
        $productPayload = [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            // 'sku' => $p->sku,
            'short_description' => $p->short_description,
            'description' => $p->description,
            'material' => $p->material,
            'color' => $p->color,
            'price' => $p->price,
            'discount_percent' => $p->discount_percent,
            'final_price' => $p->final_price,
            'stock_quantity' => $p->stock_quantity,
            'rating' => 0,
            'review_count' => 0,
            'is_active' => $p->is_active,
            'is_featured' => $p->is_featured,
            'is_new_arrival' => $p->is_new_arrival,
            'is_best_seller' => $p->is_best_seller,
            'is_limited_edition' => $p->is_limited_edition,
            'is_trending' => $p->is_trending,
            'category' => $p->category ? ['id' => $p->category->id, 'name' => $p->category->name] : null,
            'category_id' => $p->category_id,
            'department_id' => $p->department_id,
            'sizes' => $p->variants->pluck('size')->filter()->unique()->values()->toArray(),
            'colors' => $p->variants->pluck('color')->filter()->unique()->values()->toArray(),
            'variants' => $p->variants->map(fn ($v) => [
                'id' => $v->id,
                'size' => $v->size,
                'color' => $v->color,
                // 'sku' => $v->sku,
                'stock_quantity' => $v->stock_quantity,
                'price_adjustment' => $v->price_adjustment,
            ])->values()->toArray(),
            'images' => $p->getMedia('product_images')
                ->map(fn ($media) => [
                    'id' => $media->id,
                    'url' => $media->getUrl(),
                    'thumbnail' => $media->hasGeneratedConversion('thumb') ? $media->getUrl('thumb') : $media->getUrl(),
                ])->values()->toArray(),
            'created_at' => $p->created_at ? $p->created_at->format('Y-m-d H:i:s') : '',
            'updated_at' => $p->updated_at ? $p->updated_at->format('Y-m-d H:i:s') : '',
        ];

        // Related products (exclude current product)
        $relatedProducts = Product::with(['category', 'variants'])
            ->where('id', '!=', $product->id)
            ->limit(8)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                // 'sku' => $p->sku,
                'price' => $p->price,
                'final_price' => $p->final_price,
                'stock_quantity' => $p->stock_quantity,
                'is_active' => $p->is_active,
                'is_featured' => $p->is_featured,
                'category' => $p->category ? ['id' => $p->category->id, 'name' => $p->category->name] : null,
                'image' => $p->getFirstMediaUrl('product_images'),
                'images' => $p->getMedia('product_images')
                    ->map(fn ($media) => [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                        'thumbnail' => $media->hasGeneratedConversion('thumb')
                            ? $media->getUrl('thumb')
                            : $media->getUrl(),
                    ])
                    ->values()
                    ->toArray(),
            ]);

        return Inertia::render('admin/products/show', [
            'product' => $productPayload,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
    $this->authorize('update', $product);
        return Inertia::render('admin/products/edit', [
            'product' => (new ProductResource(
                $product->load([
                    'category',
                    'department',
                    'variants',
                ])
            ))->resolve(),

            'departments' => Department::with('categories')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
public function update(UpdateProductRequest $request, Product $product)
{
    $this->authorize('update', $product);

    $validated = $request->validated();

    $price = (float) $validated['price'];
    $discount = (float) ($validated['discount_percent'] ?? 0);

    $productData = $request->productData();
    $productData['final_price'] = $price - (($price * $discount) / 100);

    $product->update($productData);

    $product->flag()->updateOrCreate(
        ['product_id' => $product->id],
        $request->flagData()
    );

    if (! empty($validated['variants'])) {

        $product->variants()->delete();

        foreach ($validated['variants'] as $variant) {

            $product->variants()->create([
                'size' => $variant['size'] ?? null,
                'color' => $variant['color'] ?? null,
                'stock_quantity' => $variant['stock_quantity'] ?? 0,
                'price_adjustment' => $variant['price_adjustment'] ?? 0,
            ]);
        }
    }

    if ($request->hasFile('images')) {

        $product->clearMediaCollection('product_images');

        foreach ($request->file('images') as $image) {

            $product
                ->addMedia($image)
                ->toMediaCollection('product_images');
        }
    }

    return redirect()
        ->route('products.index')
        ->with('success', 'Product updated successfully.');
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);
        $product->clearMediaCollection('product_images');
        $product->delete('product');

        return redirect()->route('products.index')->with('message', 'product deleted successfully');
    }
}
