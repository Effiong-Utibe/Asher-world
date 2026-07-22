import { RotateCcw, Search } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Department, ProductStatus } from '../types';


interface Props {
    search: string;
    department: string;
    category: string;
    status: string;
    stock: string;
    sort: string;

    departments: Department[];
    statuses: ProductStatus[];

    onSearchChange: (value: string) => void;
    onDepartmentChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onStockChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onReset: () => void;
}

export default function ProductFilters({
    search,
    department,
    category,
    status,
    stock,
    sort,

    departments,
    statuses,

    onSearchChange,
    onDepartmentChange,
    onCategoryChange,
    onStatusChange,
    onStockChange,
    onSortChange,
    onReset,
}: Props) {
    const categories = useMemo(() => {
        if (department === 'all') {
            return departments.flatMap(
                (department) => department.categories ?? [],
            );
        }

        return (
            departments.find(
                (departmentItem) => departmentItem.id.toString() === department,
            )?.categories ?? []
        );
    }, [department, departments]);

    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {/* Search */}

                <div className="relative xl:col-span-2">
                    <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search products..."
                        className="pl-10"
                    />
                </div>

                {/* Department */}

                <Select
                    value={department}
                    onValueChange={(value) => {
                        onDepartmentChange(value);
                        onCategoryChange('all');
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>

                        {departments.map((department) => (
                            <SelectItem
                                key={department.id}
                                value={department.id.toString()}
                            >
                                {department.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Category */}

                <Select value={category} onValueChange={onCategoryChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>

                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Status */}

                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>

                        {statuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Stock */}

                <Select value={stock} onValueChange={onStockChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Stock" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Stock</SelectItem>

                        <SelectItem value="instock">In Stock</SelectItem>

                        <SelectItem value="low">Low Stock</SelectItem>

                        <SelectItem value="out">Out of Stock</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort */}

                <Select value={sort} onValueChange={onSortChange}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>

                        <SelectItem value="oldest">Oldest</SelectItem>

                        <SelectItem value="name_asc">Name A–Z</SelectItem>

                        <SelectItem value="name_desc">Name Z–A</SelectItem>

                        <SelectItem value="price_low">Price ↑</SelectItem>

                        <SelectItem value="price_high">Price ↓</SelectItem>

                        <SelectItem value="stock_low">Stock ↑</SelectItem>

                        <SelectItem value="stock_high">Stock ↓</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-5 flex justify-end">
                <Button variant="outline" onClick={onReset}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}

