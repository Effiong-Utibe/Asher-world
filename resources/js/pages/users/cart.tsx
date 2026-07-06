"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Ticket,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: number;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [coupon, setCoupon] = useState("");

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      color: "Black",
      size: "Standard",
      price: 249,
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      color: "Silver",
      size: "42mm",
      price: 199,
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shipping = subtotal >= 500 ? 0 : 20;

  const tax = subtotal * 0.075;

  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-24 px-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground" />

          <h2 className="text-3xl font-bold">
            Your cart is empty
          </h2>

          <p className="text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>

          <Button size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-6">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}

        <div className="lg:col-span-2 space-y-6">

          {cartItems.map((item) => (
            <Card key={item.id}>

              <CardContent className="p-6">

                <div className="flex flex-col md:flex-row gap-6">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-36 h-36 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <div>

                        <h2 className="font-semibold text-xl">
                          {item.name}
                        </h2>

                        <div className="flex gap-2 mt-3">

                          <Badge variant="secondary">
                            {item.color}
                          </Badge>

                          <Badge variant="outline">
                            {item.size}
                          </Badge>

                        </div>

                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                      <div className="flex items-center border rounded-lg">

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, -1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="px-5">
                          {item.quantity}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                      </div>

                      <div className="text-2xl font-bold">
                        $
                        {(item.price * item.quantity).toFixed(2)}
                      </div>

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>
          ))}

          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>

        </div>

        {/* SUMMARY */}

        <div>

          <Card className="sticky top-8">

            <CardHeader>

              <CardTitle>
                Order Summary
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div>

                <div className="flex items-center gap-2 mb-3">

                  <Ticket className="h-4 w-4" />

                  <span className="font-medium">
                    Coupon
                  </span>

                </div>

                <div className="flex gap-2">

                  <Input
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) =>
                      setCoupon(e.target.value)
                    }
                  />

                  <Button>
                    Apply
                  </Button>

                </div>

              </div>

              <Separator />

              <div className="space-y-3">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Shipping</span>

                  <span>
                    {shipping === 0
                      ? "Free"
                      : `$${shipping}`}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Tax</span>

                  <span>
                    ${tax.toFixed(2)}
                  </span>

                </div>

              </div>

              <Separator />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span>
                  ${total.toFixed(2)}
                </span>

              </div>

              {shipping > 0 && (
                <div className="bg-muted rounded-lg p-4 text-sm">

                  Spend{" "}
                  <strong>
                    ${(500 - subtotal).toFixed(2)}
                  </strong>{" "}
                  more to enjoy FREE shipping.

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">

                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          subtotal / 5,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>
              )}

              <Button
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}
