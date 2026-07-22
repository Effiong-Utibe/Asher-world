import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

import {
    Search,
    Eye,
    Pencil,
    Trash2,
    Users,
    UserCheck,
    UserX,
    ShoppingBag,
    Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    orders_count: number;
    total_spent: number;
    status: 'active' | 'inactive' | 'blocked';
    created_at: string;
}

interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface Props {
    customers: Pagination<Customer>;
}

export default function CustomersIndex({ customers }: Props) {
    const [search, setSearch] = useState('');

    const filtered = customers.data.filter(
        (customer) =>
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase()),
    );

    const totalCustomers = customers.data.length;
    const activeCustomers = customers.data.filter(
        (c) => c.status === 'active',
    ).length;

    const blockedCustomers = customers.data.filter(
        (c) => c.status === 'blocked',
    ).length;

    const totalOrders = customers.data.reduce(
        (sum, c) => sum + c.orders_count,
        0,
    );

    const deleteCustomer = (id: number) => {
        if (!confirm('Delete this customer?')) return;

        // router.delete(route('admin.customers.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Customers" />

            <div className="space-y-6 p-4 md:p-8">
                {/* Header */}

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Customers</h1>

                        <p className="text-muted-foreground">
                            Manage all registered customers.
                        </p>
                    </div>

                    <Button asChild>
                        {/* <Link href={route('admin.customers.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Customer
                        </Link> */}
                    </Button>
                </div>

                {/* Stats */}

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Customers
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {totalCustomers}
                                </h2>
                            </div>

                            <Users className="h-10 w-10 text-primary" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Active
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {activeCustomers}
                                </h2>
                            </div>

                            <UserCheck className="h-10 w-10 text-green-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Blocked
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {blockedCustomers}
                                </h2>
                            </div>

                            <UserX className="h-10 w-10 text-red-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Orders
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {totalOrders}
                                </h2>
                            </div>

                            <ShoppingBag className="h-10 w-10 text-blue-600" />
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}

                <Card>
                    <CardContent className="p-6">
                        <div className="relative">
                            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Desktop Table */}

                <Card className="hidden lg:block">
                    <CardContent className="overflow-x-auto p-0">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-4 text-left">Customer</th>

                                    <th className="text-left">Phone</th>

                                    <th className="text-left">Orders</th>

                                    <th className="text-left">Spent</th>

                                    <th className="text-left">Status</th>

                                    <th className="text-left">Joined</th>

                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="border-b hover:bg-muted/40"
                                    >
                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {customer.name}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {customer.email}
                                                </p>
                                            </div>
                                        </td>

                                        <td>{customer.phone ?? '-'}</td>

                                        <td>{customer.orders_count}</td>

                                        <td>
                                            ₦
                                            {customer.total_spent.toLocaleString()}
                                        </td>

                                        <td>
                                            <Badge
                                                variant={
                                                    customer.status === 'active'
                                                        ? 'default'
                                                        : customer.status ===
                                                            'blocked'
                                                          ? 'destructive'
                                                          : 'secondary'
                                                }
                                            >
                                                {customer.status}
                                            </Badge>
                                        </td>

                                        <td>{customer.created_at}</td>

                                        <td>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        // href={route(
                                                        //     'admin.customers.show',
                                                        //     customer.id,
                                                        // )}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        // href={route(
                                                        //     'admin.customers.edit',
                                                        //     customer.id,
                                                        // )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        deleteCustomer(
                                                            customer.id,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Mobile Cards */}

                <div className="grid gap-4 lg:hidden">
                    {filtered.map((customer) => (
                        <Card key={customer.id}>
                            <CardContent className="space-y-4 p-5">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            {customer.name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {customer.email}
                                        </p>
                                    </div>

                                    <Badge
                                        variant={
                                            customer.status === 'active'
                                                ? 'default'
                                                : customer.status === 'blocked'
                                                  ? 'destructive'
                                                  : 'secondary'
                                        }
                                    >
                                        {customer.status}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="font-medium">
                                            Orders
                                        </span>

                                        <p>{customer.orders_count}</p>
                                    </div>

                                    <div>
                                        <span className="font-medium">
                                            Spent
                                        </span>

                                        <p>
                                            ₦
                                            {customer.total_spent.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="font-medium">
                                            Phone
                                        </span>

                                        <p>{customer.phone ?? '-'}</p>
                                    </div>

                                    <div>
                                        <span className="font-medium">
                                            Joined
                                        </span>

                                        <p>{customer.created_at}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        asChild
                                        className="flex-1"
                                    >
                                        <Link
                                            // href={route(
                                            //     'admin.customers.show',
                                            //     customer.id,
                                            // )}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </Link>
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        asChild
                                        className="flex-1"
                                    >
                                        <Link
                                            // href={route(
                                            //     'admin.customers.edit',
                                            //     customer.id,
                                            // )}
                                        >
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
