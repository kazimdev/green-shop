<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('admin/users/list', ['users' => $users]);
    }

    public function show($id)
    {
        $user = User::find($id);
        return view('admin/users/profile', ['user' => $user]);
    }

    public function create()
    {
        return view('admin/users/create');
    }

    public function store(Request $request)
    {
        // Validate the form data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        // Create a new user and save it in the database
        User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Redirect the user to a success page or back to the form
        return redirect()->route('users')->with('success-message', 'User created successfully!');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function destroy($id)
    {
        $deleted = User::destroy($id);

        if ($deleted) {
            return redirect()->route('users')->with('success-message', 'User deleted successfully!');
        }
    }
}
