import Frontend from '@/layouts/front-end-layout';

import { router } from '@inertiajs/react';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { product_list } from '@/actions/App/Http/Controllers/UserproductController';
import { update, destroy } from '@/actions/App/Http/Controllers/CartController';

import CartItem from './cart-item';
import OrderSummary from './order-summary';
import EmptyCart from './empty-cart';

import type { CartData } from '@/types/cart';

interface Props {
    cart: CartData;
}

export default function Index({ cart }: Props) {
    const cartItems = cart.items;

    const subtotal = cart.subtotal;

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }

        router.patch(
            update(id),
            { quantity },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const removeItem = (id: number) => {
        router.delete(destroy(id), {
            preserveScroll: true,
        });
    };

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <Frontend>
            <div className="container mx-auto px-4 py-10 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Shopping Cart</h1>

                        <p className="text-muted-foreground">
                            {cartItems.length}{' '}
                            {cartItems.length === 1 ? 'Item' : 'Items'}
                        </p>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Cart Items */}
                    <div className="space-y-5 lg:col-span-8">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                updateQuantity={updateQuantity}
                                removeItem={removeItem}
                            />
                        ))}

                        <Button
                            variant="outline"
                            onClick={() => router.visit(product_list())}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Continue Shopping
                        </Button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <OrderSummary subtotal={subtotal} />
                    </div>
                </div>
            </div>
        </Frontend>
    );
}
