<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $query = Order::with('items.product', 'payment');

        if (!Auth::user()->is_admin) {
            $query->where('user_id', Auth::id());
        }

        return $query->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:cod,bacs,card,paypal',
            'customer_id' => 'nullable|integer'
        ]);

        return DB::transaction(function () use ($validated) {
            $user = Auth::user();
            $customerId = $user->is_admin ? ($validated['customer_id'] ?? null) : $user->id;

            $order = Order::create([
                'user_id' => $user->id,
                'customer_id' => $customerId,
                'status' => 'pending',
                'total_amount' => 0,
            ]);

            $total = 0;

            foreach ($validated['items'] as $item) {
                $product = \App\Models\Product::findOrFail($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
            }

            $order->update(['total_amount' => $total]);

            Payment::create([
                'order_id' => $order->id,
                'payment_method' => $validated['payment_method'],
                'status' => 'pending',
                'amount' => $total,
            ]);

            return $order->load('items.product', 'payment');
        });
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);
        return $order->load('items.product', 'payment');
    }


    public function update(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'status' => 'in:pending,processing,completed,canceled',
        ]);

        $order->update($validated);

        return response()->json(['message' => 'Order updated', 'order' => $order]);
    }

    public function destroy(Order $order)
    {
        $this->authorize('delete', $order);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
