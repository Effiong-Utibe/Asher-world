import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Pencil,
    Trash2,
    Package,
    Tag,
    Boxes,
    DollarSign,
    Percent,
    Archive,
    CreditCard
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { destroy, edit, index } from '@/routes/products';


interface Variant {
    id: number;
    color: string;
    size: string;
    sku: string;
    stock_quantity: number;
    price_adjustment: number;
}

interface ProductImage {
    id: number;
    url: string;
    thumbnail?: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    short_description: string;
    description: string;
    material: string;
    color: string;
    gender?: string;
    price: number;
    discount_percent: number;
    final_price: number;
    stock_quantity: number;
    is_featured: boolean;
    is_best_seller: boolean;
    is_new_arrival: boolean;
    is_active: boolean;
    created_at: string;
    category?: { id: number; name: string; };
    department?: { id: number; name: string; };
    images?: ProductImage[];
    variants: Variant[];
}

interface Props {
    product: Product;
}

export default function Show({ product }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.visit(destroy(product.id), {
                method: 'delete',
            });
        }
    };

    return (
        <>
            <Head title={product.name} />

            <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link href={index()}>
                            <Button variant="outline" size="sm" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Products
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {product.name}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage product details, pricing, and inventory
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
                        <Link href={edit(product.id)} className="w-full sm:w-auto">
                            <Button className="w-full">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Product
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="w-full sm:w-auto"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Left Column: Heavy Data (Info, Desc, Variants) */}
                    <div className="space-y-6 lg:col-span-2 order-2 lg:order-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <InfoItem icon={<Tag size={18} />} title="Product Name" value={product.name} />
                                    <InfoItem icon={<Boxes size={18} />} title="SKU" value={product.sku} />
                                    <InfoItem icon={<Package size={18} />} title="Category" value={product.category?.name ?? '-'} />
                                    <InfoItem icon={<Package size={18} />} title="Department" value={product.department?.name ?? '-'} />
                                    <InfoItem icon={<Tag size={18} />} title="Slug" value={product.slug} />
                                    <InfoItem icon={<Package size={18} />} title="Gender" value={product.gender ?? '-'} />
                                    <InfoItem icon={<Package size={18} />} title="Material" value={product.material} />
                                    <InfoItem
                                        icon={<Package size={18} />}
                                        title="Created"
                                        value={new Date(product.created_at).toLocaleDateString()}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="mb-2 text-sm font-semibold text-foreground">Short Description</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {product.short_description || 'No short description provided.'}
                                    </p>
                                </div>
                                <div className="border-t pt-6">
                                    <h4 className="mb-2 text-sm font-semibold text-foreground">Full Description</h4>
                                    <p className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
                                        {product.description || 'No detailed description provided.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Variants ({product.variants?.length || 0})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto rounded-md border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium">Color</th>
                                                <th className="px-4 py-3 text-left font-medium">Size</th>
                                                <th className="px-4 py-3 text-left font-medium">SKU</th>
                                                <th className="px-4 py-3 text-left font-medium">Stock</th>
                                                <th className="px-4 py-3 text-right font-medium">Adjustment</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {product.variants.length > 0 ? (
                                                product.variants.map((variant) => (
                                                    <tr key={variant.id} className="hover:bg-muted/50 transition-colors">
                                                        <td className="px-4 py-3 font-medium">{variant.color}</td>
                                                        <td className="px-4 py-3">{variant.size}</td>
                                                        <td className="px-4 py-3 text-muted-foreground">{variant.sku}</td>
                                                        <td className="px-4 py-3">
                                                            <Badge variant={variant.stock_quantity > 10 ? 'outline' : 'destructive'}>
                                                                {variant.stock_quantity} in stock
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            {new Intl.NumberFormat('en-NG', {
                                                                style: 'currency',
                                                                currency: 'NGN',
                                                            }).format(variant.price_adjustment)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                                        No variants configured for this product.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Visuals & Meta (Images, Status, Pricing) */}
                    <div className="space-y-6 lg:col-span-1 order-1 lg:order-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Images</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {product.images?.length ? (
                                    <div className="space-y-4">
                                        <div className="aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        {product.images.length > 1 && (
                                            <div className="grid grid-cols-4 gap-2">
                                                {product.images.slice(1).map((image) => (
                                                    <div key={image.id} className="aspect-square overflow-hidden rounded-md border">
                                                        <img
                                                            src={image.url}
                                                            alt={`${product.name} thumbnail`}
                                                            className="h-full w-full object-cover transition-transform hover:scale-110"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-10 text-center">
                                        <Package className="mb-2 h-10 w-10 text-muted-foreground" />
                                        <p className="text-sm font-medium text-muted-foreground">No images available</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Status & Visibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {product.is_active ? (
                                        <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20">Active</Badge>
                                    ) : (
                                        <Badge variant="destructive">Inactive</Badge>
                                    )}
                                    {product.is_featured && <Badge variant="secondary">Featured</Badge>}
                                    {product.is_best_seller && <Badge className="bg-orange-500/15 text-orange-600 hover:bg-orange-500/25 border-orange-500/20">Best Seller</Badge>}
                                    {product.is_new_arrival && <Badge className="bg-purple-500/15 text-purple-600 hover:bg-purple-500/25 border-purple-500/20">New Arrival</Badge>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing & Inventory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <StatBlock
                                        title="Base Price"
                                        value={product.price}
                                        icon={<CreditCard size={16} />}
                                        isCurrency
                                    />
                                    <StatBlock
                                        title="Discount"
                                        value={product.discount_percent}
                                        icon={<Percent size={16} />}
                                        suffix="%"
                                    />
                                    <StatBlock
                                        title="Final Price"
                                        value={product.final_price}
                                        icon={<DollarSign size={16} />}
                                        isCurrency
                                        className="col-span-2 bg-primary/5 border-primary/10"
                                    />
                                    <StatBlock
                                        title="Total Stock"
                                        value={product.stock_quantity}
                                        icon={<Archive size={16} />}
                                        className="col-span-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    );
}

// Sub-components to keep code clean

function InfoItem({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | number }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground/70">{icon}</div>
            <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
            </div>
        </div>
    );
}

function StatBlock({
    title,
    value,
    icon,
    suffix = '',
    isCurrency = false,
    className = ''
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    suffix?: string;
    isCurrency?: boolean;
    className?: string;
}) {
    const formattedValue = isCurrency
        ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value)
        : value.toLocaleString() + suffix;

    return (
        <div className={`rounded-lg border bg-card p-3 shadow-sm ${className}`}>
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                {icon}
                <p className="text-xs font-medium">{title}</p>
            </div>
            <h3 className="text-lg font-bold tracking-tight text-foreground truncate">
                {formattedValue}
            </h3>
        </div>
    );
}
