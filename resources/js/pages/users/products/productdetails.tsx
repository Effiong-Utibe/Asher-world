import { useEffect, useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ChevronRight,
    Heart,
    Minus,
    Plus,
    Share2,
    ShoppingCart,
    Star,
    Truck,
    ShieldCheck,
    RotateCcw,
    Check,
    Package,
} from 'lucide-react';

import Frontend from '@/layouts/front-end-layout';
import { store } from '@/actions/App/Http/Controllers/CartController';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductImage {
    id: number;
    url: string;
}

interface Variant {
    id: number;
    color: string;
    size: string;
    sku: string;
    stock_quantity: number;
    price_adjustment: number;
}

interface Category {
    id: number;
    name: string;
}

interface Department {
    id: number;
    name: string;
}

interface ProductFlags {
    is_featured: boolean;
    is_best_seller: boolean;
    is_new_arrival: boolean;
    is_trending: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    short_description: string;
    description: string;
    material: string;
    color: string | null;
    price: number;
    final_price: number;
    discount_percent: number;
    stock_quantity: number;
    category: Category | null;
    department: Department | null;
    flags: ProductFlags;
    images: ProductImage[];
    variants: Variant[];
}

interface Props {
    product: Product;
    relatedProducts?: {
        id: number;
        name: string;
        slug: string;
        price: number;
        image: string;
    }[];
}

export default function ProductDetails({
    product,
    relatedProducts = [],
}: Props) {
    const images = useMemo(() => {
        if (!product.images.length) {
            return ['/images/no-image.png'];
        }
        return product.images.map((image) => image.url);
    }, [product.images]);

    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
        product.variants.length ? product.variants[0] : null,
    );
    const [quantity, setQuantity] = useState(1);

    const originalPrice =
        product.price + (selectedVariant?.price_adjustment ?? 0);
    const currentPrice =
        product.final_price + (selectedVariant?.price_adjustment ?? 0);
    const stock = selectedVariant?.stock_quantity ?? product.stock_quantity;

    useEffect(() => {
        if (quantity > stock) {
            setQuantity(stock > 0 ? stock : 1);
        }
    }, [stock, quantity]);

    const addToCart = () => {
        router.post(
            store(),
            {
                product_id: product.id,
                variant_id: selectedVariant?.id,
                quantity,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <Frontend>
            <Head title={product.name} />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    {product.department && (
                        <>
                            <Link href="#">{product.department.name}</Link>
                            <ChevronRight className="h-4 w-4" />
                        </>
                    )}
                    {product.category && (
                        <>
                            <Link href="#">{product.category.name}</Link>
                            <ChevronRight className="h-4 w-4" />
                        </>
                    )}
                    <span className="font-medium text-foreground">
                        {product.name}
                    </span>
                </div>

                {/* Main Product Section */}
                <div className="grid gap-10 lg:grid-cols-2">
                    {/* ================= LEFT SIDE (Images) ================= */}
                    <div>
                        <Card className="overflow-hidden rounded-2xl">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                onError={(e) => {
                                    if (
                                        !e.currentTarget.src.includes(
                                            '/images/no-image.png',
                                        )
                                    ) {
                                        e.currentTarget.src =
                                            '/images/no-image.png';
                                    }
                                }}
                                className="h-[650px] w-full object-cover"
                            />
                        </Card>

                        <div className="mt-5 grid grid-cols-5 gap-3">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={`overflow-hidden rounded-xl border-2 transition ${
                                        selectedImage === image
                                            ? 'border-primary'
                                            : 'border-transparent hover:border-primary'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        className="h-24 w-full object-cover"
                                        alt="Thumbnail"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT SIDE (Details) ================= */}
                    <div className="flex flex-col">
                        {/* Product Flags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                            {product.flags?.is_best_seller && (
                                <Badge className="bg-orange-500 hover:bg-orange-600">
                                    Best Seller
                                </Badge>
                            )}
                            {product.flags?.is_featured && (
                                <Badge className="bg-blue-600 hover:bg-blue-700">
                                    Featured
                                </Badge>
                            )}
                            {product.flags?.is_new_arrival && (
                                <Badge className="bg-green-600 hover:bg-green-700">
                                    New Arrival
                                </Badge>
                            )}
                            {product.flags?.is_trending && (
                                <Badge className="bg-purple-600 hover:bg-purple-700">
                                    Trending
                                </Badge>
                            )}
                        </div>

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold tracking-tight">
                            {product.name}
                        </h1>

                        {/* SKU */}
                        <p className="mt-2 text-sm text-muted-foreground">
                            SKU: {selectedVariant?.sku ?? product.sku}
                        </p>

                        {/* Rating */}
                        <div className="mt-5 flex items-center gap-4">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground">
                                4.8 (254 Reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <span className="text-4xl font-bold text-primary">
                                ₦{currentPrice.toLocaleString()}
                            </span>
                            {product.discount_percent > 0 && (
                                <>
                                    <span className="text-2xl text-muted-foreground line-through">
                                        ₦{originalPrice.toLocaleString()}
                                    </span>
                                    <Badge variant="destructive">
                                        {product.discount_percent}% OFF
                                    </Badge>
                                </>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="mt-6 leading-8 text-muted-foreground">
                            {product.short_description}
                        </p>

                        <Separator className="my-8" />

                        {/* Department & Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Department
                                </p>
                                <p className="font-semibold">
                                    {product.department?.name ?? 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Category
                                </p>
                                <p className="font-semibold">
                                    {product.category?.name ?? 'N/A'}
                                </p>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        {/* Size Selection */}
                        {product.variants.length > 0 && (
                            <>
                                <h3 className="mb-3 font-semibold">
                                    Select Size
                                </h3>
                                <RadioGroup
                                    value={
                                        selectedVariant?.id?.toString() ?? ''
                                    }
                                    onValueChange={(value) => {
                                        const variant = product.variants.find(
                                            (v) => v.id === Number(value),
                                        );
                                        if (variant) {
                                            setSelectedVariant(variant);
                                        }
                                    }}
                                    className="flex flex-wrap gap-3"
                                >
                                    {product.variants.map((variant) => (
                                        <div key={variant.id}>
                                            <RadioGroupItem
                                                value={variant.id.toString()}
                                                id={`size-${variant.id}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`size-${variant.id}`}
                                                className="flex cursor-pointer items-center justify-center rounded-lg border px-5 py-3 transition peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white"
                                            >
                                                {variant.size}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </>
                        )}

                        {/* Color Selection */}
                        {product.variants.length > 0 && (
                            <>
                                <h3 className="mt-8 mb-3 font-semibold">
                                    Color
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        ...new Map(
                                            product.variants.map((v) => [
                                                v.color,
                                                v,
                                            ]),
                                        ).values(),
                                    ].map((variant) => (
                                        <button
                                            key={variant.color}
                                            type="button"
                                            onClick={() =>
                                                setSelectedVariant(variant)
                                            }
                                            className={`h-10 w-10 rounded-full border-2 transition ${
                                                selectedVariant?.color ===
                                                variant.color
                                                    ? 'ring-2 ring-primary'
                                                    : ''
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    variant.color.toLowerCase(),
                                            }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        <Separator className="my-8" />

                        {/* Stock & Availability */}
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Availability</h3>
                            <span
                                className={
                                    stock > 0
                                        ? 'font-medium text-green-600'
                                        : 'font-medium text-red-600'
                                }
                            >
                                {stock > 0
                                    ? `${stock} In Stock`
                                    : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-5 flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    quantity > 1 && setQuantity(quantity - 1)
                                }
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                                readOnly
                                value={quantity}
                                className="w-20 text-center"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={quantity >= stock}
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col gap-3">
                            <Button
                                size="lg"
                                disabled={stock === 0}
                                onClick={addToCart}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <Button size="lg" variant="secondary">
                                    Buy Now
                                </Button>
                                <Button size="lg" variant="outline">
                                    <Heart className="mr-2 h-5 w-5" />
                                    Wishlist
                                </Button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 space-y-4 rounded-xl border p-6">
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Free Delivery</p>
                                    <p className="text-sm text-muted-foreground">
                                        Free nationwide shipping on eligible
                                        orders.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RotateCcw className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Easy Returns</p>
                                    <p className="text-sm text-muted-foreground">
                                        Return within 30 days.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">
                                        Secure Payment
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Protected checkout with encrypted
                                        payment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================================================== */}
                {/* PRODUCT TABS */}
                {/* ===================================================== */}
                <Tabs defaultValue="description" className="mt-16">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="specifications">
                            Specifications
                        </TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    {/* Description Tab */}
                    <TabsContent value="description">
                        <Card className="mt-6">
                            <CardContent className="space-y-6 p-8">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Product Description
                                    </h2>
                                    <Separator className="my-4" />
                                    <p className="leading-8 text-muted-foreground">
                                        {product.description ||
                                            'No description available.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Specifications Tab */}
                    <TabsContent value="specifications">
                        <Card className="mt-6">
                            <CardContent className="p-8">
                                <h2 className="mb-6 text-2xl font-bold">
                                    Product Specifications
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Product Name
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {product.name}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            SKU
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {selectedVariant?.sku ??
                                                product.sku}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Department
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {product.department?.name ?? 'N/A'}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Category
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {product.category?.name ?? 'N/A'}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Material
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {product.material || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Color
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {selectedVariant?.color ??
                                                product.color ??
                                                'N/A'}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Available Stock
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {stock}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border p-5">
                                        <p className="text-sm text-muted-foreground">
                                            Discount
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {product.discount_percent}%
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Reviews Tab */}
                    <TabsContent value="reviews">
                        <Card className="mt-6">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            Customer Reviews
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Reviews from verified customers
                                        </p>
                                    </div>
                                    <Badge>Coming Soon</Badge>
                                </div>
                                <Separator className="my-6" />
                                <div className="rounded-xl border border-dashed p-12 text-center">
                                    <Star className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                                    <h3 className="text-xl font-semibold">
                                        No Reviews Yet
                                    </h3>
                                    <p className="mt-2 text-muted-foreground">
                                        This product hasn't received any reviews
                                        yet. Be the first customer to leave one
                                        after purchasing this item.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* ========================================= */}
                {/* RELATED PRODUCTS */}
                {/* ========================================= */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold">
                                    Related Products
                                </h2>
                                <p className="text-muted-foreground">
                                    You may also like these products
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/products/${item.slug}`}
                                >
                                    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                        <img
                                            src={
                                                item.image ||
                                                '/images/no-image.png'
                                            }
                                            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                if (
                                                    !e.currentTarget.src.includes(
                                                        '/images/no-image.png',
                                                    )
                                                ) {
                                                    e.currentTarget.src =
                                                        '/images/no-image.png';
                                                }
                                            }}
                                            alt={item.name}
                                        />
                                        <CardContent className="space-y-2 p-5">
                                            <h3 className="line-clamp-2 font-semibold">
                                                {item.name}
                                            </h3>
                                            <p className="text-xl font-bold text-primary">
                                                ₦{item.price.toLocaleString()}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ========================================= */}
                {/* STORE FEATURES & CTA */}
                {/* ========================================= */}
                <section className="mt-20 rounded-3xl border bg-muted/40 p-10">
                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="flex items-start gap-4">
                            <Truck className="mt-1 h-8 w-8 text-primary" />
                            <div>
                                <h3 className="font-semibold">Free Delivery</h3>
                                <p className="text-muted-foreground">
                                    Fast nationwide delivery on eligible orders.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <RotateCcw className="mt-1 h-8 w-8 text-primary" />
                            <div>
                                <h3 className="font-semibold">Easy Returns</h3>
                                <p className="text-muted-foreground">
                                    Return products within 30 days.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <ShieldCheck className="mt-1 h-8 w-8 text-primary" />
                            <div>
                                <h3 className="font-semibold">
                                    Secure Checkout
                                </h3>
                                <p className="text-muted-foreground">
                                    Safe and encrypted payment processing.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="my-20 text-center">
                    <h2 className="text-4xl font-bold">Love this product?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Add it to your cart today and enjoy premium quality,
                        secure checkout, and fast nationwide delivery.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={addToCart}
                            disabled={stock === 0}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline">
                            <Heart className="mr-2 h-5 w-5" />
                            Wishlist
                        </Button>
                    </div>
                </section>
            </div>
        </Frontend>
    );
}
