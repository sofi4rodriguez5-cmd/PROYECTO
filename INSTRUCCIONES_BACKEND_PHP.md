# Instrucciones para Usar el Backend PHP

## 🚀 Inicio Rápido

### 1. Iniciar el Servidor PHP

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
cd proyecto/backend-php
php -S localhost:8080
```

Verás un mensaje como:
```
[Mon Feb 16 10:00:00 2026] PHP 8.x Development Server (http://localhost:8080) started
```

### 2. Verificar que Funciona

Abre tu navegador y visita:
```
http://localhost:8080/api/tourism/places
```

Deberías ver una respuesta JSON con los lugares turísticos.

## 🧪 Probar los Endpoints

### Lugares Turísticos

```bash
# Todos los lugares
curl http://localhost:8080/api/tourism/places

# Lugar por ID
curl http://localhost:8080/api/tourism/places/1

# Lugares por categoría
curl http://localhost:8080/api/tourism/places/category/Natural

# Información de la ciudad
curl http://localhost:8080/api/tourism/city-info
```

### Hoteles

```bash
# Todos los hoteles
curl http://localhost:8080/api/hotels

# Hotel por ID
curl http://localhost:8080/api/hotels/1
```

### Restaurantes

```bash
# Todos los restaurantes
curl http://localhost:8080/api/restaurants

# Restaurante por ID
curl http://localhost:8080/api/restaurants/1

# Por tipo de cocina
curl http://localhost:8080/api/restaurants/cuisine/Internacional
```

### Transporte

```bash
# Todos los transportes
curl http://localhost:8080/api/transportation

# Transporte por ID
curl http://localhost:8080/api/transportation/1

# Por tipo
curl http://localhost:8080/api/transportation/type/Taxi%20Local
```

### Carrito

```bash
# Crear carrito
curl -X POST http://localhost:8080/api/cart/create

# Obtener carrito (usa el ID del paso anterior)
curl http://localhost:8080/api/cart/TU-CART-ID

# Agregar item al carrito
curl -X POST http://localhost:8080/api/cart/TU-CART-ID/items \
  -H "Content-Type: application/json" \
  -d '{"itemType":"place","itemId":1}'

# Eliminar item del carrito
curl -X DELETE http://localhost:8080/api/cart/TU-CART-ID/items/ITEM-ID

# Limpiar carrito
curl -X DELETE http://localhost:8080/api/cart/TU-CART-ID
```

## 🌐 Conectar con el Frontend

### Opción 1: Modificar el Frontend (Recomendado)

Si el frontend actualmente usa el backend C#, necesitas cambiar la URL base de la API.

**Nota**: El frontend actual NO usa el backend (funciona con datos en memoria en JavaScript), por lo que esta conversión está lista para cuando se decida integrar el backend.

### Opción 2: Usar Ambos Backends

Puedes mantener ambos backends corriendo:
- C#: `http://localhost:5000`
- PHP: `http://localhost:8080`

Y cambiar entre ellos según necesites.

## 📁 Estructura del Backend PHP

```
backend-php/
├── index.php              # Enrutador principal
├── .htaccess             # Configuración Apache
├── Controllers/          # Lógica de endpoints
│   ├── TourismController.php
│   ├── HotelsController.php
│   ├── RestaurantsController.php
│   ├── TransportationController.php
│   └── CartController.php
├── Models/               # Estructuras de datos
│   ├── CityInfo.php
│   ├── TouristPlace.php
│   ├── Hotel.php
│   ├── Restaurant.php
│   ├── Transportation.php
│   ├── Cart.php
│   └── CartItem.php
├── Services/             # Lógica de negocio
│   ├── TouristService.php
│   └── CartService.php
└── README.md
```

## ⚙️ Configuración Avanzada

### Usar con Apache

1. Copia la carpeta `backend-php` a tu directorio web (htdocs, www, etc.)
2. Asegúrate de que `mod_rewrite` esté habilitado
3. Accede a: `http://localhost/backend-php/api/tourism/places`

### Cambiar el Puerto

```bash
php -S localhost:PUERTO
```

Ejemplo:
```bash
php -S localhost:3000
```

## 🔍 Solución de Problemas

### Error: "Address already in use"

El puerto 8080 está ocupado. Usa otro puerto:
```bash
php -S localhost:8081
```

### Error: "No such file or directory"

Asegúrate de estar en la carpeta correcta:
```bash
cd proyecto/backend-php
pwd  # Debe mostrar la ruta a backend-php
```

### Error 404 en los endpoints

Verifica que el servidor esté corriendo y que uses la URL completa:
```
http://localhost:8080/api/tourism/places
```

### CORS Error en el Frontend

El backend PHP ya tiene CORS habilitado. Si aún tienes problemas, verifica que el frontend esté haciendo las peticiones a la URL correcta.

## 📊 Comparación C# vs PHP

| Característica | C# Backend | PHP Backend |
|---|---|---|
| Puerto por defecto | 5000 | 8080 |
| Comando de inicio | `dotnet run` | `php -S localhost:8080` |
| Requiere compilación | ✅ Sí | ❌ No |
| Requiere .NET | ✅ Sí | ❌ No |
| Requiere PHP | ❌ No | ✅ Sí |
| Endpoints | Idénticos | Idénticos |
| Respuestas JSON | Idénticas | Idénticas |
| Funcionalidad | 100% igual | 100% igual |

## ✅ Verificación Completa

Para verificar que todo funciona correctamente:

1. ✅ Inicia el servidor PHP
2. ✅ Prueba cada endpoint con curl o el navegador
3. ✅ Verifica que las respuestas JSON sean correctas
4. ✅ Prueba crear un carrito y agregar items
5. ✅ Verifica que CORS funcione (si usas frontend)

## 🎯 Próximos Pasos

1. El backend PHP está listo para usar
2. Puedes integrarlo con el frontend cuando lo necesites
3. Ambos backends (C# y PHP) son intercambiables
4. Elige el que mejor se adapte a tu entorno de producción

## 💡 Notas Importantes

- ⚠️ Los datos se almacenan en memoria y se pierden al reiniciar el servidor
- ⚠️ Este es un backend de demostración, no está optimizado para producción
- ⚠️ Para producción, considera agregar una base de datos real
- ✅ El código es idéntico en funcionalidad al backend C# original
