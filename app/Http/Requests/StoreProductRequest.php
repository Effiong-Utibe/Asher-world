<?php

namespace App\Http\Requests;

use App\Enum\ProductStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rules\Enum;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            // Product Information
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:products,slug',
            ],

            'short_description' => [
                'required',
                'string',
                'max:500',
            ],

            'description' => [
                'required',
                'string',
            ],

            'department_id' => [
                'nullable',
                'integer',
                'exists:departments,id',
            ],

            'category_id' => [
                'required',
                'integer',
                'exists:categories,id',
            ],

            'material' => [
                'required',
                'string',
                'max:100',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'stock_quantity' => [
                'required',
                'integer',
                'min:0',
            ],

            'discount_percent' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

         'status' => [
            'required',
            new Enum(ProductStatusEnum::class),
        ],
            // Product Flags
            'flag_is_active' => [
                'sometimes',
                'boolean',
            ],

            'flag_is_featured' => [
                'sometimes',
                'boolean',
            ],

            'flag_is_new_arrival' => [
                'sometimes',
                'boolean',
            ],

            'flag_is_best_seller' => [
                'sometimes',
                'boolean',
            ],

            'flag_is_limited_edition' => [
                'sometimes',
                'boolean',
            ],

            'flag_is_trending' => [
                'sometimes',
                'boolean',
            ],

            // Variants
            'variants' => [
                'array',
                'min:1',
            ],

            'variants.*.size' => [
                'string',
                'max:50',
            ],

            'variants.*.color' => [
                'string',
                'max:100',
            ],

            'variants.*.stock_quantity' => [
                'integer',
                'min:0',
            ],

            'variants.*.price_adjustment' => [
                'numeric',
            ],

            // Images
            'images' => [
                'required',
                'array',
                'min:1',
                'max:10',
            ],

            'images.*' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
        ];
    }

    public function productData(): array
    {
        return Arr::except($this->validated(), [
            'flag_is_featured',
            'flag_is_new_arrival',
            'flag_is_best_seller',
            'flag_is_limited_edition',
            'flag_is_trending',
            'flag_is_active',
            'variants',
            'images',
        ]);
    }

    public function flagData(): array
    {
        return [
            'is_featured' => $this->boolean('flag_is_featured'),
            'is_new_arrival' => $this->boolean('flag_is_new_arrival'),
            'is_best_seller' => $this->boolean('flag_is_best_seller'),
            'is_limited_edition' => $this->boolean('flag_is_limited_edition'),
            'is_trending' => $this->boolean('flag_is_trending'),
            'is_active' => $this->boolean('flag_is_active', true),
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The product name is required.',
            'name.max' => 'The product name may not exceed 255 characters.',

            'slug.required' => 'The product slug is required.',
            'slug.unique' => 'The product slug has already been taken.',

            'sku.required' => 'The product SKU is required.',
            'sku.unique' => 'The product SKU has already been taken.',

            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category does not exist.',

            'department_id.exists' => 'The selected department does not exist.',

            'short_description.required' => 'The short description is required.',
            'description.required' => 'The description is required.',

            'material.required' => 'The material is required.',

            'price.required' => 'The price is required.',
            'price.numeric' => 'The price must be a number.',
            'price.min' => 'The price must be greater than or equal to 0.',

            'stock_quantity.required' => 'The stock quantity is required.',
            'stock_quantity.integer' => 'The stock quantity must be an integer.',

            'discount_percent.required' => 'The discount percent is required.',
            'discount_percent.max' => 'The discount percent cannot exceed 100%.',

            'variants.required' => 'At least one product variant is required.',
            'variants.min' => 'At least one product variant is required.',

            'variants.*.size.required' => 'Variant size is required.',
            'variants.*.color.required' => 'Variant color is required.',
            'variants.*.sku.required' => 'Variant SKU is required.',
            'variants.*.sku.unique' => 'Variant SKU has already been taken.',

            'images.required' => 'At least one product image is required.',
            'images.min' => 'At least one product image is required.',
            'images.max' => 'A maximum of 10 images is allowed.',
        ];
    }
}
