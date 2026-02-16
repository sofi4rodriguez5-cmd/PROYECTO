<?php

namespace App\Models;

class Restaurant
{
    public int $id = 0;
    public string $name = '';
    public string $description = '';
    public string $address = '';
    public string $phone = '';
    public string $imageUrl = '';
    public string $cuisineType = '';
    public string $priceRange = '';
    public array $specialties = [];
    public string $openingHours = '';
    public float $rating = 0;
    public float $latitude = 0;
    public float $longitude = 0;
    
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'address' => $this->address,
            'phone' => $this->phone,
            'imageUrl' => $this->imageUrl,
            'cuisineType' => $this->cuisineType,
            'priceRange' => $this->priceRange,
            'specialties' => $this->specialties,
            'openingHours' => $this->openingHours,
            'rating' => $this->rating,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude
        ];
    }
}
