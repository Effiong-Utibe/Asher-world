import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Separator,
} from "@/components/ui/separator";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import {
  Label,
} from "@/components/ui/label";

import {
  Input,
} from "@/components/ui/input";

import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
} from "lucide-react";
import Frontend from "@/layouts/front-end-layout";

export default function ProductDetails() {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
      <Frontend>
          <div className="container mx-auto px-4 py-10">
              <div className="grid gap-12 lg:grid-cols-2">
                  {/* Images */}

                  <div>
                      <Card className="overflow-hidden rounded-2xl">
                          <img
                              src={selectedImage}
                              alt="Product"
                              className="h-[600px] w-full object-cover"
                          />
                      </Card>

                      <div className="mt-4 grid grid-cols-4 gap-4">
                          {images.map((image, index) => (
                              <button
                                  key={index}
                                  onClick={() => setSelectedImage(image)}
                                  className={`overflow-hidden rounded-xl border-2 ${
                                      selectedImage === image
                                          ? 'border-primary'
                                          : 'border-transparent'
                                  }`}
                              >
                                  <img
                                      src={image}
                                      className="h-28 w-full object-cover"
                                      alt=""
                                  />
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Product */}

                  <div>
                      <Badge className="mb-4">Best Seller</Badge>

                      <h1 className="text-4xl font-bold">
                          Nike Air Max Premium Sneakers
                      </h1>

                      <div className="mt-4 flex items-center gap-3">
                          <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                      key={star}
                                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                  />
                              ))}
                          </div>

                          <span className="text-muted-foreground">
                              (254 Reviews)
                          </span>
                      </div>

                      <div className="mt-6 flex items-center gap-4">
                          <span className="text-4xl font-bold text-primary">
                              $149
                          </span>

                          <span className="text-gray-500 line-through">
                              $199
                          </span>

                          <Badge variant="destructive">25% OFF</Badge>
                      </div>

                      <p className="mt-6 leading-7 text-muted-foreground">
                          Experience superior comfort and premium performance
                          with the latest Nike Air Max sneakers, designed for
                          everyday lifestyle and athletic performance.
                      </p>

                      <Separator className="my-8" />

                      {/* Sizes */}

                      <div>
                          <h3 className="mb-3 font-semibold">Select Size</h3>

                          <RadioGroup defaultValue="42" className="flex gap-3">
                              {['40', '41', '42', '43', '44'].map((size) => (
                                  <div key={size}>
                                      <RadioGroupItem
                                          value={size}
                                          id={size}
                                          className="peer sr-only"
                                      />

                                      <Label
                                          htmlFor={size}
                                          className="cursor-pointer rounded-lg border px-5 py-3 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white"
                                      >
                                          {size}
                                      </Label>
                                  </div>
                              ))}
                          </RadioGroup>
                      </div>

                      <div className="mt-8">
                          <h3 className="mb-3 font-semibold">Color</h3>

                          <div className="flex gap-4">
                              <div className="h-8 w-8 cursor-pointer rounded-full border-2 bg-black"></div>

                              <div className="h-8 w-8 cursor-pointer rounded-full border-2 bg-red-500"></div>

                              <div className="h-8 w-8 cursor-pointer rounded-full border-2 bg-blue-600"></div>
                          </div>
                      </div>

                      {/* Quantity */}

                      <div className="mt-8">
                          <h3 className="mb-3 font-semibold">Quantity</h3>

                          <div className="flex items-center gap-3">
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                      quantity > 1 && setQuantity(quantity - 1)
                                  }
                              >
                                  <Minus size={18} />
                              </Button>

                              <Input
                                  value={quantity}
                                  readOnly
                                  className="w-20 text-center"
                              />

                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setQuantity(quantity + 1)}
                              >
                                  <Plus size={18} />
                              </Button>
                          </div>
                      </div>

                      {/* Buttons */}

                      <div className="mt-10 flex flex-wrap gap-4">
                          <Button className="h-12 flex-1" size="lg">
                              <ShoppingCart className="mr-2 h-5 w-5" />
                              Add to Cart
                          </Button>

                          <Button
                              variant="secondary"
                              className="h-12 flex-1"
                              size="lg"
                          >
                              Buy Now
                          </Button>

                          <Button
                              variant="outline"
                              size="icon"
                              className="h-12 w-12"
                          >
                              <Heart />
                          </Button>
                      </div>

                      <Separator className="my-10" />

                      {/* Shipping */}

                      <div className="space-y-5">
                          <div className="flex gap-4">
                              <Truck className="text-primary" />

                              <div>
                                  <h4 className="font-semibold">
                                      Free Shipping
                                  </h4>

                                  <p className="text-muted-foreground">
                                      Free shipping on orders over $100
                                  </p>
                              </div>
                          </div>

                          <div className="flex gap-4">
                              <RotateCcw className="text-primary" />

                              <div>
                                  <h4 className="font-semibold">
                                      Easy Returns
                                  </h4>

                                  <p className="text-muted-foreground">
                                      30-day return policy
                                  </p>
                              </div>
                          </div>

                          <div className="flex gap-4">
                              <ShieldCheck className="text-primary" />

                              <div>
                                  <h4 className="font-semibold">
                                      Secure Payment
                                  </h4>

                                  <p className="text-muted-foreground">
                                      100% Secure Checkout
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Tabs */}

              <Tabs defaultValue="description" className="mt-16">
                  <TabsList>
                      <TabsTrigger value="description">Description</TabsTrigger>

                      <TabsTrigger value="features">Features</TabsTrigger>

                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description">
                      <Card>
                          <CardContent className="p-6 leading-8">
                              The Nike Air Max Premium combines cutting-edge
                              cushioning technology with lightweight breathable
                              materials, making it ideal for both sports and
                              everyday wear.
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="features">
                      <Card>
                          <CardContent className="p-6">
                              <ul className="ml-6 list-disc space-y-3">
                                  <li>Premium Leather Upper</li>

                                  <li>Air Max Cushioning</li>

                                  <li>Rubber Outsole</li>

                                  <li>Breathable Mesh</li>

                                  <li>Lightweight Construction</li>
                              </ul>
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="reviews">
                      <Card>
                          <CardContent className="p-6">
                              ⭐⭐⭐⭐⭐ Excellent product. Highly recommended!
                          </CardContent>
                      </Card>
                  </TabsContent>
              </Tabs>
          </div>
      </Frontend>
  );
}
