<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function customer()
    {
        return Inertia::render('Admin/Customers', [
    'customers' => User::query()
        ->withCount('orders')
        ->paginate(10)
        ->through(fn ($customer) => [
            'id' => $customer->id,
            'name' => $customer->name,
            'email' => $customer->email,
            'phone' => $customer->phone,
            'orders_count' => $customer->orders_count,
            'total_spent' => $customer->orders()->sum('total'),
            'status' => $customer->status,
            'created_at' => $customer->created_at->format('M d, Y'),
        ]),
]);
    }
}
