import { Box, Palette, Ruler } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Badge } from '@/components/ui/badge';

import { ProductVariant } from '../types';

interface ProductVariantPreviewProps {
    variants: ProductVariant[];
}

export default function ProductVariantPreview({
    variants,
}: ProductVariantPreviewProps) {
    if (!variants.length) {
        return (
            <span className="text-sm text-muted-foreground">No Variants</span>
        );
    }

    const preview = variants.slice(0, 2);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-md border px-3 py-2 text-left transition hover:bg-muted"
                >
                    <Box className="h-4 w-4" />

                    <span className="text-sm font-medium">
                        {variants.length} Variant
                        {variants.length > 1 ? 's' : ''}
                    </span>
                </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-80">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Product Variants</h4>

                        <p className="text-xs text-muted-foreground">
                            {variants.length} available variant
                            {variants.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {variants.map((variant) => (
                            <div
                                key={variant.id}
                                className="rounded-lg border p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary">
                                        Variant #{variant.id}
                                    </Badge>

                                    <span className="text-xs text-muted-foreground">
                                        Stock: {variant.stock_quantity}
                                    </span>
                                </div>

                                <div className="mt-3 grid gap-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Palette className="h-4 w-4 text-muted-foreground" />

                                        {variant.color}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Ruler className="h-4 w-4 text-muted-foreground" />

                                        {variant.size}
                                    </div>

                                    <div className="text-sm font-medium text-green-600">
                                        {variant.price_adjustment > 0
                                            ? `+₦${variant.price_adjustment.toLocaleString()}`
                                            : 'No Price Adjustment'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
