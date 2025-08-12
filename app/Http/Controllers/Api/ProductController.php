<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['images', 'categories'])->get();

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
            'status' => 'nullable|in:active,inactive',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png|max:2048',
            'gallery' => 'nullable|array',
            'gallery.*' => 'file|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $validated['slug'] = empty($validated['slug']) ? Str::slug($validated['title']) : $validated['slug'];

        // Remove categories from $validated for mass assignment
        $categoryIds = $validated['categories'] ?? [];
        unset($validated['categories']);

        $product = Product::create($validated);

        // Attach categories (many-to-many)
        if (!empty($categoryIds)) {
            $product->categories()->sync($categoryIds);
        }

        // Save primary image (optional)
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->images()->create([
                'image_url' => $path,
                'is_primary' => true,
            ]);
        }

        // Save gallery images (optional)
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $index => $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image_url' => $path,
                    'is_primary' => false, // keep primary as `image` only
                ]);
            }
        }

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with(['images', 'categories'])->findOrFail($id);

        // Log::info(json_encode($product, JSON_PRETTY_PRINT));

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'nullable|string|max:255|unique:products,slug,' . $id,
            'price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'status' => 'nullable|in:active,inactive',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048',
            'current_image' => 'nullable|string', // For existing image handling when update
            'gallery' => 'nullable|array',
            'gallery.*' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validated['slug'] = empty($validated['slug']) ? Str::slug($validated['title']) : $validated['slug'];

        // Remove categories from $validated for mass assignment
        $categoryIds = $validated['categories'] ?? [];
        unset($validated['categories']);

        $product->update($validated);

        // Sync categories (many-to-many in the pivot table)
        $product->categories()->sync($categoryIds);

        // Handle primary image update
        if ($request->hasFile('image')) {
            // Remove old primary image if exists
            $oldPrimary = $product->images()->where('is_primary', true)->first();
            if ($oldPrimary) {
                $oldPrimary->delete();
            }
            $path = $request->file('image')->store('products', 'public');
            $product->images()->create([
                'image_url' => $path,
                'is_primary' => true,
            ]);
        } elseif ($request->filled('current_image')) {
            // If no new image uploaded, ensure the current image remains primary
            $currentImage = $product->images()->where('image_url', $request->input('current_image'))->first();
            if ($currentImage) {
                // Set all images to not primary first
                $product->images()->update(['is_primary' => false]);
                $currentImage->is_primary = true;
                $currentImage->save();
            }
        }

        // Handle gallery images update (optional: clear and re-add, or just add new)
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image_url' => $path,
                    'is_primary' => false,
                ]);
            }
        }

        return response()->json($product->load(['images', 'categories']));
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        // Delete all related images and their files
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_url);
            $image->delete();
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}
