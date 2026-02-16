<?php

namespace App\Models;

class Hotel
{
    public int $id = 0;
    public string $name = '';
    public string $description = '';
    public string $address = '';
    public string $phone = '';
    public string $email = '';
    public string $imageUrl = '';
    public int $stars = 0;
    public float $pricePerNight = 0;
    public array $services = [];
    public array $roomTypes = [];
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
            'email' => $this->email,
            'imageUrl' => $this->imageUrl,
            'stars' => $this->stars,
            'pricePerNight' => $this->pricePerNight,
            'services' => $this->services,
            'roomTypes' => $this->roomTypes,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude
        ];
    }
}
