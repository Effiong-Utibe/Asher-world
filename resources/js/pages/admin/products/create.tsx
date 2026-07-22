import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    UploadCloud,
    Plus,
    Trash2,
    X,
    AlertCircle,
} from 'lucide-react';
import type { ChangeEvent, ReactNode, SubmitEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/products';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageProps } from '@inertiajs/core';

interface Variant {
    size: string;
    color: string;
    stock_quantity: number;
    price_adjustment: number;
}
interface Department {
    id: number;
    name: string;
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
}
interface Status {
    value: string;
    label: string;
    color: string;
}

interface Props extends PageProps{
    departments: Department[];
    statuses: Status[];
    flash: {
        success?: string;
        error?: string;
        message?: string;
    };
}

export default function Create() {
    const { departments, statuses, flash } = usePage<Props>().props;
    const [departmentId, setDepartmentId] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [progress, setProgress] = useState<{ percentage: number } | null>(
        null,
    );

    // Filter categories from the selected department
    const filteredCategories = useMemo(() => {
        if (!departments || !departmentId) return [];

        const selectedDepartment = departments.find(
            (dept: any) => dept.id?.toString() === departmentId,
        );

        return selectedDepartment?.categories ?? [];
    }, [departments, departmentId]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        short_description: '',
        description: '',
        material: '',
        price: '',
        stock_quantity: '',
        discount_percent: '',
        status: 'draft',
        final_price: '',

        // Organization
        department_id: '',
        category_id: '',

        variants: [
            {
                size: '',
                color: '',
                stock_quantity: 0,
                price_adjustment: 0,
            },
        ] as Variant[],

        // Product Flags
        flag_is_active: false,
        flag_is_featured: false,
        flag_is_trending: false,
        flag_is_new_arrival: false,
        flag_is_best_seller: false,
        flag_is_limited_edition: false,

        images: [] as File[],
    });

    const handleNameChange = (value: string) => {
        setData('name', value);
        setData(
            'slug',
            value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, ''),
        );
    };

    // useEffect(() => {
    //     return () => {
    //         images.forEach((image) =>
    //             URL.revokeObjectURL(URL.createObjectURL(image)),
    //         );
    //     };
    // }, [images]);
    const previews = useMemo(() => {
        return images.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
    }, [images]);

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [previews]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const merged = [...images];

        files.forEach((file) => {
            const exists = merged.some(
                (img) => img.name === file.name && img.size === file.size,
            );

            if (!exists) {
                merged.push(file);
            }
        });

        setImages(merged);
        setData('images', merged);
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setData('images', updatedImages);
    };

    const addVariant = () => {
        setData('variants', [
            ...data.variants,
            {
                size: '',
                color: '',
                stock_quantity: 0,
                price_adjustment: 0,
            },
        ]);
    };

    const handleVariantChange = (
        index: number,
        field: keyof Variant,
        value: string | number,
    ) => {
        const parsedValue: string | number =
            field === 'stock_quantity' || field === 'price_adjustment'
                ? Number(value) || 0
                : value;
        setData(
            'variants',
            data.variants.map((variant, i) =>
                i === index
                    ? {
                          ...variant,
                          [field]: parsedValue,
                      }
                    : variant,
            ),
        );
    };

    const removeVariant = (index: number) => {
        setData(
            'variants',
            data.variants.filter((_, i) => i !== index),
        );
    };

    function submit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        post(store.url(), {
            forceFormData: true,
            onProgress: (event) => {
                if (!event) return setProgress(null);
                const e: any = event;
                const percentage = e.total
                    ? Math.round((e.loaded / e.total) * 100)
                    : 0;
                setProgress({ percentage });
            },
            onSuccess: () => {
                setImages([]);
                setProgress(null);
            },
            onError: (errors: any) => {
                setProgress(null);
                console.error('Form errors:', errors);
            },
        });
    }

    const finalPrice = useMemo(() => {
        const price = Number(data.price || 0);
        const discount = Number(data.discount_percent || 0);

        return Math.max(0, price - (price * discount) / 100);
    }, [data.price, data.discount_percent]);

    useEffect(() => {
        setData('final_price', finalPrice.toFixed(2));
    }, [finalPrice]);

    return (
        <>
            <Head title="Create Product" />

            <form onSubmit={submit} className="mx-auto max-w-7xl">
                <div className="space-y-8 p-4 md:p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/products"
                                className="rounded-xl border bg-background p-2 transition hover:bg-muted"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">
                                    New Product
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Fill in the details for the new product.
                                </p>
                            </div>
                        </div>

                        <Button
                            className="w-full gap-2 sm:w-auto"
                            type="submit"
                            disabled={processing}
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Save Product'}
                        </Button>
                    </div>
                    {/* Validation Errors */}
                    {flash.error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{flash.error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>
                                Please fix the following errors
                            </AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc space-y-1 pl-5">
                                    {Object.values(errors).map(
                                        (error, index) => (
                                            <li key={index}>{error}</li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    {progress && (
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress.percentage}%` }}
                            />
                        </div>
                    )}

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* LEFT COLUMN: Main Details */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Product Information */}
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Product Information
                                </h2>
                                <div className="space-y-5">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Product Name
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="Premium Cotton Tee"
                                                value={data.name}
                                                onChange={(e) =>
                                                    handleNameChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            {flash.error && (
                                                <Alert variant="destructive">
                                                    <AlertTitle>
                                                        Error
                                                    </AlertTitle>
                                                    <AlertDescription>
                                                        {flash.error}
                                                    </AlertDescription>
                                                </Alert>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Slug
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="premium-cotton-tee"
                                                value={data.slug}
                                                readOnly
                                                className="bg-muted/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Short Description
                                        </label>
                                        <Textarea
                                            placeholder="A brief overview..."
                                            value={data.short_description}
                                            onChange={(e) =>
                                                setData(
                                                    'short_description',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Description
                                        </label>
                                        <Textarea
                                            placeholder="Full product description..."
                                            className="min-h-[120px]"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pricing & Inventory */}
                            <div className="grid gap-6 md:grid-cols-1">
                                <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
                                    <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
                                        <h2 className="text-lg font-semibold">
                                            Inventory
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    Global Stock
                                                </label>
                                                <Input
                                                    type="number"
                                                    placeholder="100"
                                                    value={data.stock_quantity}
                                                    onChange={(e) =>
                                                        setData(
                                                            'stock_quantity',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-semibold">
                                        Pricing
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Base Price (₦)
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="5000"
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        'price',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Discount (%)
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={data.discount_percent}
                                                onChange={(e) =>
                                                    setData(
                                                        'discount_percent',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="rounded-lg bg-muted p-3">
                                            <div className="rounded-lg bg-muted p-3">
                                                <p className="text-sm font-medium">
                                                    Final Price:
                                                    <span className="text-green-600">
                                                        ₦
                                                        {Number(
                                                            data.final_price,
                                                        ).toLocaleString()}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Variants */}
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Product Variants
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Add sizes, colors, or specific
                                            pricing.
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addVariant}
                                        className="shrink-0 gap-2"
                                    >
                                        <Plus className="h-4 w-4" /> Add Variant
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {data.variants.map((variant, index) => (
                                        <div
                                            key={index}
                                            className="relative grid gap-4 rounded-xl border bg-muted/20 p-5 pt-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
                                        >
                                            {data.variants.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariant(index)
                                                    }
                                                    className="absolute top-3 right-3 text-muted-foreground transition hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}

                                            <div className="space-y-2">
                                                <label className="text-xs font-medium">
                                                    Size
                                                </label>
                                                <Input
                                                    value={variant.size}
                                                    placeholder="S,M,L,XL"
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'size',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium">
                                                    Color
                                                </label>
                                                <Input
                                                    value={variant.color}
                                                    placeholder="blue,red"
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'color',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium">
                                                    Stock
                                                </label>
                                                <Input
                                                    type="number"
                                                    value={
                                                        variant.stock_quantity
                                                    }
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'stock_quantity',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2 sm:col-span-2 md:col-span-4 lg:col-span-1">
                                                <label className="text-xs font-medium">
                                                    Price (+/-)
                                                </label>
                                                <Input
                                                    type="number"
                                                    value={
                                                        variant.price_adjustment
                                                    }
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'price_adjustment',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Product Status & Flag */}
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Status & Visibility
                                </h2>
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Product Status
                                        </label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) =>
                                                setData('status', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem
                                                        key={status.value}
                                                        value={status.value}
                                                    >
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">
                                            Draft products are hidden from the
                                            store.
                                        </p>
                                    </div>

                                    <div className="space-y-3 border-b pb-4">
                                        <label className="text-sm font-medium">
                                            Product Flags
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="flag_is_active"
                                                    checked={
                                                        data.flag_is_active
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'flag_is_active',
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="flag_is_active"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Active
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="flag_is_featured"
                                                    checked={
                                                        data.flag_is_featured
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'flag_is_featured',
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="flag_is_featured"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Featured
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="flag_is_trending"
                                                    checked={
                                                        data.flag_is_trending
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'flag_is_trending',
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="flag_is_trending"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Trending
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="flag_is_new_arrival"
                                                    checked={
                                                        data.flag_is_new_arrival
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'flag_is_new_arrival',
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="flag_is_new_arrival"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    New Arrival
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="flag_is_best_seller"
                                                    checked={
                                                        data.flag_is_best_seller
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'flag_is_best_seller',
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="flag_is_best_seller"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Best Seller
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="flag_is_limited_edition"
                                                    checked={
                                                        data.flag_is_limited_edition
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'flag_is_limited_edition',
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="flag_is_limited_edition"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Limited Edition
                                                </label>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Select flags to highlight this
                                            product.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Organization (Department & Category) */}
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Organization
                                </h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Department
                                        </label>
                                        <Select
                                            value={departmentId}
                                            onValueChange={(val) => {
                                                setData('department_id', val);
                                                setDepartmentId(val);
                                                // Reset category when department changes
                                                setData('category_id', '');
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments?.map(
                                                    (dept: any) => (
                                                        <SelectItem
                                                            key={dept.id}
                                                            value={dept.id.toString()}
                                                        >
                                                            {dept.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Category
                                        </label>
                                        <Select
                                            value={data.category_id}
                                            onValueChange={(val) =>
                                                setData('category_id', val)
                                            }
                                            disabled={!departmentId}
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        departmentId
                                                            ? 'Select a category'
                                                            : 'Select a department first'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredCategories?.map(
                                                    (cat: any) => (
                                                        <SelectItem
                                                            key={cat.id}
                                                            value={cat.id.toString()}
                                                        >
                                                            {cat.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Material
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="e.g. Cotton, Leather"
                                            value={data.material}
                                            onChange={(e) =>
                                                setData(
                                                    'material',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media / Images */}
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Product Images
                                </h2>
                                <div className="space-y-4">
                                    <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition hover:bg-muted/50">
                                        <UploadCloud className="mb-3 h-8 w-8 text-muted-foreground" />
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Click or drag images to upload
                                        </p>
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3">
                                            {images.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                                                >
                                                    <img
                                                        src={previews[idx].url}
                                                        alt="Preview"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeImage(idx)
                                                        }
                                                        className="absolute top-1 right-1 rounded-full bg-background/80 p-1 text-destructive opacity-0 backdrop-blur transition group-hover:opacity-100"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
