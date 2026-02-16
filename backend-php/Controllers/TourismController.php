<?php

class TourismController {
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService) {
        $this->touristService = $touristService;
    }
    
    public function handleRequest(array $segments, string $method): void {
        // Remover 'api' y 'tourism' de los segmentos
        array_shift($segments); // api
        array_shift($segments); // tourism
        
        if ($method === 'GET') {
            if (empty($segments)) {
                $this->notFound();
                return;
            }
            
            $action = $segments[0];
            
            switch ($action) {
                case 'city-info':
                    $this->getCityInfo();
                    break;
                    
                case 'places':
                    if (isset($segments[1])) {
                        if ($segments[1] === 'category' && isset($segments[2])) {
                            $this->getTouristPlacesByCategory($segments[2]);
                        } else {
                            $this->getTouristPlace((int)$segments[1]);
                        }
                    } else {
                        $this->getAllTouristPlaces();
                    }
                    break;
                    
                case 'categories':
                    $this->getCategories();
                    break;
                    
                default:
                    $this->notFound();
                    break;
            }
        } else {
            $this->methodNotAllowed();
        }
    }
    
    private function getCityInfo(): void {
        $cityInfo = $this->touristService->getCityInfo();
        $this->jsonResponse($cityInfo->toArray());
    }
    
    private function getAllTouristPlaces(): void {
        $places = $this->touristService->getAllTouristPlaces();
        $placesArray = array_map(function($place) {
            return $place->toArray();
        }, $places);
        $this->jsonResponse($placesArray);
    }
    
    private function getTouristPlace(int $id): void {
        $place = $this->touristService->getTouristPlaceById($id);
        if ($place === null) {
            $this->notFound("Tourist place with ID $id not found.");
            return;
        }
        $this->jsonResponse($place->toArray());
    }
    
    private function getTouristPlacesByCategory(string $category): void {
        $places = $this->touristService->getTouristPlacesByCategory($category);
        $placesArray = array_map(function($place) {
            return $place->toArray();
        }, array_values($places));
        $this->jsonResponse($placesArray);
    }
    
    private function getCategories(): void {
        $categories = $this->touristService->getAllCategories();
        $this->jsonResponse($categories);
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
