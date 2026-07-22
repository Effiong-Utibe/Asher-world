import { ImageOff } from 'lucide-react';

import { Product } from '../types';

interface ProductImageProps {
    product: Product;
    className?: string;
}

export default function ProductImage({
    product,
    className = 'h-16 w-16',
}: ProductImageProps) {
    const image = product.image;
    const imageCount = product.images?.length ?? 0;

    return (
        <div
            className={`relative overflow-hidden rounded-xl border bg-muted ${className}`}
        >
            {image ? (
                <img
                    src={image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 hover:scale-110"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageOff className="h-6 w-6" />
                </div>
            )}

            {imageCount > 1 && (
                <div className="absolute right-1 bottom-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    +{imageCount - 1}
                </div>
            )}
        </div>
    );
}
