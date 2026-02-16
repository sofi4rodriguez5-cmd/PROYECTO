<?php

namespace App\Models;

use Illuminate\Support\Collection;

class Cart
{
    public string $id = '';
    public array $items = [];
    public string $createdAt = '';
    public string $updatedAt = '';
    
    public function getTotalPrice(): float
    {
        return collect($this->items)->sum(fn($item) => $item->price);
    }
    
    public function getTotalItems(): int
    {
        return count($this->items);
    }
    
    public function getItemsByCategory(): array
    {
        return collect($this->items)
            ->groupBy('type')
            ->toArray();
    }
    
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'items' => array_map(fn($item) => $item->toArray(), $this->items),
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'totalPrice' => $this->getTotalPrice(),
            'totalItems' => $this->getTotalItems(),
            'itemsByCategory' => array_map(
                fn($items) => array_map(fn($item) => $item->toArray(), $items),
                $this->getItemsByCategory()
            )
        ];
    }
}
