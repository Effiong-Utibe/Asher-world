import { Head, Link } from '@inertiajs/react';
import Frontend from '@/layouts/front-end-layout';
import Category from '@/components/frontend-component/categoriesProduct/categories';
import ProductStore from '@/components/frontend-component/StoreProduct/productStore';
import { Button } from '@/components/ui/button';

export default function Home() {
    const heroImages = [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg',
    ];

    return (
        <Frontend>
            <Head title="Home" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
                    {/* Left Content */}
                    <div className="max-w-xl">
                        <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-primary">
                            New Season Collection
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Discover fashion, gadgets, and essentials for your
                            lifestyle
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Shop premium products curated for quality, comfort,
                            and style. Explore trending collections, exclusive
                            deals, and categories designed to match your
                            everyday needs.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button
                            variant="default"
                            className="inline-flex items-center justify-center rounded-lg px-6 py-5 text-sm font-semibold text-white shadow-sm transition">
                                <Link href="/shop">Shop Now</Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="inline-flex items-center justify-center rounded-lg px-6 py-5 text-sm font-semibold text-gray-700 shadow-sm transition "
                            >
                                <Link href="/categories">Browse Categories</Link>
                            </Button>

                        </div>

                        {/* Quick Stats / Trust badges */}
                        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-2xl font-bold text-gray-900">
                                    10k+
                                </p>
                                <p className="text-sm text-gray-500">
                                    Happy Customers
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-2xl font-bold text-gray-900">
                                    500+
                                </p>
                                <p className="text-sm text-gray-500">
                                    Products
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-2xl font-bold text-gray-900">
                                    24/7
                                </p>
                                <p className="text-sm text-gray-500">
                                    Customer Support
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Image Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {heroImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`overflow-hidden rounded-2xl shadow-md ${
                                        index === 2 || index === 5
                                            ? 'sm:translate-y-8'
                                            : ''
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Store product ${index + 1}`}
                                        className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Featured Products
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Explore our latest arrivals and best-selling
                                products.
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            View all products →
                        </Link>
                    </div>

                    <ProductStore />
                </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Shop by Category
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Find products faster by browsing through our top
                                categories.
                            </p>
                        </div>

                        <Link
                            href="/categories"
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            View all categories →
                        </Link>
                    </div>

                    <Category />
                </div>
            </section>

            {/* PROMO SECTION */}
            <section className="bg-indigo-600 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Get the best deals before they’re gone
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
                        Save more on selected collections with limited-time
                        discounts, fast delivery, and secure checkout.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-gray-100"
                        >
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </Frontend>
    );
}
