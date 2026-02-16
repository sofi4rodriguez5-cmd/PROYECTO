# 🚀 Guía Rápida - Descubre Ortega

## ✅ Estado del Proyecto

El proyecto está **COMPLETO** y listo para usar. La página principal (index.html) ha sido completamente rediseñada siguiendo los estándares de sitios turísticos profesionales como Visit Colombia.

## 📋 Lo que se ha completado

### ✨ Nueva Página Principal (index.html)
- ✅ Header con navegación completa y contador de carrito
- ✅ Hero section con llamados a la acción
- ✅ Sección de Lugares Turísticos con tarjetas y botones
- ✅ Sección de Hoteles con precios y calificaciones
- ✅ Sección de Restaurantes con tipos de cocina
- ✅ Sección de Transporte con opciones de movilidad
- ✅ Sección de Itinerario integrada
- ✅ Footer profesional
- ✅ Diseño responsive (móvil, tablet, desktop)

### 🎨 Estilos CSS Completos
- ✅ Paleta de colores verde (#2E7D32, #4CAF50)
- ✅ Cards con bordes redondeados y sombras
- ✅ Grid layouts responsive
- ✅ Botones con efectos hover
- ✅ Animaciones suaves
- ✅ Diseño profesional y moderno

### 💻 JavaScript Funcional
- ✅ `index-script.js` - Funcionalidad de la página principal
- ✅ `cart-script.js` - Sistema de carrito completo
- ✅ Integración con API del backend
- ✅ Scroll suave entre secciones
- ✅ Notificaciones visuales
- ✅ Gestión de itinerario

## 🎯 Cómo Usar el Proyecto

### Paso 1: Instalar .NET SDK (Si no lo tienes)

**IMPORTANTE**: El backend requiere .NET SDK 8.0 o superior.

1. Descarga desde: https://dotnet.microsoft.com/download/dotnet/8.0
2. Instala siguiendo las instrucciones del instalador
3. Verifica la instalación:
   ```bash
   dotnet --version
   ```

### Paso 2: Ejecutar el Backend

Abre una terminal y ejecuta:

```bash
cd proyecto/backend
dotnet restore
dotnet run
```

El backend estará disponible en: `http://localhost:5000`

### Paso 3: Ejecutar el Frontend

Abre **OTRA** terminal (deja el backend corriendo) y ejecuta:

**Opción A - Con Python:**
```bash
cd proyecto/frontend
python -m http.server 8080
```

**Opción B - Con Node.js:**
```bash
cd proyecto/frontend
npx http-server -p 8080
```

**Opción C - Abrir directamente:**
- Navega a `proyecto/frontend`
- Abre `index.html` en tu navegador
- (Puede tener problemas de CORS, mejor usar opción A o B)

### Paso 4: Abrir en el Navegador

Visita: `http://localhost:8080`

## 🎨 Características de la Nueva Página Principal

### 1. Hero Section
- Título grande: "Bienvenido a Ortega"
- Subtítulo descriptivo
- Dos botones de acción: "Explorar Lugares" y "Ver Alojamiento"
- Fondo verde degradado

### 2. Sección de Lugares Turísticos
- 4 tarjetas con imágenes reales
- Cerro de los Abechuchos
- Laguna de Ortega
- Parque Principal
- Iglesia Principal
- Botón "Agregar al itinerario" en cada tarjeta

### 3. Sección de Hoteles
- 3 tarjetas con información completa
- Calificación con estrellas
- Precio por noche
- Botón para agregar al itinerario

### 4. Sección de Restaurantes
- 3 tarjetas con detalles
- Tipo de cocina (badge)
- Calificación numérica
- Botón para agregar al itinerario

### 5. Sección de Transporte
- 3 opciones de movilidad
- Tipo de transporte (badge)
- Precio del servicio
- Botón para agregar al itinerario

### 6. Sección de Itinerario
- Resumen de elementos seleccionados
- Contador de items
- Costo estimado total
- Botones para limpiar y compartir
- Lista organizada por categorías

## 🛒 Sistema de Carrito

### Cómo Funciona
1. Navega por las secciones (Lugares, Hoteles, Restaurantes, Transporte)
2. Haz clic en "Agregar al itinerario" en los elementos que te interesen
3. El contador en el header se actualiza automáticamente
4. Desplázate a la sección "Mi Itinerario" para ver tu selección
5. Puedes eliminar elementos o limpiar todo el itinerario
6. Comparte tu itinerario con el botón "Compartir"

### Persistencia
- El carrito se guarda en localStorage
- Se mantiene entre sesiones del navegador
- Se sincroniza con el backend

## 📱 Navegación

El header tiene enlaces a:
- **Inicio** - Vuelve al top de la página
- **Lugares** - Scroll a sección de lugares turísticos
- **Hoteles** - Scroll a sección de hoteles
- **Restaurantes** - Scroll a sección de restaurantes
- **Transporte** - Scroll a sección de transporte
- **Mi Itinerario** - Scroll a sección de itinerario
- **🛒 Mi Itinerario (contador)** - Muestra número de items

## 🎨 Diseño Responsive

### Desktop (> 768px)
- Grid de 3 columnas para tarjetas
- Navegación horizontal completa
- Espaciado amplio

### Tablet (768px - 480px)
- Grid de 2 columnas
- Navegación adaptada
- Espaciado medio

### Móvil (< 480px)
- Grid de 1 columna
- Navegación vertical
- Espaciado compacto

## 🔧 Archivos Importantes

### HTML
- `index.html` - Página principal completa (ALL-IN-ONE)

### CSS
- `styles.css` - Todos los estilos del proyecto

### JavaScript
- `index-script.js` - Funcionalidad de la página principal
- `cart-script.js` - Sistema de carrito y API

### Backend
- `Program.cs` - Configuración del servidor
- `TouristService.cs` - Datos de Ortega
- `CartService.cs` - Lógica del carrito

## ✨ Características Visuales

### Colores
- Verde principal: `#2E7D32`
- Verde secundario: `#4CAF50`
- Fondo claro: `#F1F8F4`
- Blanco: `#FFFFFF`

### Efectos
- Hover en tarjetas: elevación y sombra
- Hover en botones: cambio de color y elevación
- Transiciones suaves (0.3s)
- Animaciones de entrada (fadeInUp)

### Tipografía
- Fuente: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Títulos: Bold, tamaños grandes
- Texto: Regular, line-height 1.6

## 🚨 Solución de Problemas

### El backend no inicia
**Error**: "No .NET SDKs were found"
**Solución**: Instala .NET SDK 8.0 desde https://dotnet.microsoft.com/download

### El frontend no carga datos
**Problema**: Las tarjetas aparecen vacías
**Solución**: 
1. Verifica que el backend esté corriendo en puerto 5000
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que la URL de la API sea correcta en los scripts

### Error de CORS
**Problema**: "Access to fetch has been blocked by CORS policy"
**Solución**: 
1. No abras el HTML directamente, usa un servidor HTTP
2. Asegúrate de que el backend esté corriendo
3. Verifica que el backend tenga CORS habilitado

### El carrito no funciona
**Problema**: Los botones no agregan elementos
**Solución**:
1. Verifica que `cart-script.js` esté cargado
2. Abre la consola y busca errores de JavaScript
3. Verifica que el backend esté respondiendo en `/api/cart`

## 📞 Contacto y Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que ambos servidores estén corriendo
3. Lee los mensajes de error completos
4. Consulta el README.md para más detalles

## 🎉 ¡Listo para Usar!

El proyecto está completamente funcional y listo para demostración. Todos los archivos están en su lugar y el diseño cumple con los estándares de sitios turísticos profesionales.

**¡Disfruta explorando Ortega! 🌿**
