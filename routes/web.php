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
})->middleware(['auth:sanctum'])->name('dashboard');

// Catch-all route for React
Route::get('/dashboard/{any}', function () {
    return view('dashboard');
})->where('any', '.*');


require __DIR__ . '/auth.php';
