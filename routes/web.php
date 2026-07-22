<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\orderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserproductController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/products', 'users/userproducts')->name('home');
Route::get('/', [UserController::class, 'home'])->name('users.home');
Route::get('products', [UserproductController::class, 'product_list'])->name('users.Productlisting');
Route::get('/products/{product} ', [UserproductController::class, 'product_detail'])->name('users.productdetail');
Route::get('/categories', [UserController::class, 'cat'])->name('users.products.categories');
Route::get('/departments/{department:slug}', [UserController::class, 'product_detail'])
    ->name('departments.show');

Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::patch('/cart/{cartItem}', [CartController::class, 'update']);
Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);

//admin route
Route::prefix('admin')->middleware(['auth', 'role:Admin'])->group(function () {
  Route::resource('products', ProductController::class);
    Route::get('customers', [AdminController::class, 'customer'])->name('admin.customers');
    Route::get('orders', [orderController::class, 'index'])->name('admin.orders.index');
});
Route::middleware(['auth', 'verified'])->group(function () {

});

require __DIR__.'/settings.php';
