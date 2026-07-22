import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { Product, ProductStatus } from '../types';
import ProductFlags from './productFlags';
import ProductStatusBadge from './productStatusBadge';
import ProductImage from './productImages';
import ProductVariantPreview from './productVariantPreveiw';
import ProductActions from './productAction';

interface Props {
    products: Product[];
    statuses: ProductStatus[];
    onPreview: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export default function ProductTable({
    products,
    statuses,
    onPreview,
    onDelete,
}: Props) {
    if (!products.length) {
        return (
            <Card className="p-16 text-center">
                <h3 className="text-xl font-semibold">No Products Found</h3>
                <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters or create your first product.
                </p>
            </Card>
        );
    }

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[90px]">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Material</TableHead> 
                        <TableHead>Pricing</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Flags</TableHead>
                        <TableHead>Variants</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product) => {
                        const {
                            id,
                            name,
                            slug,
                            short_description,
                            department,
                            category,
                            material,
                            price,
                            final_price,
                            discount_percent,
                            stock_quantity,
                            status,
                            flags,
                            variants,
                        } = product;

                        const stockBadge =
                            stock_quantity === 0 ? (
                                <Badge variant="destructive">Out</Badge>
                            ) : stock_quantity <= 10 ? (
                                <Badge className="bg-orange-500">Low</Badge>
                            ) : (
                                <Badge className="bg-green-600">In Stock</Badge>
                            );

                        return (
                            <TableRow key={id} className="align-top">
                                {/* Image */}
                                <TableCell>
                                    <ProductImage product={product} />
                                </TableCell>

                                {/* Product */}
                                <TableCell className="min-w-[260px]">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">
                                            {name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {slug}
                                        </p>
                                        {short_description && (
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {short_description}
                                            </p>
                                        )}
                                    </div>
                                </TableCell>

                                {/* Department */}
                                <TableCell>
                                    <Badge variant="outline">
                                        {department?.name ?? '-'}
                                    </Badge>
                                </TableCell>

                                {/* Category */}
                                <TableCell>
                                    <Badge variant="secondary">
                                        {category?.name ?? '-'}
                                    </Badge>
                                </TableCell>

                                {/* Material */}
                                <TableCell>{material || '-'}</TableCell>

                                {/* Pricing */}
                                <TableCell>
                                    <div className="space-y-1">
                                        {discount_percent > 0 && (
                                            <>
                                                <p className="text-xs text-muted-foreground line-through">
                                                    ₦{price.toLocaleString()}
                                                </p>
                                                <Badge
                                                    variant="secondary"
                                                    className="px-1.5 py-0 text-[10px]"
                                                >
                                                    {discount_percent}% OFF
                                                </Badge>
                                            </>
                                        )}
                                        <p className="font-semibold text-green-600">
                                            ₦{final_price.toLocaleString()}
                                        </p>
                                    </div>
                                </TableCell>

                                {/* Stock */}
                                <TableCell>
                                    <div className="space-y-1.5">
                                        <p className="text-sm font-medium">
                                            {stock_quantity} Units
                                        </p>
                                        {stockBadge}
                                    </div>
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <ProductStatusBadge
                                        status={status}
                                        statuses={statuses}
                                    />
                                </TableCell>

                                {/* Flags */}
                                <TableCell className="max-w-[180px]">
                                    <ProductFlags flags={flags} />
                                </TableCell>

                                {/* Variants */}
                                <TableCell>
                                    <ProductVariantPreview
                                        variants={variants}
                                    />
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="text-right">
                                    <ProductActions
                                        product={product}
                                        showPreview={onPreview}
                                        showDelete={onDelete}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
    );
}
