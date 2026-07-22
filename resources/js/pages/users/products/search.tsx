'use client';

import { Search, X, ShoppingCart, Heart, Star } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    image: string;
}

const products: Product[] = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 149,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    },
    {
        id: 2,
        name: 'Gaming Mouse',
        category: 'Electronics',
        price: 59,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    },
    {
        id: 3,
        name: 'Running Shoes',
        category: 'Fashion',
        price: 120,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    },
    {
        id: 4,
        name: 'Leather Backpack',
        category: 'Fashion',
        price: 89,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    },
    {
        id: 5,
        name: 'Smart Watch',
        category: 'Electronics',
        price: 259,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    },
];

export default function ProductSearch() {
    const [query, setQuery] = useState('');

    const filteredProducts = useMemo(() => {
        if (!query) {
return [];
}

        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);

    return (
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto max-w-5xl px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold">Search Products</h2>

                    <p className="mt-2 text-muted-foreground">
                        Find your favorite products instantly.
                    </p>
                </div>

                {/* Search Input */}

                <div className="relative">
                    <Search className="absolute top-4 left-4 h-5 w-5 text-muted-foreground" />

                    <Input
                        placeholder="Search products..."
                        className="h-14 rounded-xl pr-12 pl-12 text-base"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute top-4 right-4"
                        >
                            <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                    )}
                </div>

                {/* Search Results */}

                {query.length > 0 && (
                    <div className="mt-8 space-y-4">
                        {filteredProducts.length === 0 && (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

                                    <h3 className="text-xl font-semibold">
                                        No Products Found
                                    </h3>

                                    <p className="mt-2 text-muted-foreground">
                                        Try another search keyword.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="transition-all hover:shadow-xl"
                            >
                                <CardContent className="flex flex-col gap-6 p-5 md:flex-row">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-36 w-full rounded-xl object-cover md:w-36"
                                    />

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <Badge variant="secondary">
                                                {product.category}
                                            </Badge>

                                            <h3 className="mt-2 text-2xl font-semibold">
                                                {product.name}
                                            </h3>

                                            <div className="mt-2 flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                                                <span>{product.rating}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                            <span className="text-2xl font-bold text-primary">
                                                ${product.price}
                                            </span>

                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    <Heart className="h-4 w-4" />
                                                </Button>

                                                <Button>
                                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
