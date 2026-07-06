<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/orders/index');
    }
     // 'orders' => OrderResource::collection(Order::with(['items', 'trackingEvents'])->get()),
}
