<?php

namespace App\Models;

class CartItem
{
    public string $id = '';
    public string $type = '';
    public int $itemId = 0;
    public string $name = '';
    public string $description = '';
    public string $imageUrl = '';
    public float $price = 0;
    public string $category = '';
    public string $addedAt = '';
    public array $additionalInfo = [];
    
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'itemId' => $this->itemId,
            'name' => $this->name,
            'description' => $this->description,
            'imageUrl' => $this->imageUrl,
            'price' => $this->price,
            'category' => $this->category,
            'addedAt' => $this->addedAt,
            'additionalInfo' => $this->additionalInfo
        ];
    }
}
