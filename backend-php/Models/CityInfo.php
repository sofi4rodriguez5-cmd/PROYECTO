<?php

class CityInfo {
    public string $name = 'Ortega';
    public string $department = '';
    public string $description = '';
    public string $history = '';
    public int $population = 0;
    public float $area = 0;
    public int $altitude = 0;
    public float $temperature = 0;
    public string $climate = '';
    public string $economy = '';
    public string $culture = '';
    public array $highlights = [];
    public string $location = '';
    
    public function toArray(): array {
        return [
            'name' => $this->name,
            'department' => $this->department,
            'description' => $this->description,
            'history' => $this->history,
            'population' => $this->population,
            'area' => $this->area,
            'altitude' => $this->altitude,
            'temperature' => $this->temperature,
            'climate' => $this->climate,
            'economy' => $this->economy,
            'culture' => $this->culture,
            'highlights' => $this->highlights,
            'location' => $this->location
        ];
    }
}
