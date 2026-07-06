'use client';

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import {
    ArrowLeft,
    CreditCard,
    MapPin,
    Package,
    ShieldCheck,
    Truck,
    ShoppingBag,
} from 'lucide-react';

export default function OrderReview() {
    const [agree, setAgree] = useState(false);

    const items = [
        {
            id: 1,
            name: 'Apple Watch Series 9',
            color: 'Midnight',
            quantity: 1,
            price: 399,
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300',
        },
        {
            id: 2,
            name: 'AirPods Pro',
            color: 'White',
            quantity: 2,
            price: 249,
            image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Review Your Order</h1>

                <p className="mt-2 text-muted-foreground">
                    Please review all information before placing your order.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* LEFT */}

                <div className="space-y-8 lg:col-span-2">
                    {/* Products */}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Order Items
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-5">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-5 rounded-xl border p-4"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                {item.name}
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Color: {item.color}
                                            </p>

                                            <p className="text-sm">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <div className="font-bold">
                                            ${item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping */}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <p className="font-medium">John Doe</p>

                            <p>15 Admiralty Way</p>

                            <p>Lekki Phase 1</p>

                            <p>Lagos, Nigeria</p>

                            <p>+234 800 123 4567</p>
                        </CardContent>
                    </Card>

                    {/* Delivery */}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Delivery Method
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Badge>Express Delivery (1-2 Days)</Badge>
                        </CardContent>
                    </Card>

                    {/* Payment */}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p>Visa ending in **** 4587</p>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT */}

                <div>
                    <Card className="sticky top-6">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>

                            <CardDescription>
                                Review your total before placing order
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$897.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>$15.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$45.00</span>
                                </div>

                                <div className="flex justify-between text-green-600">
                                    <span>Coupon</span>
                                    <span>- $50.00</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>$907.00</span>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="flex items-start gap-3">
                                <Checkbox
                                    checked={agree}
                                    onCheckedChange={(value) =>
                                        setAgree(value === true)
                                    }
                                />

                                <label className="text-sm leading-6">
                                    I agree to the Terms & Conditions and
                                    Privacy Policy.
                                </label>
                            </div>

                            <Button
                                className="mt-6 h-12 w-full"
                                disabled={!agree}
                            >
                                <Package className="mr-2 h-5 w-5" />
                                Place Order
                            </Button>

                            <Button
                                variant="outline"
                                className="mt-3 h-12 w-full"
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Back to Payment
                            </Button>

                            <Separator className="my-6" />

                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-6 w-6 text-green-600" />

                                <div>
                                    <p className="font-medium">
                                        Secure Checkout
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Your payment information is encrypted
                                        and protected.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
