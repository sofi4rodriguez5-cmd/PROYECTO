<?php

namespace App\Models;

class Transportation
{
    public int $id = 0;
    public string $name = '';
    public string $type = '';
    public string $description = '';
    public string $route = '';
    public string $schedule = '';
    public float $price = 0;
    public string $contact = '';
    public array $services = [];
    public string $imageUrl = '';
    
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'description' => $this->description,
            'route' => $this->route,
            'schedule' => $this->schedule,
            'price' => $this->price,
            'contact' => $this->contact,
            'services' => $this->services,
            'imageUrl' => $this->imageUrl
        ];
    }
}
