import {
    Archive,
    BadgeCheck,
    Box,
    Flame,
    Package,
    Star,
    TrendingUp,
    TriangleAlert,
    XCircle,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface ProductAnalytics {
    total: number;
    published: number;
    draft: number;
    archived: number;
    featured: number;
    trending: number;
    bestSeller: number;
    newArrival: number;
    lowStock: number;
    outOfStock: number;
}

interface Props {
    analytics: ProductAnalytics;
}

const cards = [
    {
        key: 'total',
        label: 'Total Products',
        icon: Package,
        color: 'text-blue-600',
    },
    {
        key: 'published',
        label: 'Published',
        icon: BadgeCheck,
        color: 'text-green-600',
    },
    {
        key: 'draft',
        label: 'Draft',
        icon: Box,
        color: 'text-yellow-600',
    },
    {
        key: 'archived',
        label: 'Archived',
        icon: Archive,
        color: 'text-gray-600',
    },
    {
        key: 'featured',
        label: 'Featured',
        icon: Star,
        color: 'text-amber-500',
    },
    {
        key: 'trending',
        label: 'Trending',
        icon: TrendingUp,
        color: 'text-orange-500',
    },
    {
        key: 'bestSeller',
        label: 'Best Seller',
        icon: Flame,
        color: 'text-red-500',
    },
    {
        key: 'newArrival',
        label: 'New Arrival',
        icon: Package,
        color: 'text-cyan-600',
    },
    {
        key: 'lowStock',
        label: 'Low Stock',
        icon: TriangleAlert,
        color: 'text-orange-600',
    },
    {
        key: 'outOfStock',
        label: 'Out of Stock',
        icon: XCircle,
        color: 'text-red-600',
    },
] as const;

export default function ProductStats({ analytics }: Props) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <Card
                        key={card.key}
                        className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <CardContent className="flex items-center justify-between p-5">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {card.label}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {analytics[card.key]}
                                </h2>
                            </div>

                            <div
                                className={`rounded-xl bg-muted p-3 ${card.color}`}
                            >
                                <Icon className="h-7 w-7" />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
