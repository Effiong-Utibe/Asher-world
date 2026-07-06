'use client'
import { ShoppingBag, Star } from 'lucide-react';
// Use standard img to avoid dependency on next/image types
import { CategoryItem } from './types';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface CategoryCardProps {
    category: CategoryItem;
    hovered: boolean;
    isDragging: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function CategoryCard({
    category,
    hovered,
    isDragging,
    onMouseEnter,
    onMouseLeave,
}: CategoryCardProps) {
    return (
        <Link
            href={`/category/${category.slug}`}
            className={cn(
                'group w-[80%] shrink-0 snap-start overflow-hidden rounded-xl transition-transform duration-300 sm:w-[45%] md:w-[32%] lg:w-[24%] xl:w-[20%]',
                hovered && !isDragging ? 'scale-[1.02]' : 'scale-100',
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <article
                className={cn(
                    'h-full overflow-hidden rounded-xl border border-gray-100 shadow-md',
                    category.color,
                )}
            >
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-lg font-bold text-white">
                            {category.name}
                        </h3>
                    </div>

                    {category.discount && (
                        <div className="absolute top-3 right-3 rounded-lg bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-md">
                            {category.discount}
                        </div>
                    )}

                    {category.featured && (
                        <div className="absolute top-3 left-3 flex items-center rounded-lg bg-amber-500 px-2 py-1 text-xs font-bold text-white shadow-md">
                            <Star className="mr-1 h-3 w-3 fill-white" />
                            Featured
                        </div>
                    )}
                </div>

                <div className="flex flex-col p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div
                            className={cn(
                                'rounded-full bg-white p-2 shadow-sm',
                                category.textColor,
                            )}
                        >
                            {category.icon}
                        </div>

                        <div className="text-sm text-gray-600">
                            {category.count ?? 0} products
                        </div>
                    </div>

                    <div
                        className={cn(
                            'mt-2 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90',
                            category.buttonColor,
                        )}
                    >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Shop Now
                    </div>
                </div>
            </article>
        </Link>
    );
}
