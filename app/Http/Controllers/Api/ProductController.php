<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('images')->get();
        
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'status' => 'required|in:active,inactive',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'image|mimes:jpg,jpeg,png|max:2048',
            'gallery.*' => 'image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $validated['slug'] = empty($validated['slug']) ? Str::slug($validated['title']) : $validated['slug'];

        $product = Product::create($validated);

        // Handle multiple images
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');

            $product->images()->create([
                'image_url' => $path,
                'is_primary' => true,
            ]);
        }

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
