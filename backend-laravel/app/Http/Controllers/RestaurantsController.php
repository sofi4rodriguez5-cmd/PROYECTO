<?php

namespace App\Http\Controllers;

use App\Services\TouristService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class RestaurantsController extends BaseController
{
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService)
    {
        $this->touristService = $touristService;
    }
    
    public function index(): JsonResponse
    {
        $restaurants = $this->touristService->getAllRestaurants();
        $restaurantsArray = $restaurants->map(fn($restaurant) => $restaurant->toArray())->toArray();
        return response()->json($restaurantsArray);
    }
    
    public function show(int $id): JsonResponse
    {
        $restaurant = $this->touristService->getRestaurantById($id);
        
        if ($restaurant === null) {
            return response()->json([
                'error' => "Restaurant with ID $id not found."
            ], 404);
        }
        
        return response()->json($restaurant->toArray());
    }
    
    public function getByCuisine(string $cuisineType): JsonResponse
    {
        $restaurants = $this->touristService->getRestaurantsByCuisine($cuisineType);
        $restaurantsArray = $restaurants->map(fn($restaurant) => $restaurant->toArray())->toArray();
        return response()->json($restaurantsArray);
    }
    
    public function getCuisineTypes(): JsonResponse
    {
        $types = $this->touristService->getCuisineTypes();
        return response()->json($types);
    }
}
