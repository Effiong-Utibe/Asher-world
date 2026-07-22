'use client';

import { Truck, ShieldCheck, Clock3, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function Shipping() {
    const [shippingMethod, setShippingMethod] = useState('standard');

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Shipping Details</h1>
                <p className="mt-2 text-muted-foreground">
                    Enter your shipping address and choose your preferred
                    delivery option.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Shipping Form */}

                <div className="space-y-8 lg:col-span-2">
                    <Card>
                        <CardContent className="space-y-6 p-6">
                            <h2 className="text-xl font-semibold">
                                Shipping Address
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <Label>First Name</Label>
                                    <Input placeholder="John" />
                                </div>

                                <div>
                                    <Label>Last Name</Label>
                                    <Input placeholder="Doe" />
                                </div>

                                <div className="md:col-span-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="john@email.com"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label>Phone Number</Label>
                                    <Input placeholder="+234 800 000 0000" />
                                </div>

                                <div className="md:col-span-2">
                                    <Label>Street Address</Label>
                                    <Input placeholder="House No, Street" />
                                </div>

                                <div>
                                    <Label>Country</Label>

                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="nigeria">
                                                Nigeria
                                            </SelectItem>

                                            <SelectItem value="ghana">
                                                Ghana
                                            </SelectItem>

                                            <SelectItem value="kenya">
                                                Kenya
                                            </SelectItem>

                                            <SelectItem value="usa">
                                                United States
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>State</Label>

                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="State" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="lagos">
                                                Lagos
                                            </SelectItem>

                                            <SelectItem value="abuja">
                                                Abuja
                                            </SelectItem>

                                            <SelectItem value="oyo">
                                                Oyo
                                            </SelectItem>

                                            <SelectItem value="rivers">
                                                Rivers
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>City</Label>
                                    <Input placeholder="Lagos" />
                                </div>

                                <div>
                                    <Label>Postal Code</Label>
                                    <Input placeholder="100001" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Method */}

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="mb-6 text-xl font-semibold">
                                Shipping Method
                            </h2>

                            <RadioGroup
                                value={shippingMethod}
                                onValueChange={setShippingMethod}
                                className="space-y-4"
                            >
                                <Label
                                    htmlFor="standard"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem
                                            value="standard"
                                            id="standard"
                                        />

                                        <div>
                                            <h3 className="font-medium">
                                                Standard Delivery
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                3 - 5 Business Days
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-semibold">$5.99</span>
                                </Label>

                                <Label
                                    htmlFor="express"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem
                                            value="express"
                                            id="express"
                                        />

                                        <div>
                                            <h3 className="font-medium">
                                                Express Delivery
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                1 - 2 Business Days
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-semibold">
                                        $12.99
                                    </span>
                                </Label>

                                <Label
                                    htmlFor="overnight"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <RadioGroupItem
                                            value="overnight"
                                            id="overnight"
                                        />

                                        <div>
                                            <h3 className="font-medium">
                                                Overnight Delivery
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Next Day Delivery
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-semibold">
                                        $24.99
                                    </span>
                                </Label>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* Delivery Note */}

                    <Card>
                        <CardContent className="p-6">
                            <Label>Delivery Instructions</Label>

                            <Textarea
                                rows={5}
                                placeholder="Leave package at the front door..."
                                className="mt-3"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}

                <div>
                    <Card className="sticky top-5">
                        <CardContent className="p-6">
                            <h2 className="mb-6 text-xl font-semibold">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$420.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>
                                        {shippingMethod === 'standard'
                                            ? '$5.99'
                                            : shippingMethod === 'express'
                                              ? '$12.99'
                                              : '$24.99'}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$15.00</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>

                                    <span>
                                        {shippingMethod === 'standard'
                                            ? '$440.99'
                                            : shippingMethod === 'express'
                                              ? '$447.99'
                                              : '$459.99'}
                                    </span>
                                </div>
                            </div>

                            <Button className="mt-8 h-12 w-full">
                                <CreditCard className="mr-2 h-5 w-5" />
                                Continue to Payment
                            </Button>

                            <Separator className="my-6" />

                            <div className="space-y-4 text-sm">
                                <div className="flex gap-3">
                                    <Truck className="h-5 w-5 text-primary" />

                                    <div>
                                        <p className="font-medium">
                                            Fast Shipping
                                        </p>

                                        <p className="text-muted-foreground">
                                            Reliable nationwide delivery.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <ShieldCheck className="h-5 w-5 text-primary" />

                                    <div>
                                        <p className="font-medium">
                                            Secure Checkout
                                        </p>

                                        <p className="text-muted-foreground">
                                            SSL encrypted payment.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Clock3 className="h-5 w-5 text-primary" />

                                    <div>
                                        <p className="font-medium">
                                            Delivery Support
                                        </p>

                                        <p className="text-muted-foreground">
                                            Track your order anytime.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
