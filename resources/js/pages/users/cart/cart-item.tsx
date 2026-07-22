import { Minus, Plus, Trash2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
    item: CartItemType;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
}

export default function CartItem({
    item,
    updateQuantity,
    removeItem,
}: CartItemProps) {
    return (
        <Card className="overflow-hidden rounded-2xl">
            <CardContent className="p-5">
                <div className="flex flex-col gap-5 sm:flex-row">
                    <img
                        src={item.product.image || '/images/no-image.png'}
                        alt={item.product.name}
                        className="h-32 w-full rounded-xl object-cover sm:w-32"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {item.product.name}
                                </h3>

                                <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
                                    {item.product.color && (
                                        <span>{item.product.color}</span>
                                    )}

                                    {item.product.size && (
                                        <span>Size {item.product.size}</span>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold">
                                ₦
                                {(
                                    item.product.price * item.quantity
                                ).toLocaleString('en-NG')}
                            </h3>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center rounded-full border px-2 py-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                        )
                                    }
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>

                                <span className="w-8 text-center font-medium">
                                    {item.quantity}
                                </span>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                        )
                                    }
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                className="text-destructive"
                                onClick={() => removeItem(item.id)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
