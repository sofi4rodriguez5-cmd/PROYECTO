<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;

class CartController extends BaseController
{
    private CartService $cartService;
    
    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }
    
    public function show(string $cartId): JsonResponse
    {
        $cart = $this->cartService->getOrCreateCart($cartId);
        return response()->json($cart->toArray());
    }
    
    public function addItem(Request $request, string $cartId): JsonResponse
    {
        $validated = $request->validate([
            'itemType' => 'required|string',
            'itemId' => 'required|integer'
        ]);
        
        try {
            $cart = $this->cartService->addItemToCart(
                $cartId,
                $validated['itemType'],
                $validated['itemId']
            );
            return response()->json($cart->toArray());
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
    
    public function removeItem(string $cartId, string $itemId): JsonResponse
    {
        $cart = $this->cartService->removeItemFromCart($cartId, $itemId);
        return response()->json($cart->toArray());
    }
    
    public function clear(string $cartId): JsonResponse
    {
        $cart = $this->cartService->clearCart($cartId);
        return response()->json($cart->toArray());
    }
    
    public function create(): JsonResponse
    {
        $cartId = Str::uuid()->toString();
        $cart = $this->cartService->getOrCreateCart($cartId);
        return response()->json($cart->toArray());
    }
}
