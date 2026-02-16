<?php

namespace App\Http\Controllers;

use App\Services\TouristService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class TransportationController extends BaseController
{
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService)
    {
        $this->touristService = $touristService;
    }
    
    public function index(): JsonResponse
    {
        $transportations = $this->touristService->getAllTransportations();
        $transportationsArray = $transportations->map(fn($transportation) => $transportation->toArray())->toArray();
        return response()->json($transportationsArray);
    }
    
    public function show(int $id): JsonResponse
    {
        $transportation = $this->touristService->getTransportationById($id);
        
        if ($transportation === null) {
            return response()->json([
                'error' => "Transportation with ID $id not found."
            ], 404);
        }
        
        return response()->json($transportation->toArray());
    }
    
    public function getByType(string $type): JsonResponse
    {
        $transportations = $this->touristService->getTransportationsByType($type);
        $transportationsArray = $transportations->map(fn($transportation) => $transportation->toArray())->toArray();
        return response()->json($transportationsArray);
    }
    
    public function getTypes(): JsonResponse
    {
        $types = $this->touristService->getTransportationTypes();
        return response()->json($types);
    }
}
