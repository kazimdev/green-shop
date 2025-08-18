<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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
        $validated = $this->validateStoreRequest($request);

        return DB::transaction(function () use ($validated, $request) {
            $customer = $this->createCustomer($request->user(), $validated);

            $customer_id = isset($customer['id']) ? $customer['id'] : 0;

            $order = $this->createOrder($customer_id);

            $total = $this->createOrderItems($order, $validated['items']);

            $this->updateOrderTotal($order, $total);

            $this->createPayment($order, $validated['payment_method'], $total);

            return response()->json($order->load('items.product', 'payment'), 201);
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
        $validated = $this->validateUpdateRequest($request);

        DB::transaction(function () use ($order, $validated) {
            if (isset($validated['items'])) {
                $this->updateOrderItems($order, $validated['items']);
            }

            if (isset($validated['status'])) {
                $order->status = $validated['status'];
            }

            if (isset($validated['customer_id'])) {
                $order->customer_id = $validated['customer_id'];
            }

            $order->save();

            if (isset($validated['payment_method'])) {
                $order->payment()->update(['payment_method' => $validated['payment_method']]);
            }

            if (isset($validated['items'])) {
                $newTotal = $order->items->sum(function ($item) {
                    return $item->price * $item->quantity;
                });
                $this->updateOrderTotal($order, $newTotal);
                $order->payment()->update(['amount' => $newTotal]);
            }
        });

        return response()->json(['message' => 'Order updated', 'order' => $order->load('items.product', 'payment')]);
    }

    public function destroy(Order $order)
    {
        $this->authorize('delete', $order);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }

    // Private Helper Methods
    private function validateStoreRequest(Request $request)
    {
        return $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:cod,bacs,card,paypal',
            'customer_id' => 'required|integer',
            'customer_phone' => 'string|nullable',
            'billing_address' => 'array|nullable',
            'shipping_address' => 'array|nullable',
        ]);
    }

    private function validateUpdateRequest(Request $request)
    {
        return $request->validate([
            'items' => 'sometimes|array',
            'items.*.product_id' => 'required_with:items|exists:products,id',
            'items.*.quantity' => 'required_with:items|integer|min:1',
            'payment_method' => 'sometimes|in:cod,bacs,card,paypal',
            'customer_id' => 'sometimes|nullable|integer|exists:users,id',
            'status' => ['sometimes', Rule::in(['pending', 'processing', 'completed', 'cancelled'])],
        ]);
    }

    private function createCustomer($user, array $customerData): Customer
    {
        // logger($customerData);

        return Customer::create([
            'user_id' => $customerData['customer_id'] ?? $user->id,
            'phone' => $customerData['customer_phone'] ?? '',
            'billing_address' => $customerData['billing_address'] ?? '',
            'shipping_address' => $customerData['shipping_address'] ?? '',
        ]);
    }

    private function createOrder(int $customerId): Order
    {
        $user = Auth::user();

        return Order::create([
            'user_id' => $user->id,
            'customer_id' => $customerId,
            'status' => 'pending',
            'total_amount' => 0,
        ]);
    }

    private function createOrderItems(Order $order, array $items): float
    {
        $total = 0;
        foreach ($items as $item) {
            $product = Product::findOrFail($item['product_id']);
            $this->checkStock($product, $item['quantity']);
            $product->decrement('stock', $item['quantity']);
            $subtotal = $product->price * $item['quantity'];
            $total += $subtotal;

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }
        return $total;
    }

    private function updateOrderItems(Order $order, array $items)
    {
        // Return stock for the old items.
        foreach ($order->items as $item) {
            Product::find($item->product_id)?->increment('stock', $item->quantity);
        }

        // Delete old items.
        $order->items()->delete();

        // Add new items
        $this->createOrderItems($order, $items);
    }

    private function updateOrderTotal(Order $order, float $total)
    {
        $order->update(['total_amount' => $total]);
    }

    private function createPayment(Order $order, string $paymentMethod, float $total)
    {
        Payment::create([
            'order_id' => $order->id,
            'payment_method' => $paymentMethod,
            'status' => 'pending',
            'amount' => $total,
        ]);
    }

    private function checkStock(Product $product, int $quantity)
    {
        if ($product->stock < $quantity) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'items' => "Not enough stock for product: {$product->title}. Available: {$product->stock}.",
            ]);
        }
    }
}
