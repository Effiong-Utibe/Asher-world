import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { create } from '@/routes/products';

import { Product, ProductPageProps } from './types';
import ProductFilters from './components/productFilter';
import ProductStats from './components/productStats';
import ProductTable from './components/productTable';
import DeleteProductDialog from './components/deleteProductDialog';
import ProductPreviewDialog from './components/productPreviewDialog';
import ProductCard from './components/ProductCard';

const INITIAL_FILTERS = {
    search: '',
    department: 'all',
    category: 'all',
    status: 'all',
    stock: 'all',
    sort: 'latest',
};

export default function ProductIndex({
    products,
    departments,
    statuses,
    flash,
}: ProductPageProps) {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

    const updateFilter = (key: keyof typeof INITIAL_FILTERS, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    /*
    |--------------------------------------------------------------------------
    | Analytics (Optimized to a single pass)
    |--------------------------------------------------------------------------
    */
    const analytics = useMemo(() => {
        return products.reduce(
            (acc, product) => {
                acc.total++;
                if (product.status === 'published') acc.published++;
                if (product.status === 'draft') acc.draft++;
                if (product.status === 'archived') acc.archived++;
                if (product.flags.is_featured) acc.featured++;
                if (product.flags.is_trending) acc.trending++;
                if (product.flags.is_best_seller) acc.bestSeller++;
                if (product.flags.is_new_arrival) acc.newArrival++;

                if (product.stock_quantity === 0) {
                    acc.outOfStock++;
                } else if (product.stock_quantity <= 10) {
                    acc.lowStock++;
                }

                return acc;
            },
            {
                total: 0,
                published: 0,
                draft: 0,
                archived: 0,
                featured: 0,
                trending: 0,
                bestSeller: 0,
                newArrival: 0,
                lowStock: 0,
                outOfStock: 0,
            },
        );
    }, [products]);

    /*
    |--------------------------------------------------------------------------
    | Products Filtering & Sorting
    |--------------------------------------------------------------------------
    */
    const filteredProducts = useMemo(() => {
        const { search, department, category, status, stock, sort } = filters;
        let data = products;

        if (search.trim()) {
            const keyword = search.toLowerCase();
            data = data.filter(
                (p) =>
                    p.name.toLowerCase().includes(keyword) ||
                    p.slug.toLowerCase().includes(keyword) ||
                    p.short_description?.toLowerCase().includes(keyword) ||
                    p.description?.toLowerCase().includes(keyword),
            );
        }

        if (department !== 'all') {
            data = data.filter(
                (p) => p.department?.id.toString() === department,
            );
        }

        if (category !== 'all') {
            data = data.filter((p) => p.category?.id.toString() === category);
        }

        if (status !== 'all') {
            data = data.filter((p) => p.status === status);
        }

        if (stock !== 'all') {
            data = data.filter((p) => {
                if (stock === 'instock') return p.stock_quantity > 10;
                if (stock === 'low')
                    return p.stock_quantity > 0 && p.stock_quantity <= 10;
                if (stock === 'out') return p.stock_quantity === 0;
                return true;
            });
        }

        // Create a copy only when sorting to avoid mutating the original array
        return [...data].sort((a, b) => {
            switch (sort) {
                case 'oldest':
                    return a.id - b.id;
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'price_low':
                    return a.final_price - b.final_price;
                case 'price_high':
                    return b.final_price - a.final_price;
                case 'stock_low':
                    return a.stock_quantity - b.stock_quantity;
                case 'stock_high':
                    return b.stock_quantity - a.stock_quantity;
                default:
                    return b.id - a.id; // 'latest'
            }
        });
    }, [products, filters]);

    return (
        <>
            <Head title="Products" />

            <div className="space-y-8 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Products
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Manage your product catalogue, inventory, pricing,
                            variants and visibility.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button asChild size="lg">
                            <Link href={create()}>
                                <Plus className="mr-2 h-5 w-5" />
                                Create Product
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Flash Messages */}
                <div className="space-y-3">
                    {[
                        { text: flash.success, color: 'green' },
                        { text: flash.error, color: 'red' },
                        { text: flash.message, color: 'blue' },
                    ].map(
                        ({ text, color }, idx) =>
                            text && (
                                <div
                                    key={idx}
                                    className={`rounded-lg border border-${color}-200 bg-${color}-50 px-4 py-3 text-${color}-700`}
                                >
                                    {text}
                                </div>
                            ),
                    )}
                </div>

                {/* Statistics */}
                <ProductStats analytics={analytics} />

                {/* Filters */}
                <ProductFilters
                    search={filters.search}
                    department={filters.department}
                    category={filters.category}
                    status={filters.status}
                    stock={filters.stock}
                    sort={filters.sort}
                    departments={departments}
                    statuses={statuses}
                    onSearchChange={(v) => updateFilter('search', v)}
                    onDepartmentChange={(v) => updateFilter('department', v)}
                    onCategoryChange={(v) => updateFilter('category', v)}
                    onStatusChange={(v) => updateFilter('status', v)}
                    onStockChange={(v) => updateFilter('stock', v)}
                    onSortChange={(v) => updateFilter('sort', v)}
                    onReset={() => setFilters(INITIAL_FILTERS)}
                />

                {/* Desktop View */}
                <div className="hidden lg:block">
                    <ProductTable
                        products={filteredProducts}
                        statuses={statuses}
                        onPreview={setPreviewProduct}
                        onDelete={setDeleteProduct}
                    />
                </div>

                {/* Mobile View */}
                <div className="grid gap-6 lg:hidden">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            statuses={statuses}
                            onPreview={setPreviewProduct}
                            onDelete={setDeleteProduct}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="rounded-xl border border-dashed py-20 text-center">
                        <h2 className="text-2xl font-semibold">
                            No Products Found
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            No products matched your current filters.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href={create()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Product
                            </Link>
                        </Button>
                    </div>
                )}

                {/* Dialogs */}
                <ProductPreviewDialog
                    open={previewProduct !== null}
                    product={previewProduct}
                    statuses={statuses}
                    onOpenChange={(open) => !open && setPreviewProduct(null)}
                />

                <DeleteProductDialog
                    open={deleteProduct !== null}
                    product={deleteProduct}
                    onOpenChange={(open) => !open && setDeleteProduct(null)}
                />
            </div>
        </>
    );
}
