'use client';

import { Heart, Search, ShoppingCart, Star,Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories } from '@/components/frontend-component/categoriesProduct/categories-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Frontend from '@/layouts/front-end-layout';
import { Link, router } from '@inertiajs/react';
import { product_detail } from '@/actions/App/Http/Controllers/UserproductController';

// --- Interfaces ---
interface Product {
    id: number;
    name: string;
    category: string;
    category_id: number;
    final_price: number;
    price: number;
    rating: number;
    sale: boolean;
    description?: string;
    images: string;
    slug: string;
}

interface Category {
    id: number;
    name: string;
}

interface PageProps {
    products: Product[];
}

// --- Sub-Components ---
// const ProductCard = ({ product }: { product: Product }) => {
//     return (
//         <Card className="group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="relative h-40 sm:h-48 w-full bg-slate-100">
//                 <img
//                     src={product.images}
//                     alt={product.name}
//                     className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                 />

//                 {product.sale && (
//                     <Badge className="absolute top-2 left-2 bg-red-500 text-[10px] px-2 py-0 hover:bg-red-600">
//                         SALE
//                     </Badge>
//                 )}

//                 <Button
//                     size="icon"
//                     variant="secondary"
//                     className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-90 transition-opacity hover:opacity-100"
//                 >
//                     <Heart size={14} />
//                 </Button>
//             </div>

//             <CardContent className="space-y-2 p-3 md:p-4">
//                 <div>
//                     <p className="text-[11px] md:text-xs text-muted-foreground line-clamp-1">
//                         {product.category}
//                     </p>
//                     <h2 className="mt-0.5 text-sm md:text-base font-semibold line-clamp-1">
//                         {product.name}
//                     </h2>
//                 </div>

//                 <div className="flex items-center gap-1">
//                     <Star
//                         size={14}
//                         className="fill-yellow-400 text-yellow-400"
//                     />
//                     <span className="text-xs md:text-sm font-medium">
//                         {product.rating}
//                     </span>
//                 </div>

//                 <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
//                     <span className="text-base sm:text-lg font-bold text-slate-900">
//                         {new Intl.NumberFormat('en-NG', {
//                             style: 'currency',
//                             currency: 'NGN',
//                             maximumFractionDigits: 0,
//                         }).format(product.price)}
//                     </span>

//                     <Button size="sm" className="h-8 w-full sm:w-auto px-3 text-xs">
//                         <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
//                         Add
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };
const ProductCard = ({ product }: { product: Product }) => {

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {/* Image Section */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50/50 p-4">
                {/* mix-blend-multiply helps remove white backgrounds from product images */}
                <Link href={product_detail(product.id)}>
                    <img
                        src={product.images}
                        alt={product.name}
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Badges */}
                {product.sale && (
                    <div className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow-sm">
                        SALE
                    </div>
                )}

                {/* Floating Hover Actions */}
                <div className="absolute top-3 right-3 flex translate-x-8 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white hover:text-red-500"
                        // onClick={() =>
                        //     router.post(
                        //         wishlistStore(),
                        //         {
                        //             product_id: product.id,
                        //         },
                        //         {
                        //             preserveScroll: true,
                        //         },
                        //     )
                        // }
                    >
                        <Heart size={15} />
                    </Button>
                    <Link href={product_detail(product.id)}>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white"
                        >
                            <Eye size={15} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star
                            size={12}
                            className="fill-amber-400 text-amber-400"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                            {product.rating}
                        </span>
                    </div>
                </div>

                <Link href={product_detail(product.id)}>
                    <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-semibold text-slate-900 hover:text-primary md:text-base">
                        {product.name}
                    </h3>
                </Link>

                {/* Price and Cart Action */}
                <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex flex-col">
                        {product.sale && (
                            <span className="mb-0.5 text-xs text-slate-400 line-through">
                                {new Intl.NumberFormat('en-NG', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    maximumFractionDigits: 0,
                                }).format(product.price)}{' '}
                                {/* 20% markup for visual effect */}
                            </span>
                        )}
                        <span className="text-base font-black text-slate-900 md:text-lg">
                            {new Intl.NumberFormat('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                                maximumFractionDigits: 0,
                            }).format(product.final_price)}
                        </span>
                    </div>

                    <Button
                        size="icon"
                        className="h-9 w-9 rounded-full shadow-sm transition-transform active:scale-95"
                        // onClick={() =>
                        //     router.post(
                        //         cartStore(),
                        //         {
                        //             product_id: product.id,
                        //             quantity: 1,
                        //         },
                        //         {
                        //             preserveScroll: true,
                        //         },
                        //     )
                        // }
                    >
                        <ShoppingCart size={16} className="text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function ProductListing({ products }: PageProps) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('featured');

    const filteredProducts = useMemo(() => {
        let filtered = products?.filter((product) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                product.name.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword) ||
                product.description?.toLowerCase().includes(keyword);

            const matchesCategory =
                category === 'All' || product.category === category;

            return matchesSearch && matchesCategory;
        }) || [];

        filtered = [...filtered];

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
    }, [products, search, category, sort]);

    return (
        <Frontend>
            <div className="min-h-screen bg-slate-50 pb-12">
                <header className="border-b bg-white">
                    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
                            Shop Products
                        </h1>
                        <p className="mt-1.5 text-sm md:text-base text-muted-foreground">
                            Discover premium products at amazing prices.
                        </p>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            <Input
                                placeholder="Search products..."
                                className="pl-10 w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">
                                    All Categories
                                </SelectItem>
                                {categories.map((cat: Category) => (
                                    <SelectItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-full sm:col-span-2 md:col-span-1">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="rating">Highest Rated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4 text-xs md:text-sm font-medium text-muted-foreground">
                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 px-4 text-center">
                            <div className="mb-4 rounded-full bg-slate-100 p-3">
                                <Search className="h-6 w-6 text-slate-400" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                No products found
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                                We couldn't find any products matching your current filters. Try adjusting your search or category.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => {
                                    setSearch('');
                                    setCategory('All');
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Frontend>
    );
}
