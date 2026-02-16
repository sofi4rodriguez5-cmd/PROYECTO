# 🚀 Inicio Rápido - 3 Backends

## Comandos Rápidos

### C# (.NET 8)

```bash
cd proyecto/backend
dotnet run
```
✅ API en: `http://localhost:5000/api`

### PHP Vanilla

```bash
cd proyecto/backend-php
php -S localhost:8080
```
✅ API en: `http://localhost:8080/api`

### Laravel 10

```bash
cd proyecto/backend-laravel
composer install          # Solo primera vez
cp .env.example .env      # Solo primera vez
php artisan key:generate  # Solo primera vez
php artisan serve
```
✅ API en: `http://localhost:8000/api`

## Prueba Rápida

```bash
# Lugares turísticos
curl http://localhost:5000/api/tourism/places  # C#
curl http://localhost:8080/api/tourism/places  # PHP
curl http://localhost:8000/api/tourism/places  # Laravel

# Crear carrito
curl -X POST http://localhost:5000/api/cart/create  # C#
curl -X POST http://localhost:8080/api/cart/create  # PHP
curl -X POST http://localhost:8000/api/cart/create  # Laravel
```

## Configurar Frontend

Editar archivos JavaScript en `proyecto/frontend/`:

```javascript
// Cambiar esta línea en todos los archivos *-script.js:

// Para C#
const API_URL = 'http://localhost:5000/api';

// Para PHP Vanilla
const API_URL = 'http://localhost:8080/api';

// Para Laravel
const API_URL = 'http://localhost:8000/api';
```

**Archivos a modificar**:
- `index-script.js`
- `hotels-script.js`
- `places-script.js`
- `restaurants-script.js`
- `transport-script.js`
- `cart-script.js`

## Verificar Funcionamiento

1. **Iniciar backend** (elegir uno)
2. **Configurar frontend** (cambiar API_URL)
3. **Abrir** `proyecto/frontend/index.html`
4. **Verificar** que los datos se cargan correctamente

## Comandos Útiles

### Laravel

```bash
# Ver rutas
php artisan route:list

# Ver versión
php artisan --version

# Limpiar cache
php artisan cache:clear

# Cambiar puerto
php artisan serve --port=8080
```

### C#

```bash
# Ver versión
dotnet --version

# Limpiar y compilar
dotnet clean
dotnet build

# Cambiar puerto (editar Properties/launchSettings.json)
```

### PHP Vanilla

```bash
# Ver versión
php --version

# Cambiar puerto
php -S localhost:9000
```

## Solución Rápida de Problemas

### Laravel: "Class not found"
```bash
composer install
```

### Laravel: "No encryption key"
```bash
php artisan key:generate
```

### C#: "SDK not found"
```bash
# Instalar .NET 8 SDK
# https://dotnet.microsoft.com/download
```

### PHP: "Port already in use"
```bash
# Usar otro puerto
php -S localhost:8081
```

## 📚 Documentación Completa

- `proyecto/backend/README.md`
- `proyecto/backend-php/README.md`
- `proyecto/backend-laravel/README.md`
- `proyecto/backend-laravel/TESTING.md`
- `proyecto/COMPARACION_BACKENDS.md`
- `proyecto/ESTADO_BACKEND_LARAVEL.md`

## ✅ Estado del Proyecto

- ✅ Backend C# (.NET 8) - Completo
- ✅ Backend PHP Vanilla - Completo
- ✅ Backend Laravel 10 - Completo
- ✅ Frontend HTML/CSS/JS - Completo
- ✅ 25 endpoints en cada backend
- ✅ 100% compatible entre backends
- ✅ Almacenamiento en memoria
- ✅ CORS configurado

**¡Los 3 backends están listos para usar!** 🎉
