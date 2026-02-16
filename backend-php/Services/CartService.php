<?php

class CartService {
    private static ?CartService $instance = null;
    private array $carts = [];
    private TouristService $touristService;
    
    private function __construct(TouristService $touristService) {
        $this->touristService = $touristService;
    }
    
    public static function getInstance(TouristService $touristService): CartService {
        if (self::$instance === null) {
            self::$instance = new CartService($touristService);
        }
        return self::$instance;
    }
    
    public function getOrCreateCart(string $cartId): Cart {
        if (empty($cartId)) {
            $cartId = $this->generateUuid();
        }
        
        if (!isset($this->carts[$cartId])) {
            $cart = new Cart();
            $cart->id = $cartId;
            $cart->createdAt = date('Y-m-d H:i:s');
            $cart->updatedAt = date('Y-m-d H:i:s');
            $this->carts[$cartId] = $cart;
        }
        
        return $this->carts[$cartId];
    }
    
    public function addItemToCart(string $cartId, string $itemType, int $itemId): Cart {
        $cart = $this->getOrCreateCart($cartId);
        
        // Verificar si el item ya existe en el carrito
        foreach ($cart->items as $item) {
            if ($item->type === $itemType && $item->itemId === $itemId) {
                return $cart; // No agregar duplicados
            }
        }
        
        $cartItem = $this->createCartItem($itemType, $itemId);
        if ($cartItem !== null) {
            $cartItem->id = $this->generateUuid();
            $cartItem->addedAt = date('Y-m-d H:i:s');
            $cart->items[] = $cartItem;
            $cart->updatedAt = date('Y-m-d H:i:s');
        }
        
        return $cart;
    }
    
    public function removeItemFromCart(string $cartId, string $itemId): Cart {
        $cart = $this->getOrCreateCart($cartId);
        
        $cart->items = array_filter($cart->items, function($item) use ($itemId) {
            return $item->id !== $itemId;
        });
        
        $cart->items = array_values($cart->items); // Reindexar array
        $cart->updatedAt = date('Y-m-d H:i:s');
        
        return $cart;
    }
    
    public function clearCart(string $cartId): Cart {
        $cart = $this->getOrCreateCart($cartId);
        $cart->items = [];
        $cart->updatedAt = date('Y-m-d H:i:s');
        return $cart;
    }
    
    private function createCartItem(string $itemType, int $itemId): ?CartItem {
        return match(strtolower($itemType)) {
            'place' => $this->createPlaceCartItem($itemId),
            'hotel' => $this->createHotelCartItem($itemId),
            'restaurant' => $this->createRestaurantCartItem($itemId),
            'transport' => $this->createTransportCartItem($itemId),
            default => null
        };
    }
    
    private function createPlaceCartItem(int $placeId): ?CartItem {
        $place = $this->touristService->getTouristPlaceById($placeId);
        if ($place === null) return null;
        
        $cartItem = new CartItem();
        $cartItem->type = 'place';
        $cartItem->itemId = $place->id;
        $cartItem->name = $place->name;
        $cartItem->description = $place->description;
        $cartItem->imageUrl = $place->imageUrl;
        $cartItem->price = 0; // Los lugares turísticos son gratuitos
        $cartItem->category = $place->category;
        $cartItem->additionalInfo = [
            'activities' => $place->activities,
            'openingHours' => $place->openingHours,
            'latitude' => $place->latitude,
            'longitude' => $place->longitude
        ];
        
        return $cartItem;
    }
    
    private function createHotelCartItem(int $hotelId): ?CartItem {
        $hotel = $this->touristService->getHotelById($hotelId);
        if ($hotel === null) return null;
        
        $cartItem = new CartItem();
        $cartItem->type = 'hotel';
        $cartItem->itemId = $hotel->id;
        $cartItem->name = $hotel->name;
        $cartItem->description = $hotel->description;
        $cartItem->imageUrl = $hotel->imageUrl;
        $cartItem->price = $hotel->pricePerNight;
        $cartItem->category = $hotel->stars . ' estrellas';
        $cartItem->additionalInfo = [
            'address' => $hotel->address,
            'phone' => $hotel->phone,
            'email' => $hotel->email,
            'services' => $hotel->services,
            'roomTypes' => $hotel->roomTypes
        ];
        
        return $cartItem;
    }
    
    private function createRestaurantCartItem(int $restaurantId): ?CartItem {
        $restaurant = $this->touristService->getRestaurantById($restaurantId);
        if ($restaurant === null) return null;
        
        $cartItem = new CartItem();
        $cartItem->type = 'restaurant';
        $cartItem->itemId = $restaurant->id;
        $cartItem->name = $restaurant->name;
        $cartItem->description = $restaurant->description;
        $cartItem->imageUrl = $restaurant->imageUrl;
        $cartItem->price = 25000; // Precio promedio estimado por persona
        $cartItem->category = $restaurant->cuisineType;
        $cartItem->additionalInfo = [
            'address' => $restaurant->address,
            'phone' => $restaurant->phone,
            'priceRange' => $restaurant->priceRange,
            'specialties' => $restaurant->specialties,
            'openingHours' => $restaurant->openingHours,
            'rating' => $restaurant->rating
        ];
        
        return $cartItem;
    }
    
    private function createTransportCartItem(int $transportId): ?CartItem {
        $transport = $this->touristService->getTransportationById($transportId);
        if ($transport === null) return null;
        
        $cartItem = new CartItem();
        $cartItem->type = 'transport';
        $cartItem->itemId = $transport->id;
        $cartItem->name = $transport->name;
        $cartItem->description = $transport->description;
        $cartItem->imageUrl = $transport->imageUrl;
        $cartItem->price = $transport->price;
        $cartItem->category = $transport->type;
        $cartItem->additionalInfo = [
            'route' => $transport->route,
            'schedule' => $transport->schedule,
            'contact' => $transport->contact,
            'services' => $transport->services
        ];
        
        return $cartItem;
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
}
