<?php

namespace App\Http\Controllers;

use App\Services\TouristService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class TourismController extends BaseController
{
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService)
    {
        $this->touristService = $touristService;
    }
    
    public function getCityInfo(): JsonResponse
    {
        $cityInfo = $this->touristService->getCityInfo();
        return response()->json($cityInfo->toArray());
    }
    
    public function getAllTouristPlaces(): JsonResponse
    {
        $places = $this->touristService->getAllTouristPlaces();
        $placesArray = $places->map(fn($place) => $place->toArray())->toArray();
        return response()->json($placesArray);
    }
    
    public function getTouristPlace(int $id): JsonResponse
    {
        $place = $this->touristService->getTouristPlaceById($id);
        
        if ($place === null) {
            return response()->json([
                'error' => "Tourist place with ID $id not found."
            ], 404);
        }
        
        return response()->json($place->toArray());
    }
    
    public function getTouristPlacesByCategory(string $category): JsonResponse
    {
        $places = $this->touristService->getTouristPlacesByCategory($category);
        $placesArray = $places->map(fn($place) => $place->toArray())->toArray();
        return response()->json($placesArray);
    }
    
    public function getCategories(): JsonResponse
    {
        $categories = $this->touristService->getAllCategories();
        return response()->json($categories);
    }
}
