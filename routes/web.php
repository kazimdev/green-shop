<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('frontend');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');



// Users Routes
Route::get('/dashboard/users/create', [UserController::class, 'create'])->middleware(['auth'])->name('create_user');

Route::post('/dashboard/users/create', [UserController::class, 'store'])->middleware(['auth'])->name('store_user');

Route::get('/dashboard/users', [UserController::class, 'index'])->middleware(['auth'])->name('users');

Route::get('/dashboard/user/edit/{id}', [UserController::class, 'show'])->middleware(['auth'])->name('edit_user');

Route::get('/dashboard/user/delete/{id}', [UserController::class, 'destroy'])->middleware(['auth'])->name('delete_user');



// Products Routes
Route::get('/dashboard/products', function () {
    return view('admin.products');
})->middleware(['auth'])->name('products');

Route::get('/dashboard/orders', function () {
    return view('admin.orders');
})->middleware(['auth'])->name('orders');


require __DIR__.'/auth.php';