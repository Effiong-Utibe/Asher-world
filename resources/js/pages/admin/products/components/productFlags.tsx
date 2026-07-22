import { Badge } from '@/components/ui/badge';
import { ProductFlags as ProductFlagsType } from '../types';

interface ProductFlagsProps {
    flags: ProductFlagsType;
}

export default function ProductFlags({ flags }: ProductFlagsProps) {
    const badges = [
        {
            show: flags.is_active,
            label: 'Active',
            className:
                'bg-emerald-100 text-emerald-700 border border-emerald-200',
        },
        {
            show: flags.is_featured,
            label: 'Featured',
            className: 'bg-amber-100 text-amber-700 border border-amber-200',
        },
        {
            show: flags.is_trending,
            label: 'Trending',
            className: 'bg-orange-100 text-orange-700 border border-orange-200',
        },
        {
            show: flags.is_new_arrival,
            label: 'New Arrival',
            className: 'bg-sky-100 text-sky-700 border border-sky-200',
        },
        {
            show: flags.is_best_seller,
            label: 'Best Seller',
            className: 'bg-violet-100 text-violet-700 border border-violet-200',
        },
        {
            show: flags.is_limited_edition,
            label: 'Limited Edition',
            className: 'bg-rose-100 text-rose-700 border border-rose-200',
        },
    ];

    const visibleBadges = badges.filter((badge) => badge.show);

    if (visibleBadges.length === 0) {
        return <span className="text-sm text-muted-foreground">—</span>;
    }

    return (
        <div className="flex flex-wrap gap-1">
            {visibleBadges.map((badge) => (
                <Badge
                    key={badge.label}
                    variant="outline"
                    className={badge.className}
                >
                    {badge.label}
                </Badge>
            ))}
        </div>
    );
}
