import { Link, router } from '@inertiajs/react';
import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';


import { edit, store } from '@/routes/products';
import { Product } from '../types';

interface ProductActionsProps {
    product: Product;

    showPreview: (product: Product) => void;

    showDelete: (product: Product) => void;
}

export default function ProductActions({
    product,
    showPreview,
    showDelete,
}: ProductActionsProps) {
    const duplicate = () => {
        router.post(store());
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => showPreview(product)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Product
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={edit(product.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={duplicate}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => showDelete(product)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Product
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
