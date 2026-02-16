<?php

class TouristPlace {
    public int $id = 0;
    public string $name = '';
    public string $description = '';
    public string $category = '';
    public string $imageUrl = '';
    public float $latitude = 0;
    public float $longitude = 0;
    public array $activities = [];
    public string $openingHours = '';
    
    public function toArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category' => $this->category,
            'imageUrl' => $this->imageUrl,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'activities' => $this->activities,
            'openingHours' => $this->openingHours
        ];
    }
}
