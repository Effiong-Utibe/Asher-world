'use client';

import { Copy, MapPin, Package, Truck } from 'lucide-react';
import { StatusBadge } from '@/components/status-badge';
import {
    TrackingHistory,
    TrackingProgress,
} from '@/components/tracking-timeline';
import {
    STATUS_FLOW,
    STATUS_META,
    formatCurrency,
    formatDate,
    type Order,
    type OrderStatus,
} from '@/lib/orders';

// Renders the selected order details, including delivery progress, shipment info,
// item totals, and tracking history.
export function OrderDetail({
    order,
    onStatusChange,
}: {
    order: Order;
    onStatusChange: (status: OrderStatus) => void;
}) {
    return (
        <div className="space-y-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-foreground">
                            {order.id}
                        </h2>
                        <StatusBadge status={order.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Placed {formatDate(order.placedAt)} &middot;{' '}
                        {order.customer}
                    </p>
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Update status</span>
                    <select
                        value={order.status}
                        onChange={(e) =>
                            onStatusChange(e.target.value as OrderStatus)
                        }
                        className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {[...STATUS_FLOW, 'cancelled' as OrderStatus].map(
                            (s) => (
                                <option key={s} value={s}>
                                    {STATUS_META[s].label}
                                </option>
                            ),
                        )}
                    </select>
                </label>
            </header>

            <section className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-5 text-sm font-medium text-foreground">
                    Delivery progress
                </h3>
                <TrackingProgress order={order} />
            </section>

            <div className="grid gap-4 sm:grid-cols-3">
                <InfoCard icon={Truck} label="Carrier" value={order.carrier} />
                <InfoCard
                    icon={Package}
                    label="Tracking number"
                    value={order.trackingNumber}
                    copyable
                />
                <InfoCard
                    icon={MapPin}
                    label="Est. delivery"
                    value={formatDate2(order.estimatedDelivery)}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-4 text-sm font-medium text-foreground">
                        Items
                    </h3>
                    <ul className="divide-y divide-border">
                        {order.items.map((item) => (
                            <li
                                key={item.sku}
                                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.sku} &middot; Qty {item.quantity}
                                    </p>
                                </div>
                                <span className="text-sm text-foreground tabular-nums">
                                    {formatCurrency(item.price * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-sm font-medium text-foreground">
                            Total
                        </span>
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                            {formatCurrency(order.total)}
                        </span>
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-3">
                        <p className="text-xs font-medium text-muted-foreground">
                            Shipping address
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                            {order.customer}
                            <br />
                            {order.shippingAddress}
                        </p>
                    </div>
                </section>

                <section className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-5 text-sm font-medium text-foreground">
                        Tracking history
                    </h3>
                    <TrackingHistory order={order} />
                </section>
            </div>
        </div>
    );
}

// Reusable card for order metadata fields such as carrier, tracking number,
// and estimated delivery date.
function InfoCard({
    icon: Icon,
    label,
    value,
    copyable,
}: {
    icon: typeof Truck;
    label: string;
    value: string;
    copyable?: boolean;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="size-4" aria-hidden="true" />
                <span className="text-xs font-medium">{label}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                    {value}
                </span>
                {copyable && value !== 'Pending' && value !== 'Cancelled' && (
                    <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(value)}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Copy tracking number"
                    >
                        <Copy className="size-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
}

// Preserve the display format while allowing a placeholder value for cancelled orders.
function formatDate2(value: string) {
    if (value === '—') return value;
    return formatDate(value);
}
