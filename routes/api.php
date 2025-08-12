<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Use only Sanctum for API authentication checks and getting the logged-in user info
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Public Routes
Route::get('/products', [ProductController::class, 'index']);


// Admin CRUD Routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('products', ProductController::class)->only([
        'store',
        'show',
        'update',
        'destroy'
    ]);
    Route::apiResource('categories', CategoryController::class);
});

// Order Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('orders', OrderController::class)->only([
        'index',
        'store',
        'show',
        'update',
        'destroy'
    ]);
});


//API Auth Routes
//Logout
Route::middleware('auth')->post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Logged out']);
});


// Outsider App Login/Logout
// Token Login
Route::post('/token/login', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    $token = $request->user()->createToken('login-token')->plainTextToken;

    return response()->json([
        'success' => true,
        'token' => $token,
        'user' => $request->user(),
    ]);
});

Route::middleware('auth:sanctum')->post('/token/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Token logged out']);
});
