<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'material' => $this->material,
            'color' => $this->color,
            'price' => $this->price,
            'discount_percent' => $this->discount_percent,
            'final_price' => $this->final_price,
            'stock_quantity' => $this->stock_quantity,
            'is_active' => $this->is_active,
            'is_featured' => $this->is_featured,
            'is_new_arrival' => $this->is_new_arrival,
            'is_best_seller' => $this->is_best_seller,
            'is_limited_edition' => $this->is_limited_edition,
            'is_trending' => $this->is_trending,
            'category' => CategoryResource::make(
                $this->whenLoaded('category')
            ),
            'category_id' => $this->category_id,
            'department_id' => $this->department_id,
            'variants' => ProductVariantResource::collection(
                $this->whenLoaded('variants')
            ),

            'images' => $this->getMedia('product_images')
                ->map(fn ($media) => [
                    'id' => $media->id,
                    'name' => $media->name,
                    'file_name' => $media->file_name,
                    'mime_type' => $media->mime_type,
                    'size' => $media->size,
                    'url' => $media->getUrl(),
                    'thumbnail' => $media->hasGeneratedConversion('thumb')
                        ? $media->getUrl('thumb')
                        : $media->getUrl(),
                ])
                ->values(),
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : '',


        ];
    }
}
