/**
 * Admin order tracking page.
 *
 * Displays the orders dashboard where admins can monitor fulfillment
 * status, shipping progress, and tracking history.
 */
import { OrdersDashboard } from '@/components/orders-dashboard';

export default function Page() {
    return (

        <main className="min-h-screen bg-background">
            <header className="border-b border-border">
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Admin
                    </p>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Order Tracking
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Monitor fulfillment status, shipping progress, and
                        tracking history.
                    </p>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <OrdersDashboard />
            </div>
        </main>
    );
}
