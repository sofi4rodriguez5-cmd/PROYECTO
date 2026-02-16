<?php

namespace App\Http\Controllers;

use App\Services\TouristService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class HotelsController extends BaseController
{
    private TouristService $touristService;
    
    public function __construct(TouristService $touristService)
    {
        $this->touristService = $touristService;
    }
    
    public function index(): JsonResponse
    {
        $hotels = $this->touristService->getAllHotels();
        $hotelsArray = $hotels->map(fn($hotel) => $hotel->toArray())->toArray();
        return response()->json($hotelsArray);
    }
    
    public function show(int $id): JsonResponse
    {
        $hotel = $this->touristService->getHotelById($id);
        
        if ($hotel === null) {
            return response()->json([
                'error' => "Hotel with ID $id not found."
            ], 404);
        }
        
        return response()->json($hotel->toArray());
    }
}
