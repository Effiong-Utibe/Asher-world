'use client';

// Client-side dashboard for listing orders and selecting orders for review.
import { useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { OrderDetail } from '@/components/order-detail';
import { StatusBadge } from '@/components/status-badge';
import {
    ORDERS,
    STATUS_META,
    formatCurrency,
    formatDate,
    type Order,
    type OrderStatus,
} from '@/lib/orders';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Filter = OrderStatus | 'all';

const FILTERS: Filter[] = [
    'all',
    'pending',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
];

// const FILTERS: Filter[] = [
//     'all',
//     'pending',
//     'processing',
//     'shipped',
//     'out_for_delivery',
//     'delivered',
//     'cancelled',
// ];

export function OrdersDashboard() {
    const [orders, setOrders] = useState<Order[]>(ORDERS);
    const [selectedId, setSelectedId] = useState<string>(ORDERS[0].id);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>('all');

    // Filter the orders list using the active status filter and search query.
    const filtered = useMemo(() => {
        return orders.filter((o) => {
            const matchesFilter = filter === 'all' || o.status === filter;
            const q = query.trim().toLowerCase();
            const matchesQuery =
                !q ||
                o.id.toLowerCase().includes(q) ||
                o.customer.toLowerCase().includes(q) ||
                o.trackingNumber.toLowerCase().includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [orders, filter, query]);

    const selected = orders.find((o) => o.id === selectedId) ?? filtered[0];

    // Apply a new status to the selected order and record an admin history event.
    function handleStatusChange(status: OrderStatus) {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === selectedId
                    ? {
                          ...o,
                          status,
                          history: [
                              ...o.history,
                              {
                                  status,
                                  label: STATUS_META[status].label,
                                  description: 'Status updated by admin.',
                                  location: 'Admin console',
                                  timestamp: new Date().toISOString(),
                              },
                          ],
                      }
                    : o,
            ),
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(320px,380px)_1fr]">
            <aside className="flex flex-col gap-4">
                <div className="relative">
                    <Search
                        className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                    />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search order, customer, tracking #"
                        className="w-full rounded-lg border border-input bg-background py-2 pr-3 pl-9 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {FILTERS.map((f) => (
                        <Button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                                filter === f
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/70',
                            )}
                        >
                            {f === 'all' ? 'All' : STATUS_META[f].label}
                        </Button>
                    ))}
                </div>

                <ul className="flex flex-col gap-2">
                    {filtered.length === 0 && (
                        <li className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                            No orders match your search.
                        </li>
                    )}
                    {filtered.map((order) => (
                        <li key={order.id}>
                            <button
                                type="button"
                                onClick={() => setSelectedId(order.id)}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors',
                                    selected?.id === order.id
                                        ? 'border-primary bg-accent'
                                        : 'border-border bg-card hover:bg-accent/50',
                                )}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="truncate text-sm font-medium text-foreground">
                                            {order.id}
                                        </span>
                                        <span className="shrink-0 text-sm text-foreground tabular-nums">
                                            {formatCurrency(order.total)}
                                        </span>
                                    </div>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {order.customer}
                                    </p>
                                    <div className="mt-1.5 flex items-center justify-between gap-2">
                                        <StatusBadge status={order.status} />
                                        <span className="shrink-0 text-[11px] text-muted-foreground">
                                            {formatDate(order.placedAt)}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight
                                    className="size-4 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="min-w-0">
                {selected ? (
                    <OrderDetail
                        order={selected}
                        onStatusChange={handleStatusChange}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border p-12 text-sm text-muted-foreground">
                        Select an order to view tracking details.
                    </div>
                )}
            </div>
        </div>
    );
}
