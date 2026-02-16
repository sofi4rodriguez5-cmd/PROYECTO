# Guía de Pruebas - Backend Laravel

## 🚀 Inicio Rápido

### 1. Instalación

```bash
cd proyecto/backend-laravel
composer install
cp .env.example .env
php artisan key:generate
```

### 2. Iniciar Servidor

```bash
php artisan serve
```

El servidor estará disponible en: `http://localhost:8000`

## 🧪 Pruebas de Endpoints

### Tourism API

```bash
# Obtener información de la ciudad
curl http://localhost:8000/api/tourism/city-info

# Obtener todos los lugares turísticos
curl http://localhost:8000/api/tourism/places

# Obtener un lugar específico
curl http://localhost:8000/api/tourism/places/1

# Obtener lugares por categoría
curl http://localhost:8000/api/tourism/places/category/Natural

# Obtener todas las categorías
curl http://localhost:8000/api/tourism/categories
```

### Hotels API

```bash
# Obtener todos los hoteles
curl http://localhost:8000/api/hotels

# Obtener un hotel específico
curl http://localhost:8000/api/hotels/1
```

### Restaurants API

```bash
# Obtener todos los restaurantes
curl http://localhost:8000/api/restaurants

# Obtener un restaurante específico
curl http://localhost:8000/api/restaurants/1

# Obtener restaurantes por tipo de cocina
curl http://localhost:8000/api/restaurants/cuisine/Internacional

# Obtener tipos de cocina
curl http://localhost:8000/api/restaurants/cuisine-types
```

### Transportation API

```bash
# Obtener todos los transportes
curl http://localhost:8000/api/transportation

# Obtener un transporte específico
curl http://localhost:8000/api/transportation/1

# Obtener transportes por tipo
curl http://localhost:8000/api/transportation/type/Taxi%20Local

# Obtener tipos de transporte
curl http://localhost:8000/api/transportation/types
```

### Cart API

```bash
# Crear un carrito nuevo
curl -X POST http://localhost:8000/api/cart/create

# Obtener un carrito (reemplaza {cartId} con el ID recibido)
curl http://localhost:8000/api/cart/{cartId}

# Agregar item al carrito
curl -X POST http://localhost:8000/api/cart/{cartId}/items \
  -H "Content-Type: application/json" \
  -d '{"itemType":"place","itemId":1}'

# Eliminar item del carrito
curl -X DELETE http://localhost:8000/api/cart/{cartId}/items/{itemId}

# Limpiar carrito
curl -X DELETE http://localhost:8000/api/cart/{cartId}
```

## ✅ Verificaciones

### 1. Verificar que Laravel está funcionando

```bash
php artisan --version
# Debe mostrar: Laravel Framework 10.x.x
```

### 2. Verificar rutas registradas

```bash
php artisan route:list
```

Debe mostrar todas las rutas API:
- `GET|HEAD  api/tourism/city-info`
- `GET|HEAD  api/tourism/places`
- `GET|HEAD  api/hotels`
- `GET|HEAD  api/restaurants`
- `GET|HEAD  api/transportation`
- `POST      api/cart/create`
- etc.

### 3. Verificar Service Providers

Los servicios deben estar registrados como Singleton en `app/Providers/AppServiceProvider.php`:
- ✅ TouristService
- ✅ CartService

### 4. Verificar CORS

El CORS debe estar habilitado en `config/cors.php` y el middleware debe estar registrado en `bootstrap/app.php`.

## 🔍 Pruebas con el Frontend

### 1. Actualizar URL del Backend en Frontend

Editar los archivos JavaScript del frontend para apuntar a Laravel:

```javascript
// Cambiar de:
const API_URL = 'http://localhost:8080/api';

// A:
const API_URL = 'http://localhost:8000/api';
```

Archivos a modificar:
- `proyecto/frontend/index-script.js`
- `proyecto/frontend/hotels-script.js`
- `proyecto/frontend/places-script.js`
- `proyecto/frontend/restaurants-script.js`
- `proyecto/frontend/transport-script.js`
- `proyecto/frontend/cart-script.js`

### 2. Abrir Frontend

Abrir `proyecto/frontend/index.html` en el navegador y verificar que:
- ✅ Los lugares turísticos se cargan correctamente
- ✅ Los hoteles se muestran
- ✅ Los restaurantes aparecen
- ✅ El transporte está disponible
- ✅ El carrito funciona (agregar/eliminar items)

## 🐛 Solución de Problemas

### Error: "Class 'Illuminate\Foundation\Application' not found"

```bash
composer install
```

### Error: "No application encryption key has been specified"

```bash
php artisan key:generate
```

### Error: CORS

Verificar que el middleware CORS está registrado en `bootstrap/app.php`:

```php
$middleware->api(prepend: [
    \Illuminate\Http\Middleware\HandleCors::class,
]);
```

### Puerto 8000 ocupado

Usar otro puerto:

```bash
php artisan serve --port=8080
```

## 📊 Comparación con Otros Backends

Todos los backends deben devolver respuestas idénticas:

| Backend | URL | Puerto |
|---------|-----|--------|
| C# (.NET) | `http://localhost:5000/api` | 5000 |
| PHP Vanilla | `http://localhost:8080/api` | 8080 |
| Laravel | `http://localhost:8000/api` | 8000 |

Prueba con cualquiera:

```bash
# C#
curl http://localhost:5000/api/tourism/places

# PHP Vanilla
curl http://localhost:8080/api/tourism/places

# Laravel
curl http://localhost:8000/api/tourism/places
```

Las respuestas deben ser idénticas ✅

## ✨ Características Laravel Verificadas

- ✅ Service Providers (Singleton pattern)
- ✅ Dependency Injection automática
- ✅ Collections para manipulación de datos
- ✅ Routing declarativo
- ✅ Request validation
- ✅ Response helpers
- ✅ CORS middleware
- ✅ Artisan CLI
- ✅ Helpers (Str::uuid(), now())

## 📝 Notas

- El almacenamiento es en memoria (sin base de datos)
- Los datos se reinician al reiniciar el servidor
- Los servicios son Singleton (una sola instancia)
- Compatible 100% con el frontend existente
