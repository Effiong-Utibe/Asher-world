<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\orderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserproductController;

// Route::inertia('/products', 'users/userproducts')->name('home');
Route::get('/', [UserController::class, 'home'])->name('users.home');
Route::get('products', [UserproductController
::class, 'product_list'])->name('users.Productinglisting');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('admin/dashboard',[DashboardController::class,'index'])->name('admin.dashboard.index');
    Route::get('admin/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('admin/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('admin/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('admin/products/{id}', [ProductController::class, 'show'])->name('admin.products.show');
    Route::get('admin/products/{id}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('admin/products/{id}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('admin/products/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');

    Route::get('admin/orders', [OrderController::class, 'index'])->name('admin.orders.index');
});

require __DIR__.'/settings.php';
