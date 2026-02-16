# 🌿 Descubre Ortega - Aplicación Web Turística Completa con Carrito de Itinerario

Una aplicación web completa diseñada para mejorar la visibilidad turística de Ortega, Tolima. El proyecto presenta información detallada sobre el municipio, lugares turísticos, hoteles, restaurantes y opciones de transporte, con un sistema de carrito que permite a los usuarios crear itinerarios personalizados.

## 🎯 Características

- **Backend**: API REST desarrollada en C# (.NET 8) con múltiples controladores
- **Frontend**: Aplicación multi-página con HTML, CSS y JavaScript puro (Vanilla JS)
- **Carrito de Itinerario**: Sistema completo para agregar lugares, hoteles, restaurantes y transporte
- **Almacenamiento**: En memoria (sin base de datos)
- **Diseño**: Paleta de colores en tonos verdes y blancos
- **Responsive**: Adaptado para dispositivos móviles y desktop
- **Navegación**: Sistema de páginas independientes con navegación fluida

## 🏗️ Estructura del Proyecto

```
proyecto/
├── backend/                    # API REST en C#
│   ├── Controllers/
│   │   ├── TourismController.cs
│   │   ├── HotelsController.cs
│   │   ├── RestaurantsController.cs
│   │   ├── TransportationController.cs
│   │   └── CartController.cs   # Controlador del carrito
│   ├── Models/
│   │   ├── TouristPlace.cs
│   │   ├── CityInfo.cs
│   │   ├── Hotel.cs
│   │   ├── Restaurant.cs
│   │   ├── Transportation.cs
│   │   ├── Cart.cs             # Modelo del carrito
│   │   └── CartItem.cs         # Modelo de items del carrito
│   ├── Services/
│   │   ├── TouristService.cs
│   │   └── CartService.cs      # Servicio del carrito
│   ├── Program.cs
│   └── OrtegaTourism.csproj
├── frontend/                   # Frontend multi-página
│   ├── index.html              # Página principal completa (all-in-one)
│   ├── sobre-ortega.html       # Información del municipio
│   ├── lugares.html            # Lugares turísticos
│   ├── hoteles.html            # Alojamiento
│   ├── restaurantes.html       # Gastronomía
│   ├── transporte.html         # Opciones de transporte
│   ├── carrito.html            # Carrito de itinerario
│   ├── styles.css              # Estilos globales
│   ├── script.js               # Script principal (no usado)
│   ├── index-script.js         # Script para página principal
│   ├── about-script.js         # Script para sobre-ortega
│   ├── places-script.js        # Script para lugares
│   ├── hotels-script.js        # Script para hoteles
│   ├── restaurants-script.js   # Script para restaurantes
│   ├── transport-script.js     # Script para transporte
│   └── cart-script.js          # Script para carrito
└── README.md
```

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) - **IMPORTANTE**: Debes instalar el .NET SDK para ejecutar el backend
- Un navegador web moderno
- Un servidor web local (opcional, para servir archivos estáticos)

### Instalación de .NET SDK

Si no tienes .NET SDK instalado:

1. Visita: https://dotnet.microsoft.com/download/dotnet/8.0
2. Descarga el instalador para tu sistema operativo (Windows, macOS, Linux)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo una terminal y ejecutando:
   ```bash
   dotnet --version
   ```
   Deberías ver algo como: `8.0.xxx`

### 1. Ejecutar el Backend

1. Navega al directorio del backend:
   ```bash
   cd proyecto/backend
   ```

2. Restaura las dependencias:
   ```bash
   dotnet restore
   ```

3. Ejecuta la aplicación:
   ```bash
   dotnet run
   ```

4. El servidor estará disponible en: `http://localhost:5000`

### 2. Ejecutar el Frontend

#### Opción A: Servidor HTTP Simple (Recomendado)

Si tienes Python instalado:
```bash
cd proyecto/frontend
# Python 3
python -m http.server 8080
# O Python 2
python -m SimpleHTTPServer 8080
```

Si tienes Node.js instalado:
```bash
cd proyecto/frontend
npx http-server -p 8080
```

#### Opción B: Abrir directamente en el navegador

1. Navega al directorio `proyecto/frontend`
2. Abre el archivo `index.html` directamente en tu navegador

**Nota**: Algunos navegadores pueden bloquear las peticiones CORS cuando se abre el archivo directamente. Se recomienda usar un servidor HTTP local.

### 3. Acceder a la Aplicación

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:5000/api/tourism`

## 📋 Endpoints de la API

### Información de la Ciudad
- `GET /api/tourism/city-info` - Obtiene información general de Ortega

### Lugares Turísticos
- `GET /api/tourism/places` - Obtiene todos los lugares turísticos
- `GET /api/tourism/places/{id}` - Obtiene un lugar específico por ID
- `GET /api/tourism/places/category/{category}` - Obtiene lugares por categoría
- `GET /api/tourism/categories` - Obtiene todas las categorías disponibles

### Hoteles
- `GET /api/hotels` - Obtiene todos los hoteles
- `GET /api/hotels/{id}` - Obtiene un hotel específico por ID

### Restaurantes
- `GET /api/restaurants` - Obtiene todos los restaurantes
- `GET /api/restaurants/{id}` - Obtiene un restaurante específico por ID
- `GET /api/restaurants/cuisine/{cuisineType}` - Obtiene restaurantes por tipo de cocina
- `GET /api/restaurants/cuisine-types` - Obtiene todos los tipos de cocina

### Transporte
- `GET /api/transportation` - Obtiene todas las opciones de transporte
- `GET /api/transportation/{id}` - Obtiene una opción específica por ID
- `GET /api/transportation/type/{type}` - Obtiene transportes por tipo
- `GET /api/transportation/types` - Obtiene todos los tipos de transporte

### Carrito de Itinerario
- `POST /api/cart/create` - Crea un nuevo carrito
- `GET /api/cart/{cartId}` - Obtiene el carrito por ID
- `POST /api/cart/{cartId}/items` - Agrega un item al carrito
- `DELETE /api/cart/{cartId}/items/{itemId}` - Elimina un item del carrito
- `DELETE /api/cart/{cartId}` - Limpia todo el carrito

## 🎨 Funcionalidades del Frontend

### Páginas Independientes
- **Inicio (index.html)**: Página principal completa con todas las secciones integradas:
  - Hero section con bienvenida
  - Sección de lugares turísticos con tarjetas
  - Sección de hoteles con precios y calificaciones
  - Sección de restaurantes con tipos de cocina
  - Sección de transporte con opciones de movilidad
  - Sección de itinerario integrada para ver y gestionar selecciones
- **Sobre Ortega (sobre-ortega.html)**: Información completa y detallada del municipio
- **Lugares Turísticos (lugares.html)**: Catálogo de sitios turísticos con filtros
- **Hoteles (hoteles.html)**: Opciones de alojamiento disponibles
- **Restaurantes (restaurantes.html)**: Guía gastronómica con filtros por tipo de cocina
- **Transporte (transporte.html)**: Opciones de transporte con filtros por tipo
- **Mi Itinerario (carrito.html)**: Carrito personalizado con elementos seleccionados

### Características Interactivas
- **Navegación multi-página**: Sistema de navegación entre páginas independientes
- **Carrito de Itinerario**: Agregar lugares, hoteles, restaurantes y transporte a un itinerario personalizado
- **Contador de Items**: Visualización en tiempo real del número de elementos en el carrito
- **Gestión de Carrito**: Eliminar elementos individuales o limpiar todo el carrito
- **Compartir Itinerario**: Funcionalidad para compartir el itinerario creado
- **Filtros dinámicos**: Por categoría (lugares), tipo de cocina (restaurantes), tipo de transporte
- **Modales informativos**: Vista detallada de cada elemento con información completa
- **Diseño responsive**: Adaptado para móviles, tablets y desktop
- **Manejo inteligente de errores**: Mensajes informativos en lugar de errores permanentes

## 🛒 Sistema de Carrito de Itinerario

### Funcionalidades del Carrito
- **Agregar Elementos**: Botones "Agregar al Itinerario" en todas las páginas de contenido
- **Visualización Organizada**: Items organizados por categorías (Lugares, Hoteles, Restaurantes, Transporte)
- **Gestión Completa**: Eliminar elementos individuales o limpiar todo el carrito
- **Contador en Tiempo Real**: Visualización del número de items en la navegación
- **Compartir Itinerario**: Funcionalidad para compartir el itinerario via texto o redes sociales
- **Persistencia Local**: El carrito se mantiene entre sesiones usando localStorage
- **Cálculo de Costos**: Estimación automática del costo total del itinerario

### Tipos de Elementos en el Carrito
1. **Lugares Turísticos**: Gratuitos, incluyen actividades y horarios
2. **Hoteles**: Con precio por noche y servicios incluidos
3. **Restaurantes**: Con precio estimado por persona y especialidades
4. **Transporte**: Con precios específicos y rutas detalladas

### Uso del Carrito
1. Navega por las diferentes secciones (Lugares, Hoteles, Restaurantes, Transporte)
2. Haz clic en "🛒 Agregar al Itinerario" en los elementos que te interesen
3. Ve el contador actualizarse en la navegación
4. Visita "Mi Itinerario" para ver tu selección completa
5. Gestiona tu itinerario eliminando elementos o compartiéndolo

## 🗺️ Contenido Auténtico de Ortega, Tolima

### Lugares Turísticos Reales (7 sitios)
**🌿 Naturales:**
1. **Cerro de los Abechuchos** - Senderismo y vistas panorámicas del municipio
2. **Laguna de Ortega** - Espacio natural rodeado de vegetación para descanso
3. **Ríos y Quebradas Cercanas** - Caminatas ecológicas y paseos recreativos

**🏛️ Culturales e Históricos:**
4. **Parque Principal de Ortega** - Punto central rodeado de comercio local
5. **Iglesia Principal de Ortega** - Construcción tradicional con valor histórico
6. **Tumba de Manuel Quintín Lame Chantre** - Sitio histórico de memoria indígena

**🎉 Eventos:**
7. **Feria Agroindustrial y Agropecuaria** - Evento anual en junio con cultura campesina

### Hoteles Reales (6 opciones)
1. **Hotel Calle Real** - Ubicado en el centro, cómodo y accesible
2. **Hotel Loren's** - Buena atención y precios razonables
3. **Hotel Casa Vieja** - Opción económica para visitantes
4. **La Posada del Coyote** - Ambiente tranquilo y acogedor
5. **Hotel Villa Valeria** - Hospedaje sencillo y funcional
6. **Gran Hotel Hospedaje** - Alternativa práctica para turistas

### Restaurantes Reales (7 opciones)
1. **Blue Martini Ortega** - Variedad de platos y buen ambiente
2. **Restaurante La Gran Vía** - Comida tradicional y precios económicos
3. **Las Delicias de Lorena** - Comida típica y casera
4. **Sari Pizza** - Pizzería local
5. **Restaurante Wimpy** - Opción económica y popular
6. **Casa China Pekín** - Comida oriental
7. **Asadero Brasa Roja** - Carnes asadas y platos rápidos

### 🍛 Comida Típica Tolimense
- **Lechona tolimense** - Cerdo relleno de arroz y especias
- **Tamal tolimense** - Masa de maíz con carne y verduras
- **Sancocho de gallina** - Sopa tradicional con gallina criolla
- **Chicha y mazato** - Bebidas tradicionales fermentadas

### Transporte Real (6 opciones)
1. **Desde Ibagué** - 1h 45min por carretera
2. **Desde Bogotá** - 5 horas por carretera
3. **Transporte Público Local** - Buses urbanos
4. **Taxis Ortega** - Servicio 24 horas
5. **Mototaxis** - Transporte ágil y económico
6. **Transporte Particular** - Para zonas rurales

## 🎨 Paleta de Colores

- **Verde Principal**: `#2d5a27`
- **Verde Secundario**: `#4a7c59`
- **Verde Claro**: `#a8d5a8`
- **Fondo Verde**: `#f8fff8`
- **Fondo Sección**: `#f0f8f0`
- **Blanco**: `#ffffff`

## 🔧 Configuración de Desarrollo

### Backend
- Puerto por defecto: `5000`
- CORS habilitado para desarrollo
- Logging configurado para desarrollo

### Frontend
- Puerto recomendado: `8080`
- Páginas independientes con navegación fluida
- Sistema de carrito con almacenamiento local
- Scripts específicos para cada página:
  - `about-script.js` para información de la ciudad
  - `places-script.js` para lugares turísticos
  - `hotels-script.js` para hoteles
  - `restaurants-script.js` para restaurantes
  - `transport-script.js` para transporte
  - `cart-script.js` para funcionalidad del carrito

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, tablet y móvil
- **Resoluciones**: Responsive desde 320px hasta 1920px+

## 🚨 Solución de Problemas

### Error de CORS
Si encuentras errores de CORS:
1. Asegúrate de que el backend esté ejecutándose en el puerto 5000
2. Usa un servidor HTTP local para el frontend (no abras el HTML directamente)
3. Verifica que la URL de la API en `script.js` sea correcta

### El frontend no carga datos
1. Verifica que el backend esté ejecutándose
2. Abre las herramientas de desarrollador del navegador (F12)
3. Revisa la consola para errores de red
4. Confirma que las URLs de la API sean correctas

### Problemas de estilo
1. Asegúrate de que `styles.css` esté en el mismo directorio que `index.html`
2. Verifica que no haya errores de sintaxis CSS en la consola

## 🔮 Futuras Mejoras

- **Sistema de Reservas**: Integración con sistemas de reservas reales para hoteles y restaurantes
- **Persistencia de Datos**: Base de datos para almacenar itinerarios de usuarios
- **Autenticación de Usuarios**: Sistema de login para guardar itinerarios personalizados
- **Integración con mapas interactivos** para ubicación de lugares
- **Sistema de comentarios y calificaciones** de visitantes
- **Galería de imágenes expandida** para cada lugar
- **Información meteorológica** en tiempo real
- **Integración con redes sociales** para compartir experiencias
- **Versión multiidioma** (inglés, francés)
- **Aplicación móvil nativa**
- **Realidad aumentada** para tours virtuales
- **Notificaciones push** para ofertas y eventos especiales

## 📄 Licencia

Este proyecto es un MVP educativo para promover el turismo en Ortega, Tolima.

---

**¡Disfruta explorando Ortega! 🌿**