'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

import { sampleProducts } from './product-data';
import type { Product } from './types';
import ProductCard from './productCard';
import { Button } from '@/components/ui/button';

export default function ProductStore() {
    const [products, setProducts] = useState<Product[]>(sampleProducts);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleProducts, setVisibleProducts] = useState(4);

    // Responsive product count
    useEffect(() => {
        const updateVisibleProducts = () => {
            if (window.innerWidth >= 1280) {
                setVisibleProducts(4);
            } else if (window.innerWidth >= 1024) {
                setVisibleProducts(3);
            } else if (window.innerWidth >= 768) {
                setVisibleProducts(2);
            } else {
                setVisibleProducts(1);
            }
        };

        updateVisibleProducts();
        window.addEventListener('resize', updateVisibleProducts);

        return () =>
            window.removeEventListener('resize', updateVisibleProducts);
    }, []);

    // Ensure current index never exceeds available slide range
    useEffect(() => {
        const maxIndex = Math.max(0, products.length - visibleProducts);
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [currentIndex, products.length, visibleProducts]);

    const totalSlides = useMemo(() => {
        return Math.max(1, products.length - visibleProducts + 1);
    }, [products.length, visibleProducts]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const toggleFavorite = (id: string) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, favorite: !product.favorite }
                    : product,
            ),
        );
    };

    const addToCart = (id: string) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, inCart: !product.inCart }
                    : product,
            ),
        );
    };

    // Auto-slide
    useEffect(() => {
        if (products.length <= visibleProducts) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [products.length, visibleProducts, totalSlides]);

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                            SPECIAL OFFERS
                        </span>

                        <h2 className="mt-3 flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                            <Tag className="text-ghost" size={24} />
                            Spring Sale Collection
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                            Exclusive deals on premium products with
                            limited-time discounts. Shop best-selling items
                            before the sale ends.
                        </p>
                    </div>

                    {products.length > visibleProducts && (
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                onClick={goToPrev}
                                className="rounded-full border border-gray-200 bg-white p-3 shadow-sm transition hover:border-gray-300 hover:shadow"
                                aria-label="Previous products"
                            >
                                <ChevronLeft
                                    size={18}
                                    className="text-gray-700"
                                />
                            </Button>

                            <Button
                                type="button"
                                onClick={goToNext}
                                className="rounded-full border border-gray-200 bg-white p-3 shadow-sm transition hover:border-gray-300 hover:shadow"
                                aria-label="Next products"
                            >
                                <ChevronRight
                                    size={18}
                                    className="text-gray-700"
                                />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Carousel */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="w-full flex-shrink-0 px-2 sm:px-3 md:w-1/2 lg:w-1/3 xl:w-1/4"
                            >
                                <ProductCard
                                    product={product}
                                    onFavoriteToggle={toggleFavorite}
                                    onAddToCart={addToCart}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                {products.length > visibleProducts && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <Button
                                key={index}
                                type="button"
                                onClick={() => goToSlide(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    currentIndex === index
                                        ? 'w-6 bg-primary'
                                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to product slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="mt-10 flex justify-center">
                    <Button
                        type="button"
                        className="rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
                    >
                        View All Sales
                    </Button>
                </div>
            </div>
        </section>
    );
}
