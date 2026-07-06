
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

import { Heart, ShoppingCart, Star } from 'lucide-react';

interface Props {
    product: Product;
}
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    image: string;
    badge?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Premium Wireless Headphone',
        category: 'Electronics',
        price: 129,
        oldPrice: 179,
        rating: 4.8,
        badge: '20% OFF',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    },
    {
        id: 2,
        name: 'Apple Watch Series',
        category: 'Electronics',
        price: 299,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
    },
    {
        id: 3,
        name: 'Running Sneakers',
        category: 'Fashion',
        price: 85,
        oldPrice: 110,
        rating: 4.4,
        badge: 'SALE',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    },
    {
        id: 4,
        name: 'Leather Backpack',
        category: 'Fashion',
        price: 79,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1542291026-c5d0c4b7b83f',
    },
    {
        id: 5,
        name: 'Gaming Keyboard',
        category: 'Electronics',
        price: 99,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8',
    },
    {
        id: 6,
        name: 'Modern Chair',
        category: 'Furniture',
        price: 240,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
    },
];

export default function ProductCard({ product }: Props) {
    return (
        <Card className="group overflow-hidden rounded-xl transition hover:shadow-xl">
            <div className="relative">
                <img
                    src={product.image}
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {product.badge && (
                    <Badge className="absolute top-3 left-3">
                        {product.badge}
                    </Badge>
                )}

                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 rounded-full"
                >
                    <Heart size={18} />
                </Button>
            </div>

            <div className="space-y-3 p-4">
                <p className="text-sm text-muted-foreground">
                    {product.category}
                </p>

                <h3 className="font-semibold">{product.name}</h3>

                <div className="flex items-center gap-1">
                    <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                    />

                    {product.rating}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">${product.price}</span>

                    {product.oldPrice && (
                        <span className="text-muted-foreground line-through">
                            ${product.oldPrice}
                        </span>
                    )}
                </div>

                <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add To Cart
                </Button>
            </div>
        </Card>
    );
}
