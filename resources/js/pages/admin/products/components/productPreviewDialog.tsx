import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';

import { Separator } from '@/components/ui/separator';

import { Package, Layers, Palette, Tag, Boxes } from 'lucide-react';

import ProductImage from './productImages';
import ProductFlags from './productFlags';
import ProductStatusBadge from './productStatusBadge';

import { Product, ProductStatus } from '../types';

interface Props {
    open: boolean;

    product: Product | null;

    statuses: ProductStatus[];

    onOpenChange: (open: boolean) => void;
}

export default function ProductPreviewDialog({
    open,

    product,

    statuses,

    onOpenChange,
}: Props) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Product Preview</DialogTitle>
                </DialogHeader>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Images */}

                    <div className="space-y-4">
                        <ProductImage
                            product={product}
                            className="h-96 w-full"
                        />

                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.thumbnail}
                                        className="h-20 w-full rounded-lg border object-cover"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {product.name}
                            </h2>

                            <p className="text-muted-foreground">
                                {product.slug}
                            </p>
                        </div>

                        <ProductStatusBadge
                            status={product.status}
                            statuses={statuses}
                        />

                        <ProductFlags flags={product.flags} />

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Department
                                </p>

                                <Badge variant="outline">
                                    {product.department?.name ?? '-'}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Category
                                </p>

                                <Badge>{product.category?.name ?? '-'}</Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Material
                                </p>

                                <div className="flex items-center gap-2">
                                    <Layers className="h-4 w-4" />

                                    {product.material}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Color
                                </p>

                                <div className="flex items-center gap-2">
                                    <Palette className="h-4 w-4" />

                                    {product.color}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="font-semibold">Pricing</h4>

                            <div className="mt-3 space-y-2">
                                <p>Original Price</p>

                                <p className="text-muted-foreground line-through">
                                    ₦{product.price.toLocaleString()}
                                </p>

                                <Badge>{product.discount_percent}% OFF</Badge>

                                <p className="text-2xl font-bold text-green-600">
                                    ₦{product.final_price.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="font-semibold">Inventory</h4>

                            <div className="mt-2 flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                {product.stock_quantity} Units
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="font-semibold">Short Description</h4>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {product.short_description}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Description</h4>

                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="mb-3 font-semibold">Variants</h4>

                            <div className="space-y-2">
                                {product.variants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div>
                                            <p>
                                                {variant.color} / {variant.size}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                Stock: {variant.stock_quantity}
                                            </p>
                                        </div>

                                        <Badge variant="secondary">
                                            {variant.price_adjustment > 0
                                                ? `+₦${variant.price_adjustment.toLocaleString()}`
                                                : 'Default'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
