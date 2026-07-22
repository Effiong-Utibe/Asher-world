<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display cart
     */
    public function index()
    {
        $cart = Cart::firstOrCreate([
            'user_id' => Auth::id(),
        ]);

        $cart->load([
            'items.product.media',
            'items.variant',
        ]);

        $subtotal = $cart->items->sum(function ($item) {

            $price = $item->product->final_price;

            if ($item->variant) {
                $price += $item->variant->price_adjustment;
            }

            return $price * $item->quantity;
        });

        return Inertia::render('users/cart/index', [

            'cart' => [

                'id' => $cart->id,

                'subtotal' => $subtotal,

                'items' => $cart->items->map(function ($item) {

                    return [

                        'id' => $item->id,

                        'quantity' => $item->quantity,

                        'product' => [

                            'id' => $item->product->id,

                            'name' => $item->product->name,

                            'image' => $item->product->getFirstMediaUrl('product_images'),

                                'price' => $item->product->final_price +
    ($item->variant?->price_adjustment ?? 0),

                            'color' => $item->variant?->color,

                            'size' => $item->variant?->size,
                                'quantity' => $item->quantity,
                        ],
                    ];
                }),
            ],
        ]);
    }

    /**
     * Add product to cart
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'product_id' => ['required', 'exists:products,id'],

            'variant_id' => ['nullable', 'exists:product_variants,id'],

            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $variant = null;

        if ($validated['variant_id']) {

            $variant = ProductVariant::findOrFail($validated['variant_id']);

            if ($variant->stock_quantity < $validated['quantity']) {

                return back()->withErrors([
                    'quantity' => 'Not enough stock.',
                ]);
            }
        } else {

            if ($product->stock_quantity < $validated['quantity']) {

                return back()->withErrors([
                    'quantity' => 'Not enough stock.',
                ]);
            }
        }

        $cart = Cart::firstOrCreate([
            'user_id' => Auth::id(),
        ]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->where('variant_id', $validated['variant_id'])
            ->first();

        if ($item) {

            $item->increment('quantity', $validated['quantity']);

        } else {

            CartItem::create([

                  'cart_id' => $cart->id,
    'product_id' => $product->id,
    'variant_id' => $variant->id,
    'quantity' => 1,
    'price' => $variant?->price ?? $product->final_price ?? $product->price,
            ]);
        }

        return back()->with('success', 'Product added to cart.');
    }

    /**
     * Update cart quantity
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([

            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if ($cartItem->variant) {

            if ($validated['quantity'] > $cartItem->variant->stock_quantity) {

                return back()->withErrors([
                    'quantity' => 'Quantity exceeds available stock.',
                ]);
            }

        } else {

            if ($validated['quantity'] > $cartItem->product->stock_quantity) {

                return back()->withErrors([
                    'quantity' => 'Quantity exceeds available stock.',
                ]);
            }
        }

        $cartItem->update([

            'quantity' => $validated['quantity'],
        ]);

        return back();
    }

    /**
     * Remove item
     */
    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();

        return back()->with('success', 'Item removed.');
    }

    /**
     * Checkout page
     */
    public function checkout()
    {
        $cart = Cart::where('user_id', Auth::id())
            ->with([
                'items.product.media',
                'items.variant',
            ])
            ->first();

        if (!$cart || $cart->items->isEmpty()) {

            return redirect()->route('cart.index');
        }

        $subtotal = $cart->items->sum(function ($item) {

            return (
                $item->product->final_price +
                ($item->variant?->price_adjustment ?? 0)
            ) * $item->quantity;
        });

        $shipping = $subtotal >= 500 ? 0 : 20;

        $tax = $subtotal * 0.075;

        $total = $subtotal + $shipping + $tax;

        return Inertia::render('users/checkout/index', [

            'cart' => $cart,

            'summary' => [

                'subtotal' => $subtotal,

                'shipping' => $shipping,

                'tax' => $tax,

                'total' => $total,
            ],
        ]);
    }
}
