<?php

class HotelsController {
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService) {
        $this->touristService = $touristService;
    }
    
    public function handleRequest(array $segments, string $method): void {
        // Remover 'api' y 'hotels' de los segmentos
        array_shift($segments); // api
        array_shift($segments); // hotels
        
        if ($method === 'GET') {
            if (empty($segments)) {
                $this->getAllHotels();
            } else {
                $this->getHotel((int)$segments[0]);
            }
        } else {
            $this->methodNotAllowed();
        }
    }
    
    private function getAllHotels(): void {
        $hotels = $this->touristService->getAllHotels();
        $hotelsArray = array_map(function($hotel) {
            return $hotel->toArray();
        }, $hotels);
        $this->jsonResponse($hotelsArray);
    }
    
    private function getHotel(int $id): void {
        $hotel = $this->touristService->getHotelById($id);
        if ($hotel === null) {
            $this->notFound("Hotel with ID $id not found.");
            return;
        }
        $this->jsonResponse($hotel->toArray());
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
