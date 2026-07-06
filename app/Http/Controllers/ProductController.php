<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
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
        $products = Product::with(['category', 'variants'])
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'sku' => $product->sku,
                'price' => $product->price,
                'final_price' => $product->final_price,
                'stock_quantity' => $product->stock_quantity,
                'is_active' => $product->is_active,
                'is_featured' => $product->is_featured,
                'category' => $product->category ? ['id' => $product->category->id, 'name' => $product->category->name] : null,
                'image' => $product->getFirstMediaUrl('product_images'),
                'images' => $product->getMedia('product_images')
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

        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/products/create', [
            // 'categories' => Category::select('id', 'name')->get()
            'departments' => Department::with('categories')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        // Generate unique slug
        $originalSlug = Str::slug($validated['name']);
        $slug = $originalSlug;
        $count = 1;

        // Ensure unique slug; include explicit operator and boolean to satisfy analyzer
        while (Product::where('slug', '=', $slug, 'and')->exists()) {
            $slug = $originalSlug.'-'.$count++;
        }

        $validated['slug'] = $slug;

        // Calculate final price
        $price = (float) $validated['price'];
        $discountPercent = (float) $validated['discount_percent'];

        $validated['final_price'] = $price - (
            ($price * $discountPercent) / 100
        );

        // Create product

        $product = Product::create($request->productData());

        $product->flag()->create($request->flagData());

        // Save variants
        foreach ($validated['variants'] ?? [] as $variant) {
            $product->variants()->create([
                'size' => $variant['size'],
                'color' => $variant['color'],
                'stock_quantity' => $variant['stock_quantity'],
                'price_adjustment' => $variant['price_adjustment'],
                'sku' => $variant['sku'],
            ]);
        }

        // Upload images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $product
                    ->addMedia($file)
                    ->toMediaCollection('product_images');
            }
        }

        // return ProductResource::make($product);
        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created successfully.')
            // ->json(new PostResource($post), 201);
            ->with('product', ProductResource::make($product));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
       
    return Inertia::render('admin/products/edit', [
        'product' => (new ProductResource(
            $product->load([
                'category',
                'department',
                'variants'
            ])
        ))->resolve(),

        'departments' => Department::with('categories')->get(),
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate incoming data
        $validated = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug,'.$product->id],
            'sku' => ['required', 'string', 'max:100', 'unique:products,sku,'.$product->id],
            'short_description' => ['required', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'material' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'discount_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'is_featured' => ['boolean'],
            'is_new_arrival' => ['boolean'],
            'is_best_seller' => ['boolean'],
            'is_limited_edition' => ['boolean'],
            'is_trending' => ['boolean'],
            'is_active' => ['boolean'],
            'variants' => ['nullable', 'array'],
            'variants.*.size' => ['nullable', 'string', 'max:50'],
            'variants.*.color' => ['nullable', 'string', 'max:100'],
            'variants.*.sku' => ['nullable', 'string', 'max:100'],
            'variants.*.stock_quantity' => ['nullable', 'integer', 'min:0'],
            'variants.*.price_adjustment' => ['nullable', 'numeric'],
        ]);

        // Calculate final price
        $price = (float) $validated['price'];
        $discountPercent = (float) ($validated['discount_percent'] ?? 0);
        $validated['final_price'] = $price - (($price * $discountPercent) / 100);

        // Update product attributes
        $product->fill([
            'category_id' => $validated['category_id'] ?? null,
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'sku' => $validated['sku'],
            'short_description' => $validated['short_description'],
            'description' => $validated['description'],
            'material' => $validated['material'] ?? null,
            'color' => $validated['color'] ?? null,
            'price' => $validated['price'],
            'discount_percent' => $validated['discount_percent'] ?? 0,
            'final_price' => $validated['final_price'],
            'stock_quantity' => $validated['stock_quantity'],
            'is_featured' => $validated['is_featured'] ?? false,
            'is_new_arrival' => $validated['is_new_arrival'] ?? false,
            'is_best_seller' => $validated['is_best_seller'] ?? false,
            'is_limited_edition' => $validated['is_limited_edition'] ?? false,
            'is_trending' => $validated['is_trending'] ?? false,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        // Update or create flag
        $product->flag()->updateOrCreate(
            ['product_id' => $product->id],
            [
                'is_featured' => $validated['is_featured'] ?? false,
                'is_new_arrival' => $validated['is_new_arrival'] ?? false,
                'is_best_seller' => $validated['is_best_seller'] ?? false,
                'is_limited_edition' => $validated['is_limited_edition'] ?? false,
                'is_trending' => $validated['is_trending'] ?? false,
            ]
        );

        // Handle variants
        if (isset($validated['variants']) && is_array($validated['variants'])) {
            // Delete existing variants and recreate
            $product->variants()->delete();

            foreach ($validated['variants'] as $variantData) {
                $product->variants()->create([
                    'size' => $variantData['size'] ?? null,
                    'color' => $variantData['color'] ?? null,
                    'sku' => $variantData['sku'] ?? null,
                    'stock_quantity' => $variantData['stock_quantity'] ?? 0,
                    'price_adjustment' => $variantData['price_adjustment'] ?? 0,
                ])->save();
            }
        }

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated successfully.')
            ->with('product', ProductResource::make($product->fresh(['category', 'variants'])));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
