import { Link } from '@inertiajs/react';
import { Boxes, FolderTree, Package, Tag } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Product, ProductStatus } from '../types';
import ProductImage from './productImages';
import { show } from '@/routes/products';
import ProductActions from './productAction';
import ProductStatusBadge from './productStatusBadge';
import ProductFlags from './productFlags';

interface ProductCardProps {
    product: Product;
    statuses: ProductStatus[];
    onPreview: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export default function ProductCard({
    product,
    statuses,
    onPreview,
    onDelete,
}: ProductCardProps) {
    const {
        id,
        name,
        slug,
        status,
        flags,
        department,
        category,
        material,
        price,
        final_price,
        discount_percent,
        stock_quantity,
        short_description,
    } = product;

    const stockBadge =
        stock_quantity === 0 ? (
            <Badge variant="destructive">Out of Stock</Badge>
        ) : stock_quantity <= 10 ? (
            <Badge className="bg-orange-500">Low Stock</Badge>
        ) : (
            <Badge className="bg-green-600">In Stock</Badge>
        );

    return (
        <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
            <ProductImage
                product={product}
                className="h-56 w-full rounded-none object-cover"
            />

            <CardContent className="flex flex-1 flex-col p-5">
                {/* Header Section */}
                <div className="mb-4 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                            <Link
                                href={show(id)}
                                className="line-clamp-2 text-lg font-semibold hover:text-primary"
                                title={name}
                            >
                                {name}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                {slug}
                            </p>
                        </div>
                        <ProductActions
                            product={product}
                            showPreview={onPreview}
                            showDelete={onDelete}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <ProductStatusBadge
                            status={status}
                            statuses={statuses}
                        />
                        <ProductFlags flags={flags} />
                    </div>
                </div>

                <Separator className="mb-4" />

                {/* Metadata Section */}
                <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-sm">
                        <FolderTree className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Department:</span>
                        <Badge variant="outline">
                            {department?.name ?? '-'}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Boxes className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Category:</span>
                        <Badge variant="secondary">
                            {category?.name ?? '-'}
                        </Badge>
                    </div>

                    {material && (
                        <div className="flex items-center gap-2 text-sm">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Material:</span>
                            <span className="text-muted-foreground">
                                {material}
                            </span>
                        </div>
                    )}
                </div>

                <Separator className="my-4" />

                {/* Commerce Section (Pushed to bottom using mt-auto) */}
                <div className="mt-auto space-y-4">
                    <div className="flex items-end justify-between gap-4">
                        {/* Price */}
                        <div className="space-y-1">
                            {price !== final_price && (
                                <div className="text-xs text-muted-foreground line-through">
                                    ₦{price.toLocaleString()}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-green-600">
                                    ₦{final_price.toLocaleString()}
                                </span>
                                {discount_percent > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="px-1.5 py-0"
                                    >
                                        {discount_percent}% OFF
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="text-right">
                            {stockBadge}
                            <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                                <Package className="h-3.5 w-3.5" />
                                {stock_quantity} Units
                            </div>
                        </div>
                    </div>

                    {/* Optional Description block */}
                    {short_description && (
                        <div className="rounded-lg bg-muted/50 p-3">
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                                {short_description}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
