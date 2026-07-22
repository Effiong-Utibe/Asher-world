export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    color: string | null;
    size: string | null;
    quantity: number; // stock quantity
}

export interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

export interface CartData {
    id: number;
    subtotal: number;
    items: CartItem[];
}