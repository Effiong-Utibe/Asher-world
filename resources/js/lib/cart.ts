export const FREE_SHIPPING_THRESHOLD = 500;

export const calculateShipping = (subtotal: number) => {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 20;
};

export const calculateTax = (subtotal: number) => {
    return subtotal * 0.075;
};

export const calculateTotal = (
    subtotal: number,
    shipping: number,
    tax: number,
) => {
    return subtotal + shipping + tax;
};