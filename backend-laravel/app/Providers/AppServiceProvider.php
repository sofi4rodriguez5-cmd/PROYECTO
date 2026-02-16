<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\TouristService;
use App\Services\CartService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Registrar TouristService como Singleton (almacenamiento en memoria)
        $this->app->singleton(TouristService::class, function ($app) {
            return new TouristService();
        });
        
        // Registrar CartService como Singleton (almacenamiento en memoria)
        $this->app->singleton(CartService::class, function ($app) {
            return new CartService($app->make(TouristService::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
