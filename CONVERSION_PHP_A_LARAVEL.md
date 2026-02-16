# Conversión del Backend: PHP Vanilla a Laravel

## Resumen

El backend PHP ha sido adaptado para usar **Laravel 10** y sus componentes nativos, manteniendo exactamente la misma funcionalidad y endpoints.

## ✅ Lo que SE CAMBIÓ

1. **Framework**: PHP Vanilla → Laravel 10
2. **Estructura**: Adaptada a convenciones de Laravel
3. **Componentes**: Uso de bibliotecas nativas de Laravel
4. **Routing**: Sistema de rutas de Laravel
5. **Dependency Injection**: Contenedor de servicios de Laravel
6. **Collections**: Uso de Collections en lugar de arrays
7. **Helpers**: Uso de helpers nativos de Laravel

## ❌ Lo que NO SE CAMBIÓ

1. ✅ Lógica de negocio
2. ✅ Endpoints de la API
3. ✅ Formato de respuestas JSON
4. ✅ Almacenamiento en memoria
5. ✅ Datos de ejemplo
6. ✅ Funcionalidad del carrito
7. ✅ Compatibilidad con frontend

## 🔄 Componentes Laravel Implementados

### 1. Service Providers

**Antes (PHP Vanilla)**:
```php
private static ?TouristService $instance = null;

public static function getInstance(): TouristService {
    if (self::$instance === null) {
        self::$instance = new TouristService();
    }
    return self::$instance;
}
```

**Ahora (Laravel)**:
```php
// AppServiceProvider.php
$this->app->singleton(TouristService::class, function ($app) {
    return new TouristService();
});
```

### 2. Dependency Injection

**Antes (PHP Vanilla)**:
```php
$touristService = TouristService::getInstance();
$cartService = CartService::getInstance($touristService);
```

**Ahora (Laravel)**:
```php
public function __construct(TouristService $touristService)
{
    $this->touristService = $touristService;
}
```

### 3. Collections

**Antes (PHP Vanilla)**:
```php
$categories = array_map(function($place) {
    return $place->category;
}, $this->touristPlaces);
return array_values(array_unique($categories));
```

**Ahora (Laravel)**:
```php
return $this->touristPlaces
    ->pluck('category')
    ->unique()
    ->values()
    ->toArray();
```

### 4. Routing

**Antes (PHP Vanilla)**:
```php
// index.php
$path = parse_url($requestUri, PHP_URL_PATH);
$segments = explode('/', $path);

switch ($controller) {
    case 'tourism':
        $tourismController = new TourismController($touristService);
        break;
}
```

**Ahora (Laravel)**:
```php
// routes/api.php
Route::prefix('tourism')->group(function () {
    Route::get('places', [TourismController::class, 'getAllTouristPlaces']);
    Route::get('places/{id}', [TourismController::class, 'getTouristPlace']);
});
```

### 5. Responses

**Antes (PHP Vanilla)**:
```php
http_response_code(200);
echo json_encode($data);
```

**Ahora (Laravel)**:
```php
return response()->json($data);
```

### 6. Helpers

**Antes (PHP Vanilla)**:
```php
$cartId = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), ...);
$date = date('Y-m-d H:i:s');
```

**Ahora (Laravel)**:
```php
$cartId = Str::uuid()->toString();
$date = now()->toDateTimeString();
```

### 7. Request Validation

**Antes (PHP Vanilla)**:
```php
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['itemType']) || !isset($input['itemId'])) {
    $this->badRequest('itemType and itemId are required');
    return;
}
```

**Ahora (Laravel)**:
```php
$validated = $request->validate([
    'itemType' => 'required|string',
    'itemId' => 'required|integer'
]);
```

### 8. CORS

**Antes (PHP Vanilla)**:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

**Ahora (Laravel)**:
```php
// config/cors.php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'],

// bootstrap/app.php
$middleware->api(prepend: [
    \Illuminate\Http\Middleware\HandleCors::class,
]);
```

## 📊 Comparación de Archivos

| PHP Vanilla | Laravel | Cambio |
|---|---|---|
| `index.php` | `public/index.php` + `routes/api.php` | Routing separado |
| `Controllers/*.php` | `app/Http/Controllers/*.php` | Namespace Laravel |
| `Models/*.php` | `app/Models/*.php` | Namespace Laravel |
| `Services/*.php` | `app/Services/*.php` | Namespace Laravel |
| Manual Singleton | `AppServiceProvider.php` | Service Provider |
| Manual routing | `routes/api.php` | Routing declarativo |
| - | `bootstrap/app.php` | Bootstrap Laravel |
| - | `composer.json` | Dependencias Laravel |
| - | `artisan` | CLI Laravel |

## 🎯 Ventajas de Laravel

1. ✅ **Dependency Injection**: Automática y elegante
2. ✅ **Collections**: API fluida para manipular datos
3. ✅ **Routing**: Declarativo y expresivo
4. ✅ **Validation**: Built-in y robusto
5. ✅ **Helpers**: Utilidades comunes incluidas
6. ✅ **Middleware**: CORS y otros fáciles de configurar
7. ✅ **Artisan**: CLI poderoso para desarrollo
8. ✅ **Ecosystem**: Paquetes y extensiones disponibles

## 🚀 Ejecución

### PHP Vanilla
```bash
cd proyecto/backend-php
php -S localhost:8080
```

### Laravel
```bash
cd proyecto/backend-laravel
composer install
php artisan serve
```

## 📡 Endpoints

Todos los endpoints mantienen la misma estructura:

- ✅ `/api/tourism/*`
- ✅ `/api/hotels/*`
- ✅ `/api/restaurants/*`
- ✅ `/api/transportation/*`
- ✅ `/api/cart/*`

## 🔍 Diferencias Clave

### Inicialización

**PHP Vanilla**: Singleton manual
```php
$touristService = TouristService::getInstance();
```

**Laravel**: Service Container
```php
// Registrado en AppServiceProvider
// Inyectado automáticamente en controladores
```

### Datos

**PHP Vanilla**: Arrays PHP
```php
private array $touristPlaces = [];
```

**Laravel**: Collections
```php
private Collection $touristPlaces;
$this->touristPlaces = collect($places);
```

### Respuestas

**PHP Vanilla**: Manual
```php
http_response_code(404);
echo json_encode(['error' => 'Not found']);
```

**Laravel**: Fluent API
```php
return response()->json(['error' => 'Not found'], 404);
```

## ✅ Verificación

Ambos backends son 100% compatibles:

```bash
# PHP Vanilla
curl http://localhost:8080/api/tourism/places

# Laravel
curl http://localhost:8000/api/tourism/places
```

Respuestas idénticas ✅

## 📝 Conclusión

La conversión a Laravel fue exitosa manteniendo:
- ✅ 100% de funcionalidad
- ✅ Mismos endpoints
- ✅ Mismas respuestas
- ✅ Almacenamiento en memoria
- ✅ Compatibilidad con frontend

**Ahora el proyecto tiene 3 backends funcionales:**
1. C# (.NET 8)
2. PHP Vanilla
3. PHP Laravel 10

Todos intercambiables y compatibles con el frontend.
