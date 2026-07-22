import { product_list } from '@/actions/App/Http/Controllers/UserproductController';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import React from 'react'

export default function emptycart() {
  interface EmptyCartProps {
      onContinueShopping: () => void;
  }
  return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <ShoppingBag className="mb-6 h-16 w-16 text-muted-foreground" />

          <h2 className="text-3xl font-bold">Your cart is empty</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
              Browse our latest collection and discover products you'll love.
          </p>

          <Button className="mt-8" onClick={() => router.visit(product_list())}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
          </Button>
      </div>
  );
}
