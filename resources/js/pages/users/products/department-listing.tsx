import { Head, Link } from '@inertiajs/react';
import {
    Heart,
    ShoppingCart,
    Star,
    Search,
    SlidersHorizontal,
    ChevronRight,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Frontend from '@/layouts/front-end-layout';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    final_price: number;
    rating: number;
    image: string;
    is_new_arrival: boolean;
    is_best_seller: boolean;
    discount_percent: number;
    stock_quantity: number;
}

interface Department {
    id: number;
    name: string;
    slug: string;
    description?: string;
    banner?: string;
}

interface Props {
    department: Department;
    products: Product[];
}

export default function DepartmentShow({ department, products }: Props) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('latest');

    const filteredProducts = useMemo(() => {
        let data = [...products];

        if (search) {
            data = data.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        switch (sort) {
            case 'price-low':
                data.sort((a, b) => a.final_price - b.final_price);
                break;

            case 'price-high':
                data.sort((a, b) => b.final_price - a.final_price);
                break;

            case 'name':
                data.sort((a, b) => a.name.localeCompare(b.name));
                break;

            default:
                break;
        }

        return data;
    }, [products, search, sort]);

    return (
        <Frontend>
            <Head title={department.name} />

            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Breadcrumb */}

                <div className="mb-6 flex items-center text-sm text-gray-500">
                    <Link href="/">Home</Link>

                    <ChevronRight className="mx-2 h-4 w-4" />

                    <span>Departments</span>

                    <ChevronRight className="mx-2 h-4 w-4" />

                    <span className="font-semibold text-black">
                        {department.name}
                    </span>
                </div>

                {/* Banner */}

                <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-black to-gray-800">
                    {department.banner && (
                        <img
                            src={department.banner}
                            className="absolute inset-0 h-full w-full object-cover opacity-30"
                        />
                    )}

                    <div className="relative p-12 text-white">
                        <h1 className="mb-3 text-5xl font-bold">
                            {department.name}
                        </h1>

                        <p className="max-w-2xl text-lg text-gray-200">
                            {department.description}
                        </p>

                        <Badge className="mt-6 bg-white text-black">
                            {products.length} Products
                        </Badge>
                    </div>
                </div>

                {/* Search */}

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="pl-10"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="h-5 w-5" />

                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="latest">Latest</SelectItem>

                                <SelectItem value="price-low">
                                    Price: Low to High
                                </SelectItem>

                                <SelectItem value="price-high">
                                    Price: High to Low
                                </SelectItem>

                                <SelectItem value="name">Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Products */}

                {filteredProducts.length === 0 ? (
                    <Card className="p-20 text-center">
                        <h2 className="mb-2 text-2xl font-semibold">
                            No Products Found
                        </h2>

                        <p className="text-gray-500">
                            Try changing your search.
                        </p>
                    </Card>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="group overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />

                                    {product.discount_percent > 0 && (
                                        <Badge className="absolute top-3 left-3 bg-red-600">
                                            -{product.discount_percent}%
                                        </Badge>
                                    )}

                                    {product.is_new_arrival && (
                                        <Badge className="absolute top-3 right-3">
                                            New
                                        </Badge>
                                    )}

                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute right-3 bottom-3 rounded-full"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="space-y-3 p-5">
                                    <h3 className="line-clamp-2 font-semibold">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center">
                                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />

                                        <span>{product.rating}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold">
                                            ${product.final_price}
                                        </span>

                                        {product.discount_percent > 0 && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ${product.price}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button className="flex-1">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Add to Cart
                                        </Button>

                                        <Button variant="outline" asChild>
                                            <Link
                                                href={`/products/${product.slug}`}
                                            >
                                                View
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Frontend>
    );
}
