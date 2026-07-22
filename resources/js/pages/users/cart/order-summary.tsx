import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { calculateShipping, calculateTax, calculateTotal } from '@/lib/cart';

interface OrderSummaryProps {
    subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, shipping, tax);

    return (
        <Card className="sticky top-6 rounded-2xl">
            <CardContent className="space-y-6 p-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₦{subtotal.toLocaleString('en-NG')}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>

                        <span>
                            {shipping === 0
                                ? 'Free'
                                : `₦${shipping.toLocaleString('en-NG')}`}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Tax</span>

                        <span>₦{tax.toLocaleString('en-NG')}</span>
                    </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span>₦{total.toLocaleString('en-NG')}</span>
                </div>

                <Button className="h-12 w-full">
                    Checkout
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
