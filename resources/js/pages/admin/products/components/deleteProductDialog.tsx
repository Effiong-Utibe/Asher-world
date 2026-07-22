import { router } from '@inertiajs/react';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Product } from '../types';
import { destroy } from '@/routes/products';

interface DeleteProductDialogProps {
    open: boolean;
    product: Product | null;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteProductDialog({
    open,
    product,
    onOpenChange,
}: DeleteProductDialogProps) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        if (!product) return;

        setProcessing(true);

        router.delete(destroy(product.id), {
            preserveScroll: true,

            onSuccess: () => {
                onOpenChange(false);
            },

            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-red-600" />
                        Delete Product
                    </AlertDialogTitle>

                    <AlertDialogDescription className="space-y-2">
                        <p>
                            Are you sure you want to permanently delete this
                            product?
                        </p>

                        {product && (
                            <span className="block rounded-md border bg-muted p-3 font-medium text-foreground">
                                {product.name}
                            </span>
                        )}

                        <p className="text-red-600">
                            This action cannot be undone.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={processing}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Product
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
