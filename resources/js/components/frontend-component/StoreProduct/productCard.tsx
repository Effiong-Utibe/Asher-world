import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from './types';
import StarRating from './starRating';
import { Button } from '@/components/ui/button';

type ProductCardProps = {
    product: Product;
    onFavoriteToggle: (id: string) => void;
    onAddToCart: (id: string) => void;
};

export default function ProductCard({
    product,
    onFavoriteToggle,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.discountPercentage > 0 && (
                        <span className="rounded-md bg-destructive px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            {product.discountPercentage}% OFF
                        </span>
                    )}

                    {product.isNew && (
                        <span className="rounded-md bg-emerald-500 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            NEW
                        </span>
                    )}

                    {product.stock <= 10 && (
                        <span className="rounded-md bg-amber-500 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            Only {product.stock} left
                        </span>
                    )}
                </div>

                {/* Favorite */}
                <div className="absolute top-3 right-3">
                    <Button
                        type="button"
                        onClick={() => onFavoriteToggle(product.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-white"
                        aria-label={`Toggle favorite for ${product.name}`}
                    >
                        <Heart
                            size={16}
                            className={
                                product.favorite
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-700'
                            }
                        />
                    </Button>
                </div>

                {/* Hover Quick View */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                        type="button"
                        className="flex translate-y-4 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition duration-300 group-hover:translate-y-0"
                    >
                        <Eye size={16} />
                        Quick View
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div>
                    <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {product.category}
                    </span>

                    <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900">
                        {product.name}
                    </h3>

                    <div className="mt-2">
                        <StarRating rating={product.rating} />
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                        {product.description}
                    </p>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-xs text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">
                                ${product.discountPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={() => onAddToCart(product.id)}
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition ${
                            product.inCart
                                ? 'border border-green-200 bg-green-50 text-green-600'
                                : 'bg-primary text-white'
                        }`}
                    >
                        <ShoppingCart size={16} />
                        {product.inCart ? 'Added' : 'Add'}
                    </Button>
                </div>
            </div>
        </div>
    );
}