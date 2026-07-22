<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules.
     */
    public function rules(): array
    {
        $product = $this->route('product');

        return [
            'category_id' => ['nullable', 'exists:categories,id'],

            'department_id' => ['required', 'exists:departments,id'],

            'name' => ['required', 'string', 'max:255'],

            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'slug')->ignore($product),
            ],

            'short_description' => ['required', 'string', 'max:500'],

            'description' => ['required', 'string'],

            'material' => ['nullable', 'string', 'max:255'],

            'color' => ['nullable', 'string', 'max:100'],

            'price' => ['required', 'numeric', 'min:0'],

            'stock_quantity' => ['required', 'integer', 'min:0'],

            'discount_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],

            'status' => ['required', 'string'],

            'is_featured' => ['boolean'],

            'is_new_arrival' => ['boolean'],

            'is_best_seller' => ['boolean'],

            'is_limited_edition' => ['boolean'],

            'is_trending' => ['boolean'],

            'is_active' => ['boolean'],

            'variants' => ['nullable', 'array'],

            'variants.*.size' => ['nullable', 'string', 'max:50'],

            'variants.*.color' => ['nullable', 'string', 'max:100'],

            'variants.*.stock_quantity' => ['nullable', 'integer', 'min:0'],

            'variants.*.price_adjustment' => ['nullable', 'numeric'],

            'images' => ['nullable', 'array'],

            'images.*' => ['image', 'max:5120'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->filled('name') && !$this->filled('slug')) {
            $this->merge([
                'slug' => \Illuminate\Support\Str::slug($this->name),
            ]);
        }
    }
    public function productData(): array
{
    return $this->safe()->only([
        'department_id',
        'category_id',
        'name',
        'slug',
        'short_description',
        'description',
        'material',
        'color',
        'price',
        'discount_percent',
        'stock_quantity',
        'status',
    ]);
}

public function flagData(): array
{
    return $this->safe()->only([
        'is_featured',
        'is_new_arrival',
        'is_best_seller',
        'is_limited_edition',
        'is_trending',
        'is_active',
    ]);
}
}
