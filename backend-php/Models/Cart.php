<?php

class Cart {
    public string $id = '';
    public array $items = [];
    public string $createdAt = '';
    public string $updatedAt = '';
    
    public function getTotalPrice(): float {
        return array_reduce($this->items, function($sum, $item) {
            return $sum + $item->price;
        }, 0);
    }
    
    public function getTotalItems(): int {
        return count($this->items);
    }
    
    public function getItemsByCategory(): array {
        $grouped = [];
        foreach ($this->items as $item) {
            if (!isset($grouped[$item->type])) {
                $grouped[$item->type] = [];
            }
            $grouped[$item->type][] = $item;
        }
        return $grouped;
    }
    
    public function toArray(): array {
        return [
            'id' => $this->id,
            'items' => array_map(function($item) {
                return $item->toArray();
            }, $this->items),
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'totalPrice' => $this->getTotalPrice(),
            'totalItems' => $this->getTotalItems(),
            'itemsByCategory' => array_map(function($items) {
                return array_map(function($item) {
                    return $item->toArray();
                }, $items);
            }, $this->getItemsByCategory())
        ];
    }
}
