'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';

import { Heart, Search, ShoppingCart, Star } from 'lucide-react';
import Frontend from '@/layouts/front-end-layout';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    sale: boolean;
    description?: string;
}

interface PageProps {
    products: Product[];
}

export default function ProductListing({ products }: PageProps) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('featured');

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === 'All' ? true : product.category === category;

            return matchesSearch && matchesCategory;
        });

        switch (sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;

            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;

            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;

            default:
                break;
        }

        return filtered;
    }, [search, category, sort]);

    return (
        <Frontend>
            <div className="min-h-screen bg-slate-50">
                {/* Header */}

                <div className="border-b bg-white">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-4xl font-bold">Shop Products</h1>

                        <p className="mt-2 text-muted-foreground">
                            Discover premium products at amazing prices.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    {/* Filters */}

                    <div className="mb-8 grid gap-4 md:grid-cols-3">
                        <div className="relative">
                            <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />

                            <Input
                                placeholder="Search products..."
                                className="pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="All">
                                    All Categories
                                </SelectItem>

                                <SelectItem value="Electronics">
                                    Electronics
                                </SelectItem>

                                <SelectItem value="Fashion">Fashion</SelectItem>

                                <SelectItem value="Furniture">
                                    Furniture
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="featured">
                                    Featured
                                </SelectItem>

                                <SelectItem value="price-low">
                                    Price: Low to High
                                </SelectItem>

                                <SelectItem value="price-high">
                                    Price: High to Low
                                </SelectItem>

                                <SelectItem value="rating">
                                    Highest Rated
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Results */}

                    <div className="mb-6 text-sm text-muted-foreground">
                        Showing {filteredProducts.length} products
                    </div>

                    {/* Products */}

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    {product.sale && (
                                        <Badge className="absolute top-3 left-3">
                                            SALE
                                        </Badge>
                                    )}

                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute top-3 right-3 rounded-full"
                                    >
                                        <Heart size={18} />
                                    </Button>
                                </div>

                                <CardContent className="space-y-4 p-5">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {product.category}
                                        </p>

                                        <h2 className="mt-1 text-lg font-semibold">
                                            {product.name}
                                        </h2>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Star
                                            size={16}
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                        <span className="font-medium">
                                            {product.rating}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold">
                                            ${product.price}
                                        </span>

                                        <Button>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Add
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Frontend>
    );
}
