import { Badge } from '@/components/ui/badge';
import { ProductStatus } from '../types';

interface ProductStatusBadgeProps {
    status: string;
    statuses: ProductStatus[];
}

export default function ProductStatusBadge({
    status,
    statuses,
}: ProductStatusBadgeProps) {
    const item = statuses.find((s) => s.value === status);

    if (!item) {
        return (
            <Badge variant="outline" className="capitalize">
                {status}
            </Badge>
        );
    }

    return (
        <Badge
            className="border-0 text-white capitalize"
            style={{
                backgroundColor: item.color,
            }}
        >
            {item.label}
        </Badge>
    );
}
