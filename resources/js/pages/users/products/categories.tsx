'use client';

import { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
    products: number;
    image: string;
    featured?: boolean;
}

const categories: Category[] = [
    {
        id: 1,
        name: 'Electronics',
        products: 128,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
        featured: true,
    },
    {
        id: 2,
        name: 'Fashion',
        products: 256,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    },
    {
        id: 3,
        name: 'Shoes',
        products: 140,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    },
    {
        id: 4,
        name: 'Furniture',
        products: 82,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600',
    },
    {
        id: 5,
        name: 'Beauty',
        products: 97,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
    },
    {
        id: 6,
        name: 'Sports',
        products: 164,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
    },
    {
        id: 7,
        name: 'Gaming',
        products: 61,
        image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600',
    },
    {
        id: 8,
        name: 'Books',
        products: 203,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
    },
];

export default function ProductCategories() {
    const [search, setSearch] = useState('');

    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    return (
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                {/* Header */}

                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Shop by Category
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Browse thousands of premium products across our most
                        popular shopping categories.
                    </p>
                </div>

                {/* Search */}

                <div className="relative mx-auto mb-10 max-w-lg">
                    <Search className="absolute top-3.5 left-4 h-5 w-5 text-muted-foreground" />

                    <Input
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-12 rounded-xl pl-11"
                    />
                </div>

                {/* Categories */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCategories.map((category) => (
                        <Card
                            key={category.id}
                            className="group overflow-hidden rounded-2xl border-0 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                {category.featured && (
                                    <Badge className="absolute top-4 left-4">
                                        Featured
                                    </Badge>
                                )}
                            </div>

                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {category.name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {category.products} Products
                                        </p>
                                    </div>

                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full transition group-hover:bg-primary group-hover:text-white"
                                    >
                                        <ArrowRight size={18} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
