export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphone",
    category: "Electronics",
    price: 129,
    oldPrice: 179,
    rating: 4.8,
    badge: "20% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    name: "Apple Watch Series",
    category: "Electronics",
    price: 299,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
  },
  {
    id: 3,
    name: "Running Sneakers",
    category: "Fashion",
    price: 85,
    oldPrice: 110,
    rating: 4.4,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Fashion",
    price: 79,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-c5d0c4b7b83f",
  },
  {
    id: 5,
    name: "Gaming Keyboard",
    category: "Electronics",
    price: 99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
  },
  {
    id: 6,
    name: "Modern Chair",
    category: "Furniture",
    price: 240,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
];