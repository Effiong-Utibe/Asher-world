import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle2,
    Download,
    Eye,
    MoreHorizontal,
    Package,
    Pencil,
    Plus,
    Search,
    SlidersHorizontal,
    Star,
    Trash,
    XCircle,
    type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    price: number;
    final_price?: number;
    stock_quantity: number;
    is_active: boolean;
    is_featured: boolean;
    image?: string;
    category?: {
        id: number;
        name: string;
    };
}

interface Props {
    products?: Product[];
}

const breadcrumbs = [
    {
        title: 'Products',
        href: '/admin/products',
    },
];

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    colorClass?: string;
    bgClass?: string;
}

function StatCard({
    title,
    value,
    icon: Icon,
    colorClass = 'text-muted-foreground',
    bgClass = 'bg-muted/50',
}: StatCardProps) {
    return (
        <Card className="transition-all hover:shadow-md">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <h3 className="text-3xl font-bold">{value}</h3>
                </div>

                <div className={`rounded-full p-3 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${colorClass}`} />
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProductIndex({
    products = [],
}: Props) {
    const [search, setSearch] = useState('');

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return products;

        return products.filter((product) =>
            [
                product.name,
                product.slug,
                product.sku,
            ]
                .filter(Boolean)
                .some((value) =>
                    value.toLowerCase().includes(query),
                ),
        );
    }, [products, search]);

    const stats = useMemo(
        () => ({
            total: products.length,
            active: products.filter((p) => p.is_active).length,
            featured: products.filter((p) => p.is_featured).length,
            lowStock: products.filter(
                (p) =>
                    p.stock_quantity > 0 &&
                    p.stock_quantity <= 10,
            ).length,
            outOfStock: products.filter(
                (p) => p.stock_quantity === 0,
            ).length,
        }),
        [products],
    );

    const formatPrice = (amount: number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);

    const getStockBadge = (quantity: number) => {
        if (quantity === 0) {
            return (
                <Badge
                    variant="destructive"
                    className="border-0"
                >
                    Out of Stock
                </Badge>
            );
        }

        if (quantity <= 10) {
            return (
                <Badge
                    variant="secondary"
                    className="bg-amber-500/10 text-amber-600"
                >
                    Low Stock
                </Badge>
            );
        }

        return (
            <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600"
            >
                In Stock
            </Badge>
        );
    };

    const getStatusBadge = (active: boolean) =>
        active ? (
            <Badge className="bg-blue-500/10 text-blue-600">
                Active
            </Badge>
        ) : (
            <Badge variant="outline">
                Draft
            </Badge>
        );

    return (
        <>
            <Head title="Products" />

            <div className="mx-auto max-w-7xl space-y-8 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Products
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage inventory, pricing and
                            visibility.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="hidden sm:flex"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>

                        <Button asChild>
                            <Link href="/admin/products/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Total Products"
                        value={stats.total}
                        icon={Package}
                        colorClass="text-blue-600"
                        bgClass="bg-blue-500/10"
                    />

                    <StatCard
                        title="Active"
                        value={stats.active}
                        icon={CheckCircle2}
                        colorClass="text-emerald-600"
                        bgClass="bg-emerald-500/10"
                    />

                    <StatCard
                        title="Low Stock"
                        value={stats.lowStock}
                        icon={AlertTriangle}
                        colorClass="text-amber-600"
                        bgClass="bg-amber-500/10"
                    />

                    <StatCard
                        title="Out Of Stock"
                        value={stats.outOfStock}
                        icon={XCircle}
                        colorClass="text-red-600"
                        bgClass="bg-red-500/10"
                    />

                    <StatCard
                        title="Featured"
                        value={stats.featured}
                        icon={Star}
                        colorClass="text-purple-600"
                        bgClass="bg-purple-500/10"
                    />
                </div>

                <Card>
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search products..."
                                className="pl-9"
                            />
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                        >
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">
                                    <Checkbox />
                                </TableHead>

                                <TableHead>
                                    Product
                                </TableHead>

                                <TableHead>
                                    SKU
                                </TableHead>

                                <TableHead>
                                    Category
                                </TableHead>

                                <TableHead className="text-right">
                                    Price
                                </TableHead>

                                <TableHead className="text-right">
                                    Stock
                                </TableHead>

                                <TableHead className="text-center">
                                    Status
                                </TableHead>

                                <TableHead className="text-center">
                                    Featured
                                </TableHead>

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(
                                    (product) => (
                                        <TableRow
                                            key={product.id}
                                        >
                                            <TableCell>
                                                <Checkbox />
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 rounded-lg">
                                                        <AvatarImage
                                                            src={
                                                                product.image
                                                            }
                                                        />

                                                        <AvatarFallback>
                                                            {product.name
                                                                .slice(
                                                                    0,
                                                                    2,
                                                                )
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div>
                                                        <p className="font-medium">
                                                            {
                                                                product.name
                                                            }
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {
                                                                product.slug
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="font-mono">
                                                {
                                                    product.sku
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {product
                                                        .category
                                                        ?.name ??
                                                        'Uncategorized'}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatPrice(
                                                    product.final_price ??
                                                        product.price,
                                                )}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {getStockBadge(
                                                    product.stock_quantity,
                                                )}
                                            </TableCell>

                                            <TableCell className="text-center">
                                                {getStatusBadge(
                                                    product.is_active,
                                                )}
                                            </TableCell>

                                            <TableCell className="text-center">
                                                {product.is_featured ? (
                                                    <Star className="mx-auto h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={`/admin/products/${product.id}/edit`}
                                                            >
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="h-60 text-center"
                                    >
                                        <div className="space-y-3">
                                            <Package className="mx-auto h-8 w-8 text-muted-foreground" />

                                            <div>
                                                <p className="font-medium">
                                                    No products found
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Try adjusting
                                                    your search.
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </>
    );
}

