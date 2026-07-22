'use client';

import {
    CreditCard,
    Wallet,
    Landmark,
    ShieldCheck,
    Lock,
    Ticket,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';


export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Payment</h1>
                <p className="mt-2 text-muted-foreground">
                    Complete your purchase securely.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Section */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Payment Methods */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Select Payment Method</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="space-y-4"
                            >
                                <Label
                                    htmlFor="card"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:border-primary"
                                >
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem
                                            value="card"
                                            id="card"
                                        />

                                        <CreditCard className="h-5 w-5" />

                                        <div>
                                            <p className="font-medium">
                                                Credit / Debit Card
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Visa, Mastercard, Verve
                                            </p>
                                        </div>
                                    </div>
                                </Label>

                                <Label
                                    htmlFor="paypal"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:border-primary"
                                >
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem
                                            value="paypal"
                                            id="paypal"
                                        />

                                        <Wallet className="h-5 w-5" />

                                        <div>
                                            <p className="font-medium">
                                                PayPal
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                Pay with your PayPal account
                                            </p>
                                        </div>
                                    </div>
                                </Label>

                                <Label
                                    htmlFor="bank"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:border-primary"
                                >
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem
                                            value="bank"
                                            id="bank"
                                        />

                                        <Landmark className="h-5 w-5" />

                                        <div>
                                            <p className="font-medium">
                                                Bank Transfer
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                Direct bank payment
                                            </p>
                                        </div>
                                    </div>
                                </Label>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Information</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div>
                                    <Label>Cardholder Name</Label>
                                    <Input placeholder="John Doe" />
                                </div>

                                <div>
                                    <Label>Card Number</Label>
                                    <Input placeholder="1234 5678 9012 3456" />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <Label>Expiry Date</Label>
                                        <Input placeholder="MM/YY" />
                                    </div>

                                    <div>
                                        <Label>CVV</Label>
                                        <Input placeholder="123" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Coupon */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Discount Coupon</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex gap-3">
                                <Input placeholder="Enter coupon code" />

                                <Button variant="outline">
                                    <Ticket className="mr-2 h-4 w-4" />
                                    Apply
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side */}
                <div>
                    <Card className="sticky top-5">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Items</span>
                                    <span>$420.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>$5.99</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$15.00</span>
                                </div>

                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>-$20.00</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>$420.99</span>
                                </div>
                            </div>

                            <Button className="mt-8 h-12 w-full" size="lg">
                                <Lock className="mr-2 h-5 w-5" />
                                Pay Now
                            </Button>

                            <div className="mt-6 flex items-center justify-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-muted-foreground">
                                    Secure SSL Encrypted Payment
                                </span>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-3">
                                <Badge variant="secondary">
                                    ✓ PCI DSS Compliant
                                </Badge>

                                <Badge variant="secondary">
                                    ✓ 256-bit SSL Encryption
                                </Badge>

                                <Badge variant="secondary">
                                    ✓ Safe Checkout Guarantee
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
