import {
    CheckCircle2,
    Package,
    Truck,
    CreditCard,
    MapPin,
    Calendar,
    Download,
    Printer,
    Phone,
    Mail,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';


const products = [
    {
        id: 1,
        name: 'Apple iPhone 16 Pro Max',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
        color: 'Natural Titanium',
        quantity: 1,
        price: 1450,
    },
    {
        id: 2,
        name: 'Apple AirPods Pro (2nd Gen)',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300',
        color: 'White',
        quantity: 2,
        price: 249,
    },
];

export default function OrderDetails() {
    const subtotal = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const shipping = 20;
    const tax = 45;
    const total = subtotal + shipping + tax;

    return (
        <div className="container mx-auto max-w-7xl space-y-8 px-4 py-10">
            {/* Header */}

            <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div>
                    <h1 className="text-4xl font-bold">Order #ORD-245879</h1>

                    <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Placed on July 5, 2026
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Invoice
                    </Button>

                    <Button>
                        <Truck className="mr-2 h-4 w-4" />
                        Track Order
                    </Button>
                </div>
            </div>

            {/* Status */}

            <Card>
                <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 md:grid-cols-4">
                        <div className="flex flex-col items-center text-center">
                            <CheckCircle2 className="h-10 w-10 text-green-500" />

                            <p className="mt-2 font-semibold">Order Placed</p>

                            <span className="text-sm text-muted-foreground">
                                Jul 5
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <Package className="h-10 w-10 text-blue-500" />

                            <p className="mt-2 font-semibold">Packed</p>

                            <span className="text-sm text-muted-foreground">
                                Jul 6
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <Truck className="h-10 w-10 text-orange-500" />

                            <p className="mt-2 font-semibold">Shipped</p>

                            <span className="text-sm text-muted-foreground">
                                Jul 7
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <CheckCircle2 className="h-10 w-10 text-gray-400" />

                            <p className="mt-2 font-semibold">Delivered</p>

                            <span className="text-sm text-muted-foreground">
                                Pending
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left */}

                <div className="space-y-6 lg:col-span-2">
                    {/* Ordered Products */}

                    <Card>
                        <CardHeader>
                            <CardTitle>Ordered Items</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-5"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-24 w-24 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {product.name}
                                        </h3>

                                        <p className="text-muted-foreground">
                                            Color: {product.color}
                                        </p>

                                        <p className="text-muted-foreground">
                                            Quantity: {product.quantity}
                                        </p>
                                    </div>

                                    <div className="text-lg font-bold">
                                        $
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Shipping */}

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src="" />

                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>

                                <div>
                                    <h3 className="font-semibold">John Doe</h3>

                                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        25 Main Street, California, Los Angeles,
                                        USA
                                    </div>

                                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        +1 555-123-4567
                                    </div>

                                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        john@example.com
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right */}

                <div className="space-y-6">
                    {/* Payment */}

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-6 w-6" />

                                <div>
                                    <p className="font-semibold">
                                        Visa Ending **** 4589
                                    </p>

                                    <Badge className="mt-2">Paid</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary */}

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>

                                <span>${total.toFixed(2)}</span>
                            </div>

                            <Button className="mt-4 w-full">
                                <Printer className="mr-2 h-4 w-4" />
                                Print Receipt
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
