<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourismController;
use App\Http\Controllers\HotelsController;
use App\Http\Controllers\RestaurantsController;
use App\Http\Controllers\TransportationController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Rutas de la API REST para Ortega Tourism
| Mantiene la misma estructura que el backend C# original
|
*/

// Tourism Routes
Route::prefix('tourism')->group(function () {
    Route::get('city-info', [TourismController::class, 'getCityInfo']);
    Route::get('places', [TourismController::class, 'getAllTouristPlaces']);
    Route::get('places/{id}', [TourismController::class, 'getTouristPlace']);
    Route::get('places/category/{category}', [TourismController::class, 'getTouristPlacesByCategory']);
    Route::get('categories', [TourismController::class, 'getCategories']);
});

// Hotels Routes
Route::prefix('hotels')->group(function () {
    Route::get('/', [HotelsController::class, 'index']);
    Route::get('{id}', [HotelsController::class, 'show']);
});

// Restaurants Routes
Route::prefix('restaurants')->group(function () {
    Route::get('/', [RestaurantsController::class, 'index']);
    Route::get('{id}', [RestaurantsController::class, 'show']);
    Route::get('cuisine/{cuisineType}', [RestaurantsController::class, 'getByCuisine']);
    Route::get('cuisine-types', [RestaurantsController::class, 'getCuisineTypes']);
});

// Transportation Routes
Route::prefix('transportation')->group(function () {
    Route::get('/', [TransportationController::class, 'index']);
    Route::get('{id}', [TransportationController::class, 'show']);
    Route::get('type/{type}', [TransportationController::class, 'getByType']);
    Route::get('types', [TransportationController::class, 'getTypes']);
});

// Cart Routes
Route::prefix('cart')->group(function () {
    Route::post('create', [CartController::class, 'create']);
    Route::get('{cartId}', [CartController::class, 'show']);
    Route::post('{cartId}/items', [CartController::class, 'addItem']);
    Route::delete('{cartId}/items/{itemId}', [CartController::class, 'removeItem']);
    Route::delete('{cartId}', [CartController::class, 'clear']);
});
