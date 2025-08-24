<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::whereHas('customer')
            ->with('customer') // Eager load customer data
            ->get();

        return response()->json([
            'success' => true,
            'data' => $customers
        ]);
    }
}
