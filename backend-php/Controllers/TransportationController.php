<?php

class TransportationController {
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService) {
        $this->touristService = $touristService;
    }
    
    public function handleRequest(array $segments, string $method): void {
        // Remover 'api' y 'transportation' de los segmentos
        array_shift($segments); // api
        array_shift($segments); // transportation
        
        if ($method === 'GET') {
            if (empty($segments)) {
                $this->getAllTransportations();
            } else {
                $action = $segments[0];
                
                if ($action === 'type' && isset($segments[1])) {
                    $this->getTransportationsByType($segments[1]);
                } else if ($action === 'types') {
                    $this->getTransportationTypes();
                } else {
                    $this->getTransportation((int)$action);
                }
            }
        } else {
            $this->methodNotAllowed();
        }
    }
    
    private function getAllTransportations(): void {
        $transportations = $this->touristService->getAllTransportations();
        $transportationsArray = array_map(function($transportation) {
            return $transportation->toArray();
        }, $transportations);
        $this->jsonResponse($transportationsArray);
    }
    
    private function getTransportation(int $id): void {
        $transportation = $this->touristService->getTransportationById($id);
        if ($transportation === null) {
            $this->notFound("Transportation with ID $id not found.");
            return;
        }
        $this->jsonResponse($transportation->toArray());
    }
    
    private function getTransportationsByType(string $type): void {
        $transportations = $this->touristService->getTransportationsByType($type);
        $transportationsArray = array_map(function($transportation) {
            return $transportation->toArray();
        }, array_values($transportations));
        $this->jsonResponse($transportationsArray);
    }
    
    private function getTransportationTypes(): void {
        $types = $this->touristService->getTransportationTypes();
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
