# Backend PHP - Ortega Tourism API

Backend en PHP para el sistema de turismo de Ortega, Tolima. API REST con almacenamiento en memoria.

## Requisitos

- PHP 8.0 o superior
- Servidor web (Apache con mod_rewrite o PHP built-in server)

## Instalación y Ejecución

### Opción 1: Servidor PHP integrado (Desarrollo)

```bash
cd proyecto/backend-php
php -S localhost:8080
```

La API estará disponible en: `http://localhost:8080`

### Opción 2: Apache

1. Copiar la carpeta `backend-php` a tu directorio web (htdocs, www, etc.)
2. Asegurarse de que mod_rewrite esté habilitado
3. Acceder a través de: `http://localhost/backend-php`

## Endpoints de la API

### Tourism (Lugares Turísticos)

- `GET /api/tourism/city-info` - Información de la ciudad
- `GET /api/tourism/places` - Todos los lugares turísticos
- `GET /api/tourism/places/{id}` - Lugar turístico por ID
- `GET /api/tourism/places/category/{category}` - Lugares por categoría
- `GET /api/tourism/categories` - Todas las categorías

### Hotels (Hoteles)

- `GET /api/hotels` - Todos los hoteles
- `GET /api/hotels/{id}` - Hotel por ID

### Restaurants (Restaurantes)

- `GET /api/restaurants` - Todos los restaurantes
- `GET /api/restaurants/{id}` - Restaurante por ID
- `GET /api/restaurants/cuisine/{cuisineType}` - Restaurantes por tipo de cocina
- `GET /api/restaurants/cuisine-types` - Tipos de cocina disponibles

### Transportation (Transporte)

- `GET /api/transportation` - Todos los transportes
- `GET /api/transportation/{id}` - Transporte por ID
- `GET /api/transportation/type/{type}` - Transportes por tipo
- `GET /api/transportation/types` - Tipos de transporte disponibles

### Cart (Carrito)

- `POST /api/cart/create` - Crear nuevo carrito
- `GET /api/cart/{cartId}` - Obtener carrito
- `POST /api/cart/{cartId}/items` - Agregar item al carrito
  ```json
  {
    "itemType": "place|hotel|restaurant|transport",
    "itemId": 1
  }
  ```
- `DELETE /api/cart/{cartId}/items/{itemId}` - Eliminar item del carrito
- `DELETE /api/cart/{cartId}` - Limpiar carrito

## Estructura del Proyecto

```
backend-php/
├── index.php              # Punto de entrada y enrutador
├── .htaccess             # Configuración Apache
├── Controllers/          # Controladores de la API
│   ├── TourismController.php
│   ├── HotelsController.php
│   ├── RestaurantsController.php
│   ├── TransportationController.php
│   └── CartController.php
├── Models/               # Modelos de datos
│   ├── CityInfo.php
│   ├── TouristPlace.php
│   ├── Hotel.php
│   ├── Restaurant.php
│   ├── Transportation.php
│   ├── Cart.php
│   └── CartItem.php
├── Services/             # Servicios de negocio
│   ├── TouristService.php
│   └── CartService.php
└── README.md
```

## Características

- ✅ API REST completa
- ✅ Almacenamiento en memoria (sin base de datos)
- ✅ CORS habilitado para frontend
- ✅ Arquitectura MVC
- ✅ Patrón Singleton para servicios
- ✅ Respuestas JSON
- ✅ Manejo de errores HTTP
- ✅ Autoload de clases

## Notas

- Los datos se almacenan en memoria y se reinician al reiniciar el servidor
- CORS está configurado para permitir cualquier origen (*)
- No requiere base de datos ni configuración adicional
- Compatible con el frontend existente (misma estructura de API que C#)

## Conversión desde C#

Este backend es una conversión exacta del backend original en C# a PHP, manteniendo:
- La misma estructura de endpoints
- Los mismos modelos de datos
- La misma lógica de negocio
- El mismo comportamiento de la API
