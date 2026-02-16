<?php

class RestaurantsController {
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService) {
        $this->touristService = $touristService;
    }
    
    public function handleRequest(array $segments, string $method): void {
        // Remover 'api' y 'restaurants' de los segmentos
        array_shift($segments); // api
        array_shift($segments); // restaurants
        
        if ($method === 'GET') {
            if (empty($segments)) {
                $this->getAllRestaurants();
            } else {
                $action = $segments[0];
                
                if ($action === 'cuisine' && isset($segments[1])) {
                    $this->getRestaurantsByCuisine($segments[1]);
                } else if ($action === 'cuisine-types') {
                    $this->getCuisineTypes();
                } else {
                    $this->getRestaurant((int)$action);
                }
            }
        } else {
            $this->methodNotAllowed();
        }
    }
    
    private function getAllRestaurants(): void {
        $restaurants = $this->touristService->getAllRestaurants();
        $restaurantsArray = array_map(function($restaurant) {
            return $restaurant->toArray();
        }, $restaurants);
        $this->jsonResponse($restaurantsArray);
    }
    
    private function getRestaurant(int $id): void {
        $restaurant = $this->touristService->getRestaurantById($id);
        if ($restaurant === null) {
            $this->notFound("Restaurant with ID $id not found.");
            return;
        }
        $this->jsonResponse($restaurant->toArray());
    }
    
    private function getRestaurantsByCuisine(string $cuisineType): void {
        $restaurants = $this->touristService->getRestaurantsByCuisine($cuisineType);
        $restaurantsArray = array_map(function($restaurant) {
            return $restaurant->toArray();
        }, array_values($restaurants));
        $this->jsonResponse($restaurantsArray);
    }
    
    private function getCuisineTypes(): void {
        $types = $this->touristService->getCuisineTypes();
        $this->jsonResponse($types);
    }
    
    private function jsonResponse($data, int $statusCode = 200): void {
        http_response_code($statusCode);
        echo json_encode($data);
    }
    
    private function notFound(string $message = 'Not found'): void {
        http_response_code(404);
        echo json_encode(['error' => $message]);
    }
    
    private function methodNotAllowed(): void {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
}
