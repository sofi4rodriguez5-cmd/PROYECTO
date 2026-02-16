<?php

class CartController {
    private CartService $cartService;
    
    public function __construct(CartService $cartService) {
        $this->cartService = $cartService;
    }
    
    public function handleRequest(array $segments, string $method): void {
        // Remover 'api' y 'cart' de los segmentos
        array_shift($segments); // api
        array_shift($segments); // cart
        
        if (empty($segments)) {
            if ($method === 'POST') {
                $this->createCart();
            } else {
                $this->methodNotAllowed();
            }
            return;
        }
        
        $action = $segments[0];
        
        if ($action === 'create' && $method === 'POST') {
            $this->createCart();
            return;
        }
        
        $cartId = $action;
        
        if ($method === 'GET') {
            $this->getCart($cartId);
        } else if ($method === 'POST' && isset($segments[1]) && $segments[1] === 'items') {
            $this->addItemToCart($cartId);
        } else if ($method === 'DELETE') {
            if (isset($segments[1]) && $segments[1] === 'items' && isset($segments[2])) {
                $this->removeItemFromCart($cartId, $segments[2]);
            } else {
                $this->clearCart($cartId);
            }
        } else {
            $this->methodNotAllowed();
        }
    }
    
    private function getCart(string $cartId): void {
        $cart = $this->cartService->getOrCreateCart($cartId);
        $this->jsonResponse($cart->toArray());
    }
    
    private function addItemToCart(string $cartId): void {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['itemType']) || !isset($input['itemId'])) {
            $this->badRequest('itemType and itemId are required');
            return;
        }
        
        try {
            $cart = $this->cartService->addItemToCart(
                $cartId,
                $input['itemType'],
                (int)$input['itemId']
            );
            $this->jsonResponse($cart->toArray());
        } catch (Exception $e) {
            $this->badRequest($e->getMessage());
        }
    }
    
    private function removeItemFromCart(string $cartId, string $itemId): void {
        $cart = $this->cartService->removeItemFromCart($cartId, $itemId);
        $this->jsonResponse($cart->toArray());
    }
    
    private function clearCart(string $cartId): void {
        $cart = $this->cartService->clearCart($cartId);
        $this->jsonResponse($cart->toArray());
    }
    
    private function createCart(): void {
        $cartId = $this->generateUuid();
        $cart = $this->cartService->getOrCreateCart($cartId);
        $this->jsonResponse($cart->toArray());
    }
    
    private function generateUuid(): string {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
    
    private function jsonResponse($data, int $statusCode = 200): void {
        http_response_code($statusCode);
        echo json_encode($data);
    }
    
    private function badRequest(string $message): void {
        http_response_code(400);
        echo json_encode(['message' => $message]);
    }
    
    private function methodNotAllowed(): void {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
}
