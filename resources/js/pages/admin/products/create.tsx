import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, UploadCloud, Plus } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/admin/products';

interface Variant {
    size: string;
    color: string;
    sku: string;
    stock_quantity: number;
    price_adjustment: number;
}

export default function Create() {
    const { departments } = usePage().props as any;
    const [departmentId, setDepartmentId] = useState('');

    const selectedDepartment = departments.find(
        (department: any) => department.id.toString() === departmentId,
    );

    const [images, setImages] = useState<File[]>([]);
    const [progress, setProgress] = useState<{ percentage: number } | null>(
        null,
    );

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        slug: '',
        sku: '',
        department_id: '',
        size: '',
        price_adjustment: '',
        short_description: '',
        description: '',
        material: '',
        color: '',
        price: '',
        stock_quantity: '',
        discount_percent: '',
        is_featured: false,
        is_new_arrival: false,
        is_best_seller: false,
        is_limited_edition: false,
        is_trending: false,
        is_active: true,

        variants: [
            {
                size: '',
                color: '',
                sku: '',
                stock_quantity: 0,
                price_adjustment: 0,
            },
        ] as Variant[],

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

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const newImages = [...images, ...files];

        setImages(newImages);
        setData('images', newImages);
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setData('images', updatedImages);
    };
    //variant handlers
    const addVariant = () => {
        setData('variants', [
            ...data.variants,
            {
                size: '',
                color: '',
                sku: '',
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
        const updated = [...data.variants];

        const parsedValue: string | number =
            field === 'stock_quantity'
                ? Number(value) || 0
                : field === 'price_adjustment'
                  ? Number(value) || 0
                  : value;

        updated[index] = {
            ...updated[index],
            [field]: parsedValue,
        };

        setData('variants', updated);
    };

    const removeVariant = (index: number) => {
        setData(
            'variants',
            data.variants.filter((_, i) => i !== index),
        );
    };

    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        post(store.url(), {
            forceFormData: true,

            onProgress: (event) => {
                if (!event) {
                    setProgress(null);
                    return;
                }

                // event may not have precise typing here, so coerce to any
                const e: any = event;
                const loaded = e.loaded ?? 0;
                const total = e.total ?? 0;
                const percentage = total
                    ? Math.round((loaded / total) * 100)
                    : 0;

                setProgress({ percentage });
            },

            onSuccess: () => {
                setImages([]);
                setProgress(null);

                setData({
                    category_id: '',
                    name: '',
                    slug: '',
                    sku: '',
                    short_description: '',
                    description: '',
                    material: '',
                    color: '',
                    price: '',
                    stock_quantity: '',
                    discount_percent: '',
                    is_featured: false,
                    is_new_arrival: false,
                    is_best_seller: false,
                    is_limited_edition: false,
                    is_trending: false,
                    is_active: true,

                    variants: [
                        {
                            size: '',
                            color: '',
                            sku: '',
                            stock_quantity: 0,
                            price_adjustment: 0,
                        },
                    ],

                    images: [],
                });
            },

            onError: (errors: any) => {
                setProgress(null);
                console.error('Form errors:', errors);
            },
        });
    }
    // const finalPrice = data.price - (data.price * data.discount_percent) / 100;
    const finalPrice = useMemo(() => {
        const price = Number(data.price || 0);
        const discount = Number(data.discount_percent || 0);
        return price - (price * discount) / 100;
    }, [data.price, data.discount_percent]);

    return (
        <>
            <Head title="Products" />

            <form onSubmit={submit}>
                <div className="space-y-8 p-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/products"
                                className="rounded-xl p-2 text-white transition hover:bg-primary"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>

                            <div>
                                <h1 className="text-2xl font-bold">
                                    New Product
                                </h1>

                                <p className="text-sm text-muted-foreground">
                                    Fill in the details for the new product.
                                </p>
                            </div>
                        </div>

                        <Button
                            className="gap-2"
                            type="submit"
                            disabled={processing}
                        >
                            <Save className="h-4 w-4" />
                            Save Product
                        </Button>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* LEFT SIDE */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Product Information */}
                            <div className="rounded-2xl border bg-background p-6 shadow-sm">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Product Information
                                </h2>

                                <div className="space-y-5">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Product Name
                                        </label>

                                        <Input
                                            type="text"
                                            placeholder="Nike Sneakers"
                                            value={data.name}
                                            onChange={(e) =>
                                                handleNameChange(e.target.value)
                                            }
                                        />

                                        {errors.name && (
                                            <p className="text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Slug */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Slug
                                        </label>

                                        <Input
                                            type="text"
                                            placeholder="nike-sneakers"
                                            value={data.slug}
                                            readOnly
                                            onChange={(e) =>
                                                setData('slug', e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Short Description */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Short Description
                                        </label>

                                        <Textarea
                                            placeholder="Short description..."
                                            value={data.short_description}
                                            onChange={(e) =>
                                                setData(
                                                    'short_description',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.short_description && (
                                            <p className="text-sm text-red-500">
                                                {errors.short_description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
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
                                        {errors.description && (
                                            <p className="text-sm text-red-500">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="rounded-2xl border bg-background p-6 shadow-sm">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Pricing
                                </h2>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Price
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="5000"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData('price', e.target.value)
                                            }
                                        />
                                        {errors.price && (
                                            <p className="text-danger text-red-500">
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Discount Price
                                        </label>

                                        <Input
                                            type="number"
                                            placeholder="Discount %"
                                            value={data.discount_percent}
                                            onChange={(e) =>
                                                setData(
                                                    'discount_percent',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.discount_percent && (
                                            <p className="text-sm text-red-500">
                                                {errors.discount_percent}
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-sm text-green-600">
                                        Final Price: ₦
                                        {finalPrice.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Inventory */}
                            <div className="rounded-2xl border bg-background p-6 shadow-sm">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Inventory
                                </h2>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Stock Quantity
                                        </label>

                                        <Input
                                            type="number"
                                            placeholder="10"
                                            value={data.stock_quantity}
                                            onChange={(e) =>
                                                setData(
                                                    'stock_quantity',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.stock_quantity && (
                                            <p className="text-sm text-red-500">
                                                {errors.stock_quantity}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            SKU
                                        </label>

                                        <Input
                                            type="text"
                                            placeholder="SKU-001"
                                            value={data.sku}
                                            onChange={(e) =>
                                                setData('sku', e.target.value)
                                            }
                                        />
                                        {errors.sku && (
                                            <p className="text-sm text-red-500">
                                                {errors.sku}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Product Variants */}
                            <div className="rounded-2xl border bg-background p-6 shadow-sm">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">
                                        Product Variants
                                    </h2>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addVariant}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Variant
                                    </Button>
                                </div>

                                <div className="space-y-5">
                                    {data.variants.map((variant, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-4 rounded-xl border p-4 md:grid-cols-2"
                                        >
                                            {/* SIZE */}
                                            <div>
                                                <label htmlFor="Size">
                                                    Size
                                                </label>
                                                <Input
                                                    placeholder="Size (S, M, L, XL)"
                                                    value={variant.size}
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'size',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.size && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.size}
                                                    </p>
                                                )}
                                            </div>

                                            {/* COLOR */}
                                            <div>
                                                <label htmlFor="color">
                                                    Color
                                                </label>
                                                <Input
                                                    placeholder="Color (Black, Red)"
                                                    value={variant.color}
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'color',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.color && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.color}
                                                    </p>
                                                )}
                                            </div>

                                            {/* STOCK */}
                                            <div>
                                                <label htmlFor="stock">
                                                    Stock
                                                </label>
                                                <Input
                                                    type="number"
                                                    placeholder="Stock Quantity"
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
                                                {errors.stock_quantity && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.stock_quantity}
                                                    </p>
                                                )}
                                            </div>

                                            {/* PRICE ADJUSTMENT */}
                                            <div>
                                                <label htmlFor="price_add">
                                                    Price Adjustment
                                                </label>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Price Adjustment (+/-)"
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
                                                {errors.price_adjustment && (
                                                    <p className="text-sm text-red-500">
                                                        {
                                                            errors.price_adjustment
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* SKU */}
                                            <div>
                                                <label htmlFor="sku">Sku</label>
                                                <Input
                                                    placeholder="SKU"
                                                    value={variant.sku}
                                                    onChange={(e) =>
                                                        handleVariantChange(
                                                            index,
                                                            'sku',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.sku && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.sku}
                                                    </p>
                                                )}
                                            </div>

                                            {/* REMOVE BUTTON */}
                                            <div className="flex items-center justify-end md:col-span-2">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        removeVariant(index)
                                                    }
                                                >
                                                    Remove Variant
                                                </Button>
                                            </div>

                                            {/* SKU SUGGESTION */}
                                            <div className="text-xs text-muted-foreground md:col-span-2">
                                                Suggested SKU:{' '}
                                                <span className="font-mono">
                                                    {(
                                                        variant.color?.slice(
                                                            0,
                                                            3,
                                                        ) +
                                                        '-' +
                                                        variant.size?.slice(
                                                            0,
                                                            2,
                                                        )
                                                    )
                                                        .toUpperCase()
                                                        .replace(
                                                            'UNDEFINED',
                                                            '',
                                                        )}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="space-y-6">
                            {/* Images upload*/}
                            <div className="rounded-2xl border bg-background p-6 shadow-sm">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Product Images
                                </h2>

                                <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-6 transition hover:bg-muted/40">
                                    <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />

                                    <p className="text-sm font-medium">
                                        Click to upload images
                                    </p>

                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>

                                {progress && (
                                    <div className="mt-4">
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                            className="w-full"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    </div>
                                )}
                                {errors.images && (
                                    <p className="text-sm text-red-500">
                                        {errors.images}
                                    </p>
                                )}

                                {images.length > 0 && (
                                    <div className="mt-5">
                                        <p className="mb-3 text-sm font-medium">
                                            {images.length} image
                                            {images.length !== 1
                                                ? 's'
                                                : ''}{' '}
                                            selected
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative overflow-hidden rounded-xl border"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            image,
                                                        )}
                                                        alt={`Preview ${index}`}
                                                        className="h-15 w-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeImage(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                    <p className="truncate bg-muted px-2 py-1 text-xs">
                                                        {image.name}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Organization */}
                            <div className="rounded-2xl border bg-background p-6 shadow-sm">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Product Organization
                                </h2>

                                <div className="space-y-5">
                                    {/* department */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Department
                                        </label>

                                        <select
                                            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
                                            value={departmentId}
                                            onChange={(e) => {
                                                setDepartmentId(e.target.value);
                                                setData(
                                                    'department_id',
                                                    e.target.value,
                                                );
                                            }}
                                        >
                                            <option value="">
                                                Select Department
                                            </option>

                                            {departments?.map(
                                                (department: any) => (
                                                    <option
                                                        key={department.id}
                                                        value={department.id}
                                                    >
                                                        {department.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        {errors.department_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.department_id}
                                            </p>
                                        )}
                                    </div>
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Category
                                        </label>
                                        <select
                                            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    'category_id',
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {selectedDepartment?.categories.map(
                                                (category: any) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        {errors.category_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.category_id}
                                            </p>
                                        )}
                                    </div>

                                    {/* Gender */}

                                    {/* Material */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Material
                                        </label>

                                        <Input
                                            type="text"
                                            placeholder="Leather"
                                            value={data.material}
                                            onChange={(e) =>
                                                setData(
                                                    'material',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.material && (
                                            <p className="text-sm text-red-500">
                                                {errors.material}
                                            </p>
                                        )}
                                    </div>

                                    {/* Color */}
                                    {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Color
                                        </label>

                                        <Input
                                            type="text"
                                            placeholder="Black"
                                            value={data.color}
                                            onChange={(e) =>
                                                setData('color', e.target.value)
                                            }
                                        />
                                        {errors.color && (
                                            <p className="text-sm text-red-500">
                                                {errors.color}
                                            </p>
                                        )}
                                    </div> */}

                                    {/* Status */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium">
                                            Product Flags
                                        </label>

                                        <div className="flex flex-col gap-3">
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={data.is_active}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'is_active',
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                Active Product
                                            </label>
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={data.is_featured}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'is_featured',
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                Featured Product
                                            </label>
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={data.is_trending}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'is_trending',
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                Trending product
                                            </label>

                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={
                                                        data.is_new_arrival
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'is_new_arrival',
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                New Arrival
                                            </label>

                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={
                                                        data.is_best_seller
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'is_best_seller',
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                Best Seller
                                            </label>

                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={
                                                        data.is_limited_edition
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData(
                                                            'is_limited_edition',
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                Limited Edition
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
