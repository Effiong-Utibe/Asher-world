import { Head } from '@inertiajs/react';
import {
    Package,
    ShoppingCart,
    Users,
    DollarSign,
    TrendingUp,
    AlertTriangle,
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        {
            title: 'Total Revenue',
            value: '$24,560',
            icon: DollarSign,
            change: '+12.5%',
        },
        {
            title: 'Orders',
            value: '1,248',
            icon: ShoppingCart,
            change: '+8.2%',
        },
        {
            title: 'Products',
            value: '326',
            icon: Package,
            change: '+4.1%',
        },
        {
            title: 'Customers',
            value: '5,492',
            icon: Users,
            change: '+15.3%',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's what's happening in your store.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border bg-card p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </span>

                                    <Icon className="h-5 w-5 text-primary" />
                                </div>

                                <div className="mt-4">
                                    <h2 className="text-3xl font-bold">
                                        {stat.value}
                                    </h2>

                                    <p className="mt-1 flex items-center gap-1 text-sm text-green-600">
                                        <TrendingUp className="h-4 w-4" />
                                        {stat.change}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Middle Section */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Revenue Overview */}
                    <div className="col-span-2 rounded-xl border bg-card p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Revenue Overview
                            </h3>
                        </div>

                        <div className="flex h-72 items-center justify-center rounded-lg border border-dashed">
                            <p className="text-muted-foreground">
                                Revenue Chart Goes Here
                            </p>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">
                            Notifications
                        </h3>

                        <div className="space-y-4">
                            <div className="flex gap-3 rounded-lg border p-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <div>
                                    <p className="font-medium">
                                        Low Stock Alert
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        12 products need restocking.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 rounded-lg border p-3">
                                <ShoppingCart className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">New Orders</p>
                                    <p className="text-sm text-muted-foreground">
                                        28 new orders received today.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 rounded-lg border p-3">
                                <Users className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="font-medium">New Customers</p>
                                    <p className="text-sm text-muted-foreground">
                                        56 customers joined this week.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Orders</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 text-left">Order ID</th>
                                    <th className="py-3 text-left">Customer</th>
                                    <th className="py-3 text-left">Status</th>
                                    <th className="py-3 text-left">Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3">#ORD-1001</td>
                                    <td>John Doe</td>
                                    <td>
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                            Completed
                                        </span>
                                    </td>
                                    <td>$245.00</td>
                                </tr>

                                <tr className="border-b">
                                    <td className="py-3">#ORD-1002</td>
                                    <td>Sarah Wilson</td>
                                    <td>
                                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                                            Pending
                                        </span>
                                    </td>
                                    <td>$120.00</td>
                                </tr>

                                <tr>
                                    <td className="py-3">#ORD-1003</td>
                                    <td>Michael Brown</td>
                                    <td>
                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                            Processing
                                        </span>
                                    </td>
                                    <td>$89.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/',
        },
    ],
};
