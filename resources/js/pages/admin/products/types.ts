import { PageProps } from '@inertiajs/core';

export interface ProductStatus {
    value: string;
    label: string;
    color: string;
}

export interface Department {
    id: number;
    name: string;
    categories?: Category[];
}

export interface Category {
    id: number;
    name: string;
}

export interface ProductImage {
    id: number;
    url: string;
    thumbnail: string;
}

export interface ProductVariant {
    id: number;
    size: string;
    color: string;
    stock_quantity: number;
    price_adjustment: number;
}

export interface ProductFlags {
    is_active: boolean;
    is_featured: boolean;
    is_trending: boolean;
    is_new_arrival: boolean;
    is_best_seller: boolean;
    is_limited_edition: boolean;
}

export interface Product {

    id: number;

    name: string;

    slug: string;

    short_description: string;

    description: string;

    material: string;

    price: number;

    discount_percent: number;

    final_price: number;

    stock_quantity: number;

    status: string;

    department: Department | null;

    category: Category | null;

    variants: ProductVariant[];

    flags: ProductFlags;

    image: string;

    images: ProductImage[];
}
export interface Product {
    id: number;

    name: string;

    slug: string;

    short_description: string;

    description: string;

    material: string;

    color: string;

    price: number;

    discount_percent: number;

    final_price: number;

    stock_quantity: number;

    status: string;

    department: Department | null;

    category: Category | null;

    variants: ProductVariant[];

    flags: ProductFlags;

    image: string;

    images: ProductImage[];
}

export interface ProductPageProps extends PageProps {

    products: Product[];

    departments: Department[];

    statuses: ProductStatus[];

    flash: {
        success?: string;
        error?: string;
        message?: string;
    };
}
