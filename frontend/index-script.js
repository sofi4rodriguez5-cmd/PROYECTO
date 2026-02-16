// Sistema de autenticación
const users = {
    'usuario': { password: '1234', role: 'user' },
    'admin': { password: 'admin', role: 'admin' }
};

let currentUser = null;

// Guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('systemUsers', JSON.stringify(users));
}

// Cargar usuarios desde localStorage
function loadUsers() {
    const saved = localStorage.getItem('systemUsers');
    if (saved) {
        const loadedUsers = JSON.parse(saved);
        Object.assign(users, loadedUsers);
    }
}

// Carrito en memoria
let cart = {
    items: [],
    total: 0
};

// Datos de lugares
const lugares = [
    {
        id: 1,
        type: 'place',
        name: 'Cerro de los Abechuchos',
        description: 'Majestuoso cerro ideal para senderismo y vistas panorámicas del municipio.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 2,
        type: 'place',
        name: 'Laguna de Ortega',
        description: 'Hermosa laguna natural rodeada de vegetación tropical perfecta para relajarse.',
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 3,
        type: 'place',
        name: 'Parque Principal de Ortega',
        description: 'Corazón social y cultural del municipio con arquitectura colonial.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 4,
        type: 'place',
        name: 'Iglesia Principal',
        description: 'Histórica iglesia colonial con gran valor cultural e histórico.',
        image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 5,
        type: 'place',
        name: 'Ríos y Quebradas de Ortega',
        description: 'Red de ríos cristalinos perfectos para ecoturismo y deportes acuáticos.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 6,
        type: 'place',
        name: 'Mirador Natural El Balcón',
        description: 'Punto panorámico con vistas espectaculares del valle y las montañas.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 7,
        type: 'place',
        name: 'Cascada La Esperanza',
        description: 'Hermosa cascada escondida en medio del bosque tropical.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&h=600&fit=crop',
        price: 0
    },
    {
        id: 8,
        type: 'place',
        name: 'Sendero Ecológico Los Guaduales',
        description: 'Camino natural entre guaduales con flora y fauna nativa.',
        image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop',
        price: 0
    }
];

// Datos de hoteles
const hoteles = [
    {
        id: 1,
        type: 'hotel',
        name: 'Hotel Calle Real',
        description: 'Elegante hotel en el corazón de Ortega con comodidad moderna.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        rating: '⭐⭐⭐⭐',
        price: 120000
    },
    {
        id: 2,
        type: 'hotel',
        name: 'Hotel Loren\'s',
        description: 'Acogedor hotel familiar con hospitalidad característica de Ortega.',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
        rating: '⭐⭐⭐',
        price: 85000
    },
    {
        id: 3,
        type: 'hotel',
        name: 'La Posada del Coyote',
        description: 'Encantadora posada rural en contacto directo con la naturaleza.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
        rating: '⭐⭐⭐',
        price: 95000
    },
    {
        id: 4,
        type: 'hotel',
        name: 'Hotel Villa Valeria',
        description: 'Moderno hotel con spa, gimnasio y piscina para una estadía completa.',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
        rating: '⭐⭐⭐⭐',
        price: 110000
    },
    {
        id: 5,
        type: 'hotel',
        name: 'Hospedaje Casa Vieja',
        description: 'Opción económica con ambiente tradicional y atención personalizada.',
        image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop',
        rating: '⭐⭐⭐',
        price: 65000
    },
    {
        id: 6,
        type: 'hotel',
        name: 'Finca Hotel El Descanso',
        description: 'Hotel campestre con amplios jardines y actividades al aire libre.',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
        rating: '⭐⭐⭐⭐',
        price: 130000
    }
];

// Datos de restaurantes
const restaurantes = [
    { id: 1, type: 'restaurant', name: 'Blue Martini Ortega', description: 'Restaurante sofisticado con cocina internacional y sabores tolimenses.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', badge: 'Internacional', rating: '⭐⭐⭐⭐ 4.5', schedule: '⏰ Horario: 12:00 PM - 10:00 PM', price: 50000 },
    { id: 2, type: 'restaurant', name: 'Restaurante La Gran Vía', description: 'Auténtica comida tradicional tolimense con recetas ancestrales.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop', badge: 'Tradicional Tolimense', rating: '⭐⭐⭐⭐⭐ 4.8', schedule: '⏰ Horario: 7:00 AM - 8:00 PM', price: 25000 },
    { id: 3, type: 'restaurant', name: 'Las Delicias de Lorena', description: 'Restaurante casero con la auténtica sazón de la cocina tolimense.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', badge: 'Comida Casera', rating: '⭐⭐⭐⭐ 4.6', schedule: '⏰ Horario: 6:00 AM - 9:00 PM', price: 20000 },
    { id: 4, type: 'restaurant', name: 'Sari Pizza', description: 'Pizzería local con variedad de pizzas artesanales y comida rápida.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop', badge: 'Comida Rápida', rating: '⭐⭐⭐⭐ 4.3', schedule: '⏰ Horario: 11:00 AM - 10:00 PM', price: 30000 },
    { id: 5, type: 'restaurant', name: 'Asadero Brasa Roja', description: 'Especialistas en carnes asadas y parrillas con los mejores cortes.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop', badge: 'Parrilla', rating: '⭐⭐⭐⭐ 4.4', schedule: '⏰ Horario: 5:00 PM - 11:00 PM', price: 45000 },
    { id: 6, type: 'restaurant', name: 'Casa China Pekín', description: 'Restaurante de comida china con platos tradicionales y fusión.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop', badge: 'Comida Oriental', rating: '⭐⭐⭐⭐ 4.2', schedule: '⏰ Horario: 12:00 PM - 9:00 PM', price: 35000 },
    { id: 7, type: 'restaurant', name: 'Restaurante Wimpy', description: 'Opción económica y popular con menú variado y precios accesibles.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', badge: 'Económico', rating: '⭐⭐⭐ 4.0', schedule: '⏰ Horario: 7:00 AM - 8:00 PM', price: 15000 }
];

// Datos de transporte
const transporte = {
    intermunicipal: [
        { id: 1, type: 'transport', category: 'intermunicipal', name: 'Expreso Tolima', description: 'Servicio cómodo y seguro desde Ibagué con salidas cada 2 horas.', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', badge: 'Bus Intermunicipal', route: '📍 Ruta: Ibagué - Ortega (1h 45min)', price: 15000 },
        { id: 2, type: 'transport', category: 'intermunicipal', name: 'Flota Magdalena', description: 'Conexión directa desde Bogotá con servicio ejecutivo y aire acondicionado.', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop', badge: 'Bus Intermunicipal', route: '📍 Ruta: Bogotá - Ortega (5 horas)', price: 18000 },
        { id: 3, type: 'transport', category: 'intermunicipal', name: 'Coomotor Tolima', description: 'Servicio económico con múltiples horarios desde la terminal de Ibagué.', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', badge: 'Bus Intermunicipal', route: '📍 Ruta: Ibagué - Ortega (1h 50min)', price: 14000 }
    ],
    local: [
        { id: 4, type: 'transport', category: 'local', name: 'Taxis Ortega 24 Horas', description: 'Servicio de taxi disponible 24 horas para traslados en el municipio.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop', badge: 'Taxi Local', route: '📍 Cobertura: Casco urbano y veredas', price: 8000 },
        { id: 5, type: 'transport', category: 'local', name: 'Mototaxis El Rápido', description: 'Transporte ágil y económico ideal para trayectos cortos en el municipio.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', badge: 'Mototaxi', route: '📍 Cobertura: Centro y barrios cercanos', price: 5000 },
        { id: 6, type: 'transport', category: 'local', name: 'Transporte Público Urbano', description: 'Buses urbanos que recorren las principales rutas del municipio.', image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop', badge: 'Bus Local', route: '📍 Cobertura: Rutas urbanas principales', price: 2000 }
    ],
    particular: [
        { id: 7, type: 'transport', category: 'particular', name: 'Alquiler de Vehículos', description: 'Servicio de alquiler de vehículos con o sin conductor para recorrer la región.', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop', badge: 'Vehículo Particular', route: '📍 Disponible: Carros, camionetas 4x4', price: 100000 },
        { id: 8, type: 'transport', category: 'particular', name: 'Transporte Rural Campesino', description: 'Servicio especializado para acceso a fincas, veredas y sitios turísticos rurales.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', badge: 'Transporte Rural', route: '📍 Cobertura: Veredas y zonas rurales', price: 35000 },
        { id: 9, type: 'transport', category: 'particular', name: 'Tours Privados con Guía', description: 'Tours personalizados con guía local y transporte incluido a sitios turísticos.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop', badge: 'Tour Privado', route: '📍 Incluye: Transporte + Guía + Seguro', price: 150000 }
    ]
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    checkSession();
    setupLoginForm();
    setupNavigation();
    setupLogout();
    setupDropdown();
    loadAllContent();
    loadPaymentMethods();
    setupPaymentForm();
    loadCalendarEvents();
});

// Verificar sesión
function checkSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
}

// Configurar formulario de login
function setupLoginForm() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (users[username] && users[username].password === password) {
                currentUser = { username, role: users[username].role };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showNotification('Inicio de sesión exitoso', 'success');
                setTimeout(() => showMainApp(), 500);
            } else {
                showNotification('Usuario o contraseña incorrectos', 'error');
            }
        });
    }
}

// Mostrar aplicación principal
function showMainApp() {
    document.getElementById('view-login').classList.remove('active');
    document.getElementById('main-header').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    
    if (currentUser.role === 'admin') {
        document.getElementById('admin-menu-item').style.display = 'block';
        document.getElementById('admin-settings-item').style.display = 'block';
    }
    
    // Cargar configuraciones guardadas
    loadSettings();
    
    showView('inicio');
    updateCartDisplay();
}

// Configurar logout
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            currentUser = null;
            cart = { items: [], total: 0 };
            document.getElementById('main-header').style.display = 'none';
            document.getElementById('main-footer').style.display = 'none';
            document.getElementById('admin-menu-item').style.display = 'none';
            document.getElementById('admin-settings-item').style.display = 'none';
            document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
            document.getElementById('view-login').classList.add('active');
            document.getElementById('login-form').reset();
            showNotification('Sesión cerrada', 'info');
        });
    }
}

// Configurar dropdown de ajustes
function setupDropdown() {
    const toggle = document.getElementById('settings-dropdown-toggle');
    const dropdown = document.getElementById('settings-dropdown');
    
    if (toggle && dropdown) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) {
                dropdown.classList.remove('show');
            }
        });
        
        dropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                dropdown.classList.remove('show');
            });
        });
    }
}

// Sistema de navegación entre ventanas
function setupNavigation() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-view]');
        if (link) {
            e.preventDefault();
            const viewName = link.getAttribute('data-view');
            if (viewName) {
                showView(viewName);
            }
        }
    });
}

// Modificar showView para incluir ajustes
function showView(viewName) {
    if (viewName === 'admin' && currentUser.role !== 'admin') {
        showNotification('Acceso denegado', 'error');
        return;
    }
    
    if (viewName === 'ajustes-admin' && currentUser.role !== 'admin') {
        showNotification('Acceso denegado - Solo administradores', 'error');
        return;
    }
    
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-view') === viewName) {
            link.classList.add('active');
        }
    });
    
    if (viewName === 'carrito') {
        renderCart();
    } else if (viewName === 'admin') {
        updateAdminPanel();
    } else if (viewName === 'ajustes-usuario') {
        updateSettingsDisplay();
        loadSettings();
    } else if (viewName === 'ajustes-admin') {
        loadAdminSettings();
    }
}
function loadAllContent() {
    loadLugares();
    loadHoteles();
    loadRestaurantes();
    loadTransporte();
}

// Cargar lugares
function loadLugares() {
    const grid = document.getElementById('lugares-grid');
    if (grid) {
        grid.innerHTML = lugares.map(lugar => `
            <div class="card">
                <img src="${lugar.image}" alt="${lugar.name}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${lugar.name}</h3>
                    <p class="card-description">${lugar.description}</p>
                    <button class="btn btn-primary" onclick="addToCart('place', ${lugar.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Cargar hoteles
function loadHoteles() {
    const grid = document.getElementById('hoteles-grid');
    if (grid) {
        grid.innerHTML = hoteles.map(hotel => `
            <div class="card">
                <img src="${hotel.image}" alt="${hotel.name}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${hotel.name}</h3>
                    <div class="card-rating">${hotel.rating}</div>
                    <p class="card-price">$${hotel.price.toLocaleString()} / noche</p>
                    <p class="card-description">${hotel.description}</p>
                    <button class="btn btn-primary" onclick="addToCart('hotel', ${hotel.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Cargar restaurantes
function loadRestaurantes() {
    const grid = document.getElementById('restaurantes-grid');
    if (grid) {
        grid.innerHTML = restaurantes.map(rest => `
            <div class="card">
                <img src="${rest.image}" alt="${rest.name}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${rest.name}</h3>
                    <span class="card-badge">${rest.badge}</span>
                    <div class="card-rating">${rest.rating}</div>
                    <p class="card-description">${rest.description}</p>
                    <p class="card-schedule">${rest.schedule}</p>
                    <button class="btn btn-primary" onclick="addToCart('restaurant', ${rest.id})">
                        Ver detalles
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Cargar transporte
function loadTransporte() {
    const intermunicipalGrid = document.getElementById('transporte-intermunicipal-grid');
    const localGrid = document.getElementById('transporte-local-grid');
    const particularGrid = document.getElementById('transporte-particular-grid');
    
    if (intermunicipalGrid) intermunicipalGrid.innerHTML = transporte.intermunicipal.map(t => createTransportCard(t)).join('');
    if (localGrid) localGrid.innerHTML = transporte.local.map(t => createTransportCard(t)).join('');
    if (particularGrid) particularGrid.innerHTML = transporte.particular.map(t => createTransportCard(t)).join('');
}

function createTransportCard(transport) {
    return `
        <div class="card">
            <img src="${transport.image}" alt="${transport.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${transport.name}</h3>
                <span class="card-badge">${transport.badge}</span>
                <p class="card-price">$${transport.price.toLocaleString()}</p>
                <p class="card-description">${transport.description}</p>
                <p class="card-route">${transport.route}</p>
                <button class="btn btn-primary" onclick="addToCart('transport', ${transport.id})">
                    Seleccionar
                </button>
            </div>
        </div>
    `;
}

// Agregar al carrito
function addToCart(type, id) {
    let item = null;
    
    if (type === 'place') {
        item = lugares.find(l => l.id === id);
    } else if (type === 'hotel') {
        item = hoteles.find(h => h.id === id);
    } else if (type === 'restaurant') {
        item = restaurantes.find(r => r.id === id);
    } else if (type === 'transport') {
        const allTransport = [...transporte.intermunicipal, ...transporte.local, ...transporte.particular];
        item = allTransport.find(t => t.id === id);
    }
    
    if (item) {
        const exists = cart.items.find(i => i.type === type && i.id === id);
        if (exists) {
            showNotification('Este elemento ya está en tu carrito', 'warning');
            return;
        }
        
        cart.items.push({...item, type});
        cart.total += item.price || 0;
        updateCartDisplay();
        showNotification('Agregado al carrito exitosamente', 'success');
    }
}

// Eliminar del carrito
function removeFromCart(type, id) {
    const index = cart.items.findIndex(i => i.type === type && i.id === id);
    if (index !== -1) {
        cart.total -= cart.items[index].price || 0;
        cart.items.splice(index, 1);
        updateCartDisplay();
        renderCart();
        showNotification('Elemento eliminado del carrito', 'success');
    }
}

// Limpiar carrito
function clearCart() {
    if (cart.items.length === 0) {
        showNotification('El carrito ya está vacío', 'info');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart.items = [];
        cart.total = 0;
        updateCartDisplay();
        renderCart();
        showNotification('Carrito vaciado', 'success');
    }
}

// Compartir carrito
function shareCart() {
    if (cart.items.length === 0) {
        showNotification('No hay elementos para compartir', 'warning');
        return;
    }
    
    let text = '🌿 Mi Carrito de Viaje - Ortega, Tolima\n\n';
    const byType = { place: [], hotel: [], restaurant: [], transport: [] };
    cart.items.forEach(item => byType[item.type].push(item));
    
    if (byType.place.length > 0) {
        text += '🏞️ Lugares:\n';
        byType.place.forEach(i => text += `• ${i.name}\n`);
        text += '\n';
    }
    if (byType.hotel.length > 0) {
        text += '🏨 Hoteles:\n';
        byType.hotel.forEach(i => text += `• ${i.name} - $${i.price.toLocaleString()}\n`);
        text += '\n';
    }
    if (byType.restaurant.length > 0) {
        text += '🍽️ Restaurantes:\n';
        byType.restaurant.forEach(i => text += `• ${i.name}\n`);
        text += '\n';
    }
    if (byType.transport.length > 0) {
        text += '🚌 Transporte:\n';
        byType.transport.forEach(i => text += `• ${i.name} - $${i.price.toLocaleString()}\n`);
        text += '\n';
    }
    
    text += `💰 Total estimado: $${cart.total.toLocaleString()}`;
    
    if (navigator.share) {
        navigator.share({ title: 'Mi Carrito - Ortega', text: text }).catch(() => copyToClipboard(text));
    } else {
        copyToClipboard(text);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => showNotification('Copiado al portapapeles', 'success'));
    } else {
        showNotification('No se pudo copiar', 'error');
    }
}

// Actualizar display del carrito
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    
    if (cartCount) cartCount.textContent = cart.items.length;
    if (totalItems) totalItems.textContent = cart.items.length;
    if (totalPrice) totalPrice.textContent = `$${cart.total.toLocaleString()}`;
}

// Renderizar carrito
function renderCart() {
    const content = document.getElementById('cart-content');
    if (!content) return;
    
    if (cart.items.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <p>🛒 Tu carrito está vacío</p>
                <p>Comienza a agregar lugares, hoteles, restaurantes y opciones de transporte.</p>
            </div>
        `;
        return;
    }
    
    const byType = { place: [], hotel: [], restaurant: [], transport: [] };
    cart.items.forEach(item => byType[item.type].push(item));
    
    let html = '';
    const typeNames = {
        place: '🏞️ Lugares Turísticos',
        hotel: '🏨 Hoteles',
        restaurant: '🍽️ Restaurantes',
        transport: '🚌 Transporte'
    };
    
    Object.keys(byType).forEach(type => {
        if (byType[type].length > 0) {
            html += `<div class="cart-category"><h3 class="category-title">${typeNames[type]}</h3><div class="cart-items">`;
            byType[type].forEach(item => {
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-content">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p class="cart-item-description">${item.description}</p>
                            ${item.price > 0 ? `<p class="cart-item-price">$${item.price.toLocaleString()}</p>` : '<p class="cart-item-price">Gratuito</p>'}
                        </div>
                        <button class="btn-remove-cart" onclick="removeFromCart('${type}', ${item.id})">🗑️</button>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
    });
    
    content.innerHTML = html;
}

// Actualizar panel de admin
function updateAdminPanel() {
    const adminCartCount = document.getElementById('admin-cart-count');
    const adminCartValue = document.getElementById('admin-cart-value');
    
    if (adminCartCount) adminCartCount.textContent = cart.items.length;
    if (adminCartValue) adminCartValue.textContent = `$${cart.total.toLocaleString()}`;
}

// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        background: ${colors[type]};
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Funciones de Ajustes
let appSettings = {
    theme: 'light',
    showImages: true
};

// Cargar configuración guardada
function loadSettings() {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
        appSettings = JSON.parse(saved);
        applySettings();
    }
}

// Aplicar configuración
function applySettings() {
    if (appSettings.theme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeText = document.getElementById('theme-text');
        if (themeText) themeText.textContent = 'Cambiar a Claro';
    }
    
    if (!appSettings.showImages) {
        document.body.classList.add('hide-images');
        const imagesText = document.getElementById('images-text');
        if (imagesText) imagesText.textContent = 'Mostrar Imágenes';
    }
}

// Guardar configuración
function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
}

// Cambiar tema
function toggleTheme() {
    appSettings.theme = appSettings.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    
    const themeText = document.getElementById('theme-text');
    if (themeText) {
        themeText.textContent = appSettings.theme === 'dark' ? 'Cambiar a Claro' : 'Cambiar a Oscuro';
    }
    
    saveSettings();
    showNotification(`Tema ${appSettings.theme === 'dark' ? 'oscuro' : 'claro'} activado`, 'success');
}

// Mostrar/ocultar imágenes
function toggleImages() {
    appSettings.showImages = !appSettings.showImages;
    document.body.classList.toggle('hide-images');
    
    const imagesText = document.getElementById('images-text');
    if (imagesText) {
        imagesText.textContent = appSettings.showImages ? 'Ocultar Imágenes' : 'Mostrar Imágenes';
    }
    
    saveSettings();
    showNotification(`Imágenes ${appSettings.showImages ? 'mostradas' : 'ocultadas'}`, 'success');
}

// Limpiar carrito desde ajustes
function clearCartFromSettings() {
    if (cart.items.length === 0) {
        showNotification('El carrito ya está vacío', 'info');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart.items = [];
        cart.total = 0;
        updateCartDisplay();
        updateSettingsDisplay();
        showNotification('Carrito vaciado desde ajustes', 'success');
    }
}

// Cerrar sesión desde ajustes
function logoutFromSettings() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        cart = { items: [], total: 0 };
        document.getElementById('main-header').style.display = 'none';
        document.getElementById('main-footer').style.display = 'none';
        document.getElementById('admin-menu-item').style.display = 'none';
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        document.getElementById('view-login').classList.add('active');
        document.getElementById('login-form').reset();
        showNotification('Sesión cerrada', 'info');
    }
}

// Restablecer configuración
function resetSettings() {
    if (confirm('¿Estás seguro de que quieres restablecer la configuración?')) {
        appSettings = {
            theme: 'light',
            showImages: true
        };
        document.body.classList.remove('dark-theme', 'hide-images');
        saveSettings();
        
        const themeText = document.getElementById('theme-text');
        const imagesText = document.getElementById('images-text');
        if (themeText) themeText.textContent = 'Cambiar a Oscuro';
        if (imagesText) imagesText.textContent = 'Ocultar Imágenes';
        
        showNotification('Configuración restablecida', 'success');
    }
}

// Limpiar datos locales
function clearLocalData() {
    if (confirm('¿Estás seguro? Esto eliminará toda la información guardada incluyendo tu sesión.')) {
        localStorage.clear();
        showNotification('Datos locales eliminados. Recargando...', 'info');
        setTimeout(() => location.reload(), 1500);
    }
}

// Actualizar display de ajustes
function updateSettingsDisplay() {
    const settingsCartCount = document.getElementById('settings-cart-count');
    const settingsCartTotal = document.getElementById('settings-cart-total');
    const currentUserDisplay = document.getElementById('current-user-display');
    
    if (settingsCartCount) settingsCartCount.textContent = cart.items.length;
    if (settingsCartTotal) settingsCartTotal.textContent = `$${cart.total.toLocaleString()}`;
    if (currentUserDisplay && currentUser) {
        currentUserDisplay.textContent = `${currentUser.username} (${currentUser.role === 'admin' ? 'Administrador' : 'Usuario'})`;
    }
    
    loadPaymentMethods();
    renderCalendar();
}

// Gestión de Usuarios (Admin)
function loadAdminSettings() {
    renderUsersList();
    updateUserStats();
    setupAddUserForm();
    renderContentList('lugares');
}

function renderUsersList() {
    const usersList = document.getElementById('users-list');
    if (!usersList) return;
    
    let html = '';
    Object.keys(users).forEach(username => {
        const user = users[username];
        const isCurrentUser = currentUser && currentUser.username === username;
        
        html += `
            <div class="user-item">
                <div class="user-info">
                    <span class="user-icon">${user.role === 'admin' ? '🛠️' : '👤'}</span>
                    <div class="user-details">
                        <strong>${username}</strong>
                        <span class="user-role">${user.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
                        ${isCurrentUser ? '<span class="current-user-badge">Tú</span>' : ''}
                    </div>
                </div>
                <div class="user-actions">
                    ${!isCurrentUser ? `
                        <button class="btn-small btn-secondary" onclick="toggleUserRole('${username}')">
                            Cambiar Rol
                        </button>
                        <button class="btn-small btn-danger" onclick="deleteUser('${username}')">
                            🗑️
                        </button>
                    ` : '<span class="text-muted">Usuario actual</span>'}
                </div>
            </div>
        `;
    });
    
    usersList.innerHTML = html;
}

function setupAddUserForm() {
    const form = document.getElementById('add-user-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            addNewUser();
        };
    }
}

function addNewUser() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;
    
    if (!username || !password) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }
    
    if (users[username]) {
        showNotification('El usuario ya existe', 'error');
        return;
    }
    
    users[username] = { password, role };
    saveUsers();
    renderUsersList();
    updateUserStats();
    document.getElementById('add-user-form').reset();
    showNotification(`Usuario "${username}" agregado exitosamente`, 'success');
}

function deleteUser(username) {
    if (currentUser.username === username) {
        showNotification('No puedes eliminar tu propio usuario', 'error');
        return;
    }
    
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario "${username}"?`)) {
        delete users[username];
        saveUsers();
        renderUsersList();
        updateUserStats();
        showNotification(`Usuario "${username}" eliminado`, 'success');
    }
}

function toggleUserRole(username) {
    if (currentUser.username === username) {
        showNotification('No puedes cambiar tu propio rol', 'error');
        return;
    }
    
    const user = users[username];
    user.role = user.role === 'admin' ? 'user' : 'admin';
    saveUsers();
    renderUsersList();
    updateUserStats();
    showNotification(`Rol de "${username}" cambiado a ${user.role === 'admin' ? 'Administrador' : 'Usuario'}`, 'success');
}

function updateUserStats() {
    const totalUsers = Object.keys(users).length;
    const totalAdmins = Object.values(users).filter(u => u.role === 'admin').length;
    
    const totalUsersEl = document.getElementById('total-users');
    const totalAdminsEl = document.getElementById('total-admins');
    
    if (totalUsersEl) totalUsersEl.textContent = totalUsers;
    if (totalAdminsEl) totalAdminsEl.textContent = totalAdmins;
}

function exportUsers() {
    const usersData = JSON.stringify(users, null, 2);
    const blob = new Blob([usersData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios-ortega.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Usuarios exportados exitosamente', 'success');
}

function viewSystemLogs() {
    const logs = `
Sistema de Turismo - Ortega, Tolima
Logs del Sistema

Usuario actual: ${currentUser.username}
Rol: ${currentUser.role}
Total de usuarios: ${Object.keys(users).length}
Items en carrito: ${cart.items.length}
Total carrito: $${cart.total.toLocaleString()}

Última actualización: ${new Date().toLocaleString()}
    `;
    
    alert(logs);
    showNotification('Logs del sistema mostrados', 'info');
}

function resetSystem() {
    if (confirm('¿Estás seguro de que quieres reiniciar el sistema? Esto eliminará todos los datos excepto los usuarios predeterminados.')) {
        cart = { items: [], total: 0 };
        appSettings = { theme: 'light', showImages: true };
        document.body.classList.remove('dark-theme', 'hide-images');
        updateCartDisplay();
        showNotification('Sistema reiniciado', 'success');
    }
}

// Métodos de Pago
let paymentMethods = [];

function loadPaymentMethods() {
    const saved = localStorage.getItem('paymentMethods');
    if (saved) {
        paymentMethods = JSON.parse(saved);
    }
    renderPaymentMethods();
}

function savePaymentMethods() {
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
}

function renderPaymentMethods() {
    const list = document.getElementById('payment-methods-list');
    if (!list) return;
    
    if (paymentMethods.length === 0) {
        list.innerHTML = '<p class="empty-message">No hay métodos de pago agregados</p>';
        return;
    }
    
    list.innerHTML = paymentMethods.map((method, index) => `
        <div class="payment-method-item ${method.active ? 'active' : ''}">
            <div class="payment-info">
                <span class="payment-icon">${method.type === 'Tarjeta' ? '💳' : method.type === 'Efectivo' ? '💵' : '🏦'}</span>
                <div>
                    <strong>${method.type}</strong>
                    <p>${method.detail}</p>
                </div>
            </div>
            <div class="payment-actions">
                <button class="btn-small ${method.active ? 'btn-secondary' : 'btn-primary'}" onclick="togglePaymentMethod(${index})">
                    ${method.active ? 'Activo' : 'Activar'}
                </button>
                <button class="btn-small btn-danger" onclick="deletePaymentMethod(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function setupPaymentForm() {
    const form = document.getElementById('add-payment-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const type = document.getElementById('payment-type').value;
            const detail = document.getElementById('payment-detail').value;
            
            paymentMethods.push({ type, detail, active: paymentMethods.length === 0 });
            savePaymentMethods();
            renderPaymentMethods();
            form.reset();
            showNotification('Método de pago agregado', 'success');
        };
    }
}

function togglePaymentMethod(index) {
    paymentMethods.forEach((m, i) => m.active = i === index);
    savePaymentMethods();
    renderPaymentMethods();
    showNotification('Método de pago actualizado', 'success');
}

function deletePaymentMethod(index) {
    if (confirm('¿Eliminar este método de pago?')) {
        paymentMethods.splice(index, 1);
        if (paymentMethods.length > 0 && !paymentMethods.some(m => m.active)) {
            paymentMethods[0].active = true;
        }
        savePaymentMethods();
        renderPaymentMethods();
        showNotification('Método de pago eliminado', 'success');
    }
}

// Calendario
let currentCalendarDate = new Date();
let calendarEvents = [];

function loadCalendarEvents() {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) {
        calendarEvents = JSON.parse(saved).map(e => ({...e, date: new Date(e.date)}));
    }
}

function saveCalendarEvents() {
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('calendar-month-year');
    if (!grid || !monthYear) return;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    monthYear.textContent = currentCalendarDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let html = '<div class="calendar-days">';
    ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(day => {
        html += `<div class="calendar-day-name">${day}</div>`;
    });
    html += '</div><div class="calendar-dates">';
    
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-date empty"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const hasEvent = calendarEvents.some(e => e.date.toDateString() === date.toDateString());
        
        html += `<div class="calendar-date ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" onclick="selectCalendarDate(${year}, ${month}, ${day})">
            ${day}
        </div>`;
    }
    
    html += '</div>';
    grid.innerHTML = html;
    renderCalendarEvents();
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar();
}

function selectCalendarDate(year, month, day) {
    const date = new Date(year, month, day);
    const existingEvent = calendarEvents.find(e => e.date.toDateString() === date.toDateString());
    
    if (existingEvent) {
        if (confirm(`Eliminar reserva del ${date.toLocaleDateString('es-ES')}?`)) {
            calendarEvents = calendarEvents.filter(e => e.date.toDateString() !== date.toDateString());
            saveCalendarEvents();
            renderCalendar();
            showNotification('Reserva eliminada', 'success');
        }
    } else {
        const type = prompt('Tipo de reserva:\n1. Hotel\n2. Lugar\n3. Transporte\n\nIngresa el número:');
        const types = ['', 'Hotel', 'Lugar', 'Transporte'];
        if (type && types[type]) {
            calendarEvents.push({ date, type: types[type] });
            saveCalendarEvents();
            renderCalendar();
            showNotification('Reserva agregada', 'success');
        }
    }
}

function renderCalendarEvents() {
    const list = document.getElementById('calendar-events-list');
    if (!list) return;
    
    const upcomingEvents = calendarEvents
        .filter(e => e.date >= new Date())
        .sort((a, b) => a.date - b.date)
        .slice(0, 5);
    
    if (upcomingEvents.length === 0) {
        list.innerHTML = '<p class="empty-message">No hay reservas próximas</p>';
        return;
    }
    
    list.innerHTML = '<h4>Próximas Reservas</h4>' + upcomingEvents.map(event => `
        <div class="calendar-event-item">
            <span class="event-icon">${event.type === 'Hotel' ? '🏨' : event.type === 'Lugar' ? '🏞️' : '🚌'}</span>
            <div class="event-info">
                <strong>${event.type}</strong>
                <p>${event.date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
    `).join('');
}

// Gestión de Contenido (Admin)
let currentContentType = '';

function showContentTab(type) {
    document.querySelectorAll('.content-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`content-tab-${type}`).classList.add('active');
    event.target.classList.add('active');
    
    renderContentList(type);
}

function renderContentList(type) {
    const listId = `admin-${type}-list`;
    const list = document.getElementById(listId);
    if (!list) return;
    
    let items = [];
    if (type === 'lugares') items = lugares;
    else if (type === 'hoteles') items = hoteles;
    else if (type === 'restaurantes') items = restaurantes;
    else if (type === 'transporte') items = [...transporte.intermunicipal, ...transporte.local, ...transporte.particular];
    
    list.innerHTML = items.map(item => `
        <div class="content-item">
            <img src="${item.image}" alt="${item.name}" class="content-item-image">
            <div class="content-item-info">
                <strong>${item.name}</strong>
                <p>${item.description.substring(0, 80)}...</p>
            </div>
            <button class="btn-small btn-danger" onclick="deleteContent('${type}', ${item.id})">🗑️ Eliminar</button>
        </div>
    `).join('');
    
    updateContentStats();
}

function showAddContentForm(type) {
    currentContentType = type;
    const modal = document.getElementById('add-content-modal');
    const title = document.getElementById('modal-title');
    const priceGroup = document.getElementById('content-price-group');
    
    const titles = {
        'lugar': 'Agregar Lugar Turístico',
        'hotel': 'Agregar Hotel',
        'restaurante': 'Agregar Restaurante',
        'transporte': 'Agregar Transporte'
    };
    
    title.textContent = titles[type];
    priceGroup.style.display = type === 'lugar' ? 'none' : 'block';
    modal.style.display = 'block';
    
    setupAddContentForm();
}

function setupAddContentForm() {
    const form = document.getElementById('add-content-form');
    if (form && !form.dataset.setup) {
        form.dataset.setup = 'true';
        form.onsubmit = function(e) {
            e.preventDefault();
            addContent();
        };
    }
}

function addContent() {
    const name = document.getElementById('content-name').value;
    const image = document.getElementById('content-image').value;
    const description = document.getElementById('content-description').value;
    const price = parseInt(document.getElementById('content-price').value) || 0;
    
    let newItem = {
        id: Date.now(),
        name,
        image,
        description,
        price,
        type: currentContentType
    };
    
    if (currentContentType === 'lugar') {
        newItem.type = 'place';
        lugares.push(newItem);
        loadLugares();
    } else if (currentContentType === 'hotel') {
        newItem.rating = '⭐⭐⭐';
        hoteles.push(newItem);
        loadHoteles();
    } else if (currentContentType === 'restaurante') {
        newItem.type = 'restaurant';
        newItem.badge = 'Nuevo';
        newItem.rating = '⭐⭐⭐⭐';
        newItem.schedule = '⏰ Horario: 10:00 AM - 10:00 PM';
        restaurantes.push(newItem);
        loadRestaurantes();
    } else if (currentContentType === 'transporte') {
        newItem.type = 'transport';
        newItem.category = 'local';
        newItem.badge = 'Nuevo';
        newItem.route = '📍 Ruta: Por definir';
        transporte.local.push(newItem);
        loadTransporte();
    }
    
    closeAddContentModal();
    renderContentList(currentContentType + 's');
    showNotification('Contenido agregado exitosamente', 'success');
}

function deleteContent(type, id) {
    if (!confirm('¿Eliminar este elemento?')) return;
    
    if (type === 'lugares') {
        const index = lugares.findIndex(l => l.id === id);
        if (index !== -1) {
            lugares.splice(index, 1);
            loadLugares();
        }
    } else if (type === 'hoteles') {
        const index = hoteles.findIndex(h => h.id === id);
        if (index !== -1) {
            hoteles.splice(index, 1);
            loadHoteles();
        }
    } else if (type === 'restaurantes') {
        const index = restaurantes.findIndex(r => r.id === id);
        if (index !== -1) {
            restaurantes.splice(index, 1);
            loadRestaurantes();
        }
    } else if (type === 'transporte') {
        ['intermunicipal', 'local', 'particular'].forEach(cat => {
            const index = transporte[cat].findIndex(t => t.id === id);
            if (index !== -1) {
                transporte[cat].splice(index, 1);
            }
        });
        loadTransporte();
    }
    
    renderContentList(type);
    showNotification('Contenido eliminado', 'success');
}

function closeAddContentModal() {
    document.getElementById('add-content-modal').style.display = 'none';
    document.getElementById('add-content-form').reset();
}

function updateContentStats() {
    const statLugares = document.getElementById('stat-lugares');
    const statHoteles = document.getElementById('stat-hoteles');
    
    if (statLugares) statLugares.textContent = lugares.length;
    if (statHoteles) statHoteles.textContent = hoteles.length;
}


// Sistema de Pago
let purchaseHistory = [];

function loadPurchaseHistory() {
    const saved = localStorage.getItem('purchaseHistory');
    if (saved) {
        purchaseHistory = JSON.parse(saved);
    }
}

function savePurchaseHistory() {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
}

function openPaymentModal() {
    if (cart.items.length === 0) {
        showNotification('El carrito está vacío', 'warning');
        return;
    }
    
    const modal = document.getElementById('payment-modal');
    const itemsSummary = document.getElementById('payment-items-summary');
    const totalAmount = document.getElementById('payment-total-amount');
    
    // Generar resumen de items
    const byType = { place: [], hotel: [], restaurant: [], transport: [] };
    cart.items.forEach(item => byType[item.type].push(item));
    
    let html = '';
    const typeNames = {
        place: '🏞️ Lugares',
        hotel: '🏨 Hoteles',
        restaurant: '🍽️ Restaurantes',
        transport: '🚌 Transporte'
    };
    
    Object.keys(byType).forEach(type => {
        if (byType[type].length > 0) {
            html += `<div class="payment-category"><strong>${typeNames[type]}:</strong><ul>`;
            byType[type].forEach(item => {
                html += `<li>${item.name} - $${item.price.toLocaleString()}</li>`;
            });
            html += `</ul></div>`;
        }
    });
    
    itemsSummary.innerHTML = html;
    totalAmount.textContent = `$${cart.total.toLocaleString()}`;
    
    modal.style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function confirmPayment() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (!selectedMethod) {
        showNotification('Por favor selecciona un método de pago', 'warning');
        return;
    }
    
    if (cart.items.length === 0) {
        showNotification('El carrito está vacío', 'error');
        closePaymentModal();
        return;
    }
    
    const paymentMethod = selectedMethod.value;
    const purchaseDate = new Date();
    
    // Crear registro de compra
    const purchase = {
        id: Date.now(),
        date: purchaseDate.toISOString(),
        items: [...cart.items],
        total: cart.total,
        paymentMethod: paymentMethod,
        status: 'pagado',
        username: currentUser ? currentUser.username : 'guest'
    };
    
    // Guardar en historial
    purchaseHistory.push(purchase);
    savePurchaseHistory();
    
    // Asociar con calendario si hay eventos
    const associatedReservations = associatePaymentWithCalendar(purchase);
    
    // Cerrar modal
    closePaymentModal();
    
    // Mostrar confirmación
    showPaymentConfirmation(purchase, associatedReservations);
    
    // Vaciar carrito
    cart.items = [];
    cart.total = 0;
    updateCartDisplay();
    renderCart();
    
    // Actualizar perfil si está visible
    if (document.getElementById('view-perfil').classList.contains('active')) {
        loadUserProfile();
    }
}

function associatePaymentWithCalendar(purchase) {
    const associatedReservations = [];
    
    // Si hay eventos en el calendario, marcarlos como confirmados
    if (calendarEvents && calendarEvents.length > 0) {
        calendarEvents.forEach(event => {
            if (!event.confirmed) {
                event.confirmed = true;
                event.purchaseId = purchase.id;
                event.status = 'pagado';
                associatedReservations.push(event);
            }
        });
        saveCalendarEvents();
    }
    
    return associatedReservations;
}

function showPaymentConfirmation(purchase, associatedReservations) {
    const reservationsText = associatedReservations && associatedReservations.length > 0 
        ? `<p><strong>Reservas confirmadas:</strong> ${associatedReservations.length}</p>`
        : '';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content payment-confirmation-modal">
            <div class="payment-success-icon">✅</div>
            <h2>¡Pago Exitoso!</h2>
            <div class="payment-confirmation-details">
                <p><strong>Método de pago:</strong> ${purchase.paymentMethod}</p>
                <p><strong>Total pagado:</strong> $${purchase.total.toLocaleString()}</p>
                <p><strong>Fecha:</strong> ${new Date(purchase.date).toLocaleString('es-ES')}</p>
                <p><strong>ID de compra:</strong> #${purchase.id}</p>
                ${reservationsText}
            </div>
            <div class="payment-status-badge success">
                <span class="status-icon">✓</span>
                <span class="status-text">Pago Confirmado</span>
            </div>
            <p class="payment-confirmation-message">
                Tu reserva ha sido confirmada. Puedes ver los detalles en tu perfil.
            </p>
            <button class="btn btn-primary" onclick="closeConfirmationModal(this)">Aceptar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    showNotification('¡Pago procesado exitosamente!', 'success');
}

function closeConfirmationModal(btn) {
    const modal = btn.closest('.modal');
    modal.remove();
}

// Actualizar updateCartDisplay para incluir botón de pagar
const originalUpdateCartDisplay = updateCartDisplay;
updateCartDisplay = function() {
    originalUpdateCartDisplay();
    const btnPagar = document.getElementById('btn-pagar');
    if (btnPagar) {
        btnPagar.disabled = cart.items.length === 0;
    }
};

// Cargar historial de compras al iniciar
loadPurchaseHistory();


// Panel de Administración - Navegación
function showAdminPanel(panel) {
    const viewName = `admin-${panel}`;
    showView(viewName);
    
    if (panel === 'gestion-contenido') {
        loadAdminContentManagement();
    } else if (panel === 'reportes') {
        loadAdminReports();
    } else if (panel === 'configuracion') {
        loadAdminConfiguration();
    }
}

// Gestión de Contenido Admin
function loadAdminContentManagement() {
    renderAdminContentList('lugares');
}

function showAdminContentTab(type) {
    document.querySelectorAll('.admin-content-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.content-management-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`admin-content-tab-${type}`).classList.add('active');
    event.target.classList.add('active');
    
    renderAdminContentList(type);
}

function renderAdminContentList(type) {
    const listId = `admin-content-${type}-list`;
    const list = document.getElementById(listId);
    if (!list) return;
    
    let items = [];
    if (type === 'lugares') items = lugares;
    else if (type === 'hoteles') items = hoteles;
    else if (type === 'restaurantes') items = restaurantes;
    else if (type === 'transporte') items = [...transporte.intermunicipal, ...transporte.local, ...transporte.particular];
    
    if (items.length === 0) {
        list.innerHTML = '<p class="empty-message">No hay elementos para mostrar</p>';
        return;
    }
    
    list.innerHTML = items.map(item => `
        <div class="content-item">
            <img src="${item.image}" alt="${item.name}" class="content-item-image">
            <div class="content-item-info">
                <strong>${item.name}</strong>
                <p>${item.description.substring(0, 100)}...</p>
                ${item.price ? `<p class="content-item-price">$${item.price.toLocaleString()}</p>` : ''}
            </div>
            <button class="btn-small btn-danger" onclick="deleteAdminContent('${type}', ${item.id})">🗑️ Eliminar</button>
        </div>
    `).join('');
}

function showAddAdminContentForm(type) {
    currentContentType = type;
    const modal = document.getElementById('add-content-modal');
    const title = document.getElementById('modal-title');
    const priceGroup = document.getElementById('content-price-group');
    
    const titles = {
        'lugar': 'Agregar Lugar Turístico',
        'hotel': 'Agregar Hotel',
        'restaurante': 'Agregar Restaurante',
        'transporte': 'Agregar Transporte'
    };
    
    title.textContent = titles[type];
    priceGroup.style.display = type === 'lugar' ? 'none' : 'block';
    modal.style.display = 'block';
    
    setupAddContentForm();
}

function deleteAdminContent(type, id) {
    if (!confirm('¿Eliminar este elemento?')) return;
    
    if (type === 'lugares') {
        const index = lugares.findIndex(l => l.id === id);
        if (index !== -1) {
            lugares.splice(index, 1);
            loadLugares();
        }
    } else if (type === 'hoteles') {
        const index = hoteles.findIndex(h => h.id === id);
        if (index !== -1) {
            hoteles.splice(index, 1);
            loadHoteles();
        }
    } else if (type === 'restaurantes') {
        const index = restaurantes.findIndex(r => r.id === id);
        if (index !== -1) {
            restaurantes.splice(index, 1);
            loadRestaurantes();
        }
    } else if (type === 'transporte') {
        ['intermunicipal', 'local', 'particular'].forEach(cat => {
            const index = transporte[cat].findIndex(t => t.id === id);
            if (index !== -1) {
                transporte[cat].splice(index, 1);
            }
        });
        loadTransporte();
    }
    
    renderAdminContentList(type);
    showNotification('Contenido eliminado', 'success');
}

// Reportes Admin
function loadAdminReports() {
    // Total de reservas
    const totalReservas = calendarEvents ? calendarEvents.length : 0;
    document.getElementById('report-reservas').textContent = totalReservas;
    
    // Total de pagos
    const totalPagos = purchaseHistory ? purchaseHistory.length : 0;
    document.getElementById('report-pagos').textContent = totalPagos;
    
    // Ingresos totales
    const ingresosTotales = purchaseHistory ? 
        purchaseHistory.reduce((sum, p) => sum + p.total, 0) : 0;
    document.getElementById('report-ingresos').textContent = `$${ingresosTotales.toLocaleString()}`;
    
    // Total de usuarios
    const totalUsuarios = Object.keys(users).length;
    document.getElementById('report-usuarios').textContent = totalUsuarios;
    
    // Elementos más agregados (simulado con datos del historial)
    loadTopItems();
    
    // Métodos de pago más usados
    loadPaymentMethodsStats();
}

function loadTopItems() {
    const topItemsDiv = document.getElementById('report-top-items');
    
    if (!purchaseHistory || purchaseHistory.length === 0) {
        topItemsDiv.innerHTML = '<p class="empty-message">No hay datos suficientes</p>';
        return;
    }
    
    // Contar items
    const itemCount = {};
    purchaseHistory.forEach(purchase => {
        purchase.items.forEach(item => {
            const key = item.name;
            itemCount[key] = (itemCount[key] || 0) + 1;
        });
    });
    
    // Ordenar y tomar top 5
    const topItems = Object.entries(itemCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topItems.length === 0) {
        topItemsDiv.innerHTML = '<p class="empty-message">No hay datos suficientes</p>';
        return;
    }
    
    topItemsDiv.innerHTML = topItems.map(([name, count], index) => `
        <div class="top-item">
            <span class="top-item-rank">#${index + 1}</span>
            <span class="top-item-name">${name}</span>
            <span class="top-item-count">${count} veces</span>
        </div>
    `).join('');
}

function loadPaymentMethodsStats() {
    const paymentMethodsDiv = document.getElementById('report-payment-methods');
    
    if (!purchaseHistory || purchaseHistory.length === 0) {
        paymentMethodsDiv.innerHTML = '<p class="empty-message">No hay datos suficientes</p>';
        return;
    }
    
    // Contar métodos de pago
    const methodCount = {};
    purchaseHistory.forEach(purchase => {
        const method = purchase.paymentMethod;
        methodCount[method] = (methodCount[method] || 0) + 1;
    });
    
    const total = purchaseHistory.length;
    
    paymentMethodsDiv.innerHTML = Object.entries(methodCount).map(([method, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        return `
            <div class="payment-method-stat">
                <div class="payment-method-info">
                    <span class="payment-method-name">${method}</span>
                    <span class="payment-method-count">${count} pagos (${percentage}%)</span>
                </div>
                <div class="payment-method-bar">
                    <div class="payment-method-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Configuración Admin
function loadAdminConfiguration() {
    const currentUserEl = document.getElementById('admin-current-user');
    if (currentUserEl && currentUser) {
        currentUserEl.textContent = `${currentUser.username} (${currentUser.role === 'admin' ? 'Administrador' : 'Usuario'})`;
    }
    
    updateAdminConfigButtons();
}

function updateAdminConfigButtons() {
    const themeText = document.getElementById('admin-theme-text');
    const imagesText = document.getElementById('admin-images-text');
    
    if (themeText) {
        themeText.textContent = appSettings.theme === 'dark' ? 'Cambiar a Claro' : 'Cambiar a Oscuro';
    }
    
    if (imagesText) {
        imagesText.textContent = appSettings.showImages ? 'Ocultar Imágenes' : 'Mostrar Imágenes';
    }
}

function clearSystemData() {
    if (!confirm('¿Estás seguro de que quieres limpiar todos los datos del sistema? Esta acción no se puede deshacer.')) {
        return;
    }
    
    if (!confirm('ADVERTENCIA: Se eliminarán todos los pagos, reservas y configuraciones. ¿Continuar?')) {
        return;
    }
    
    // Limpiar datos pero mantener usuarios
    purchaseHistory = [];
    calendarEvents = [];
    paymentMethods = [];
    cart = { items: [], total: 0 };
    
    // Guardar cambios
    savePurchaseHistory();
    saveCalendarEvents();
    savePaymentMethods();
    
    // Limpiar localStorage excepto usuarios
    const savedUsers = localStorage.getItem('systemUsers');
    const savedCurrentUser = localStorage.getItem('currentUser');
    
    localStorage.clear();
    
    if (savedUsers) localStorage.setItem('systemUsers', savedUsers);
    if (savedCurrentUser) localStorage.setItem('currentUser', savedCurrentUser);
    
    // Actualizar UI
    updateCartDisplay();
    
    showNotification('Datos del sistema limpiados exitosamente', 'success');
    
    // Recargar reportes si está en esa vista
    if (document.getElementById('view-admin-reportes').classList.contains('active')) {
        loadAdminReports();
    }
}

function resetSystemAdmin() {
    if (!confirm('¿Estás seguro de que quieres reiniciar el sistema a valores de fábrica?')) {
        return;
    }
    
    // Reiniciar configuración
    appSettings = { theme: 'light', showImages: true };
    document.body.classList.remove('dark-theme', 'hide-images');
    saveSettings();
    
    // Limpiar carrito
    cart = { items: [], total: 0 };
    updateCartDisplay();
    
    updateAdminConfigButtons();
    
    showNotification('Sistema reiniciado a valores de fábrica', 'success');
}


// Perfil de Usuario
function loadUserProfile() {
    if (!currentUser) return;
    
    // Información personal
    document.getElementById('perfil-username').textContent = currentUser.username;
    document.getElementById('perfil-role').textContent = currentUser.role === 'admin' ? 'Administrador' : 'Usuario';
    document.getElementById('perfil-member-since').textContent = 'Febrero 2026';
    
    // Filtrar datos del usuario actual
    const userPurchases = purchaseHistory.filter(p => p.username === currentUser.username);
    const userReservations = calendarEvents.filter(e => e.username === currentUser.username || !e.username);
    
    // Estadísticas
    document.getElementById('perfil-reservas').textContent = userReservations.length;
    document.getElementById('perfil-pagos').textContent = userPurchases.length;
    
    const totalGastado = userPurchases.reduce((sum, p) => sum + p.total, 0);
    document.getElementById('perfil-total').textContent = `$${totalGastado.toLocaleString()}`;
    
    // Cargar listas
    loadUserReservations(userReservations);
    loadUserPayments(userPurchases);
}

function loadUserReservations(reservations) {
    const list = document.getElementById('perfil-reservas-list');
    
    if (!reservations || reservations.length === 0) {
        list.innerHTML = '<p class="empty-message">No tienes reservas realizadas</p>';
        return;
    }
    
    list.innerHTML = reservations.map(reservation => {
        const status = reservation.confirmed ? 'pagado' : 'pendiente';
        const statusClass = reservation.confirmed ? 'success' : 'pending';
        const date = new Date(reservation.date);
        
        return `
            <div class="reserva-item">
                <div class="reserva-icon">${reservation.type === 'Hotel' ? '🏨' : reservation.type === 'Lugar' ? '🏞️' : '🚌'}</div>
                <div class="reserva-info">
                    <strong>${reservation.type}</strong>
                    <p>${date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div class="reserva-status ${statusClass}">
                    <span class="status-icon">${reservation.confirmed ? '✓' : '⏱'}</span>
                    <span class="status-text">${status}</span>
                </div>
                ${!reservation.confirmed ? `<button class="btn-small btn-danger" onclick="cancelReservation(${JSON.stringify(reservation).replace(/"/g, '&quot;')})">Cancelar</button>` : ''}
            </div>
        `;
    }).join('');
}

function loadUserPayments(payments) {
    const list = document.getElementById('perfil-pagos-list');
    
    if (!payments || payments.length === 0) {
        list.innerHTML = '<p class="empty-message">No tienes pagos realizados</p>';
        return;
    }
    
    list.innerHTML = payments.map(payment => {
        const date = new Date(payment.date);
        
        return `
            <div class="pago-item">
                <div class="pago-icon">💳</div>
                <div class="pago-info">
                    <strong>Pago #${payment.id}</strong>
                    <p>${date.toLocaleDateString('es-ES')} - ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p class="pago-method">${payment.paymentMethod}</p>
                </div>
                <div class="pago-amount">
                    <strong>$${payment.total.toLocaleString()}</strong>
                </div>
                <div class="pago-status success">
                    <span class="status-icon">✓</span>
                    <span class="status-text">Pagado</span>
                </div>
            </div>
        `;
    }).join('');
}

function cancelReservation(reservation) {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        return;
    }
    
    const index = calendarEvents.findIndex(e => 
        e.date.toString() === reservation.date.toString() && 
        e.type === reservation.type
    );
    
    if (index !== -1) {
        calendarEvents.splice(index, 1);
        saveCalendarEvents();
        loadUserProfile();
        renderCalendar();
        showNotification('Reserva cancelada exitosamente', 'success');
    }
}

// Validaciones del Sistema
function validateCartBeforePayment() {
    if (cart.items.length === 0) {
        showNotification('Tu carrito está vacío. Agrega elementos antes de pagar.', 'warning');
        return false;
    }
    
    return true;
}

function validateCalendarReservation(date) {
    if (!date) {
        showNotification('Por favor selecciona una fecha válida', 'error');
        return false;
    }
    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('No puedes reservar fechas pasadas', 'error');
        return false;
    }
    
    return true;
}

// Actualizar selectCalendarDate con validaciones
const originalSelectCalendarDate = selectCalendarDate;
selectCalendarDate = function(year, month, day) {
    const date = new Date(year, month, day);
    
    if (!validateCalendarReservation(date)) {
        return;
    }
    
    const existingEvent = calendarEvents.find(e => e.date.toDateString() === date.toDateString());
    
    if (existingEvent) {
        if (existingEvent.confirmed) {
            showNotification('Esta reserva ya está confirmada y pagada. No se puede eliminar.', 'warning');
            return;
        }
        
        if (confirm(`Eliminar reserva del ${date.toLocaleDateString('es-ES')}?`)) {
            calendarEvents = calendarEvents.filter(e => e.date.toDateString() !== date.toDateString());
            saveCalendarEvents();
            renderCalendar();
            showNotification('Reserva eliminada', 'success');
        }
    } else {
        const type = prompt('Tipo de reserva:\n1. Hotel\n2. Lugar\n3. Transporte\n\nIngresa el número:');
        const types = ['', 'Hotel', 'Lugar', 'Transporte'];
        
        if (type && types[type]) {
            const newEvent = {
                date: date,
                type: types[type],
                confirmed: false,
                status: 'pendiente',
                username: currentUser ? currentUser.username : 'guest'
            };
            
            calendarEvents.push(newEvent);
            saveCalendarEvents();
            renderCalendar();
            showNotification('Reserva creada. Completa el pago para confirmarla.', 'success');
        }
    }
};

// Actualizar openPaymentModal con validaciones
const originalOpenPaymentModal = openPaymentModal;
openPaymentModal = function() {
    if (!validateCartBeforePayment()) {
        return;
    }
    
    originalOpenPaymentModal();
};

// Actualizar showView para cargar perfil
const originalShowView2 = showView;
showView = function(viewName) {
    originalShowView2(viewName);
    
    if (viewName === 'perfil') {
        loadUserProfile();
    }
};

// Guardar username en eventos de calendario
const originalRenderCalendar = renderCalendar;
renderCalendar = function() {
    originalRenderCalendar();
    
    // Actualizar eventos con username si no lo tienen
    if (calendarEvents && currentUser) {
        let updated = false;
        calendarEvents.forEach(event => {
            if (!event.username) {
                event.username = currentUser.username;
                updated = true;
            }
        });
        if (updated) {
            saveCalendarEvents();
        }
    }
};

// Inicializar perfil al cargar
document.addEventListener('DOMContentLoaded', function() {
    if (currentUser) {
        loadUserProfile();
    }
});


// Cargar contenido destacado en la página de inicio
function loadFeaturedContent() {
    loadFeaturedLugares();
    loadFeaturedHoteles();
    loadFeaturedRestaurantes();
}

function loadFeaturedLugares() {
    const grid = document.getElementById('featured-lugares');
    if (!grid) return;
    
    const featured = lugares.slice(0, 3);
    
    grid.innerHTML = featured.map(lugar => `
        <div class="featured-card">
            <img src="${lugar.image}" alt="${lugar.name}" class="featured-image">
            <div class="featured-content">
                <h3 class="featured-title">${lugar.name}</h3>
                <p class="featured-description">${lugar.description}</p>
                <div class="featured-actions">
                    <button class="btn btn-secondary btn-sm" onclick="showPlaceDetails(${lugar.id})">Ver más información</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('place', ${lugar.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadFeaturedHoteles() {
    const grid = document.getElementById('featured-hoteles');
    if (!grid) return;
    
    const featured = hoteles.slice(0, 3);
    
    grid.innerHTML = featured.map(hotel => `
        <div class="featured-card">
            <img src="${hotel.image}" alt="${hotel.name}" class="featured-image">
            <div class="featured-content">
                <h3 class="featured-title">${hotel.name}</h3>
                <div class="featured-rating">${hotel.rating}</div>
                <p class="featured-price">$${hotel.price.toLocaleString()} / noche</p>
                <p class="featured-description">${hotel.description}</p>
                <div class="featured-actions">
                    <button class="btn btn-secondary btn-sm" onclick="showHotelDetails(${hotel.id})">Ver más información</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('hotel', ${hotel.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadFeaturedRestaurantes() {
    const grid = document.getElementById('featured-restaurantes');
    if (!grid) return;
    
    const featured = restaurantes.slice(0, 3);
    
    grid.innerHTML = featured.map(rest => `
        <div class="featured-card">
            <img src="${rest.image}" alt="${rest.name}" class="featured-image">
            <div class="featured-content">
                <h3 class="featured-title">${rest.name}</h3>
                <span class="featured-badge">${rest.badge}</span>
                <div class="featured-rating">${rest.rating}</div>
                <p class="featured-description">${rest.description}</p>
                <div class="featured-actions">
                    <button class="btn btn-secondary btn-sm" onclick="showRestaurantDetails(${rest.id})">Ver más información</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('restaurant', ${rest.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones para mostrar detalles (modales simples)
function showPlaceDetails(id) {
    const place = lugares.find(l => l.id === id);
    if (!place) return;
    
    showInfoModal('Lugar Turístico', place.name, place.description, place.image);
}

function showHotelDetails(id) {
    const hotel = hoteles.find(h => h.id === id);
    if (!hotel) return;
    
    const info = `${hotel.description}\n\nPrecio: $${hotel.price.toLocaleString()} por noche\nCalificación: ${hotel.rating}`;
    showInfoModal('Hotel', hotel.name, info, hotel.image);
}

function showRestaurantDetails(id) {
    const rest = restaurantes.find(r => r.id === id);
    if (!rest) return;
    
    const info = `${rest.description}\n\nTipo: ${rest.badge}\nCalificación: ${rest.rating}\n${rest.schedule}`;
    showInfoModal('Restaurante', rest.name, info, rest.image);
}

function showInfoModal(type, title, description, image) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content info-modal-content">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <img src="${image}" alt="${title}" class="modal-info-image">
            <div class="modal-info-content">
                <span class="modal-info-type">${type}</span>
                <h2>${title}</h2>
                <p style="white-space: pre-line;">${description}</p>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Cerrar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Control de visibilidad del Panel Admin
function updateAdminVisibility() {
    const adminMenuItem = document.getElementById('admin-menu-item');
    const adminSettingsItem = document.getElementById('admin-settings-item');
    
    if (currentUser && currentUser.role === 'admin') {
        if (adminMenuItem) adminMenuItem.style.display = 'block';
        if (adminSettingsItem) adminSettingsItem.style.display = 'block';
    } else {
        if (adminMenuItem) adminMenuItem.style.display = 'none';
        if (adminSettingsItem) adminSettingsItem.style.display = 'none';
    }
}

// Actualizar showMainApp para incluir contenido destacado y visibilidad admin
const originalShowMainApp = showMainApp;
showMainApp = function() {
    document.getElementById('view-login').classList.remove('active');
    document.getElementById('main-header').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    
    updateAdminVisibility();
    
    loadSettings();
    loadFeaturedContent();
    
    showView('inicio');
    updateCartDisplay();
};

// Actualizar showView para recargar contenido destacado en inicio
const originalShowView3 = showView;
showView = function(viewName) {
    originalShowView3(viewName);
    
    if (viewName === 'inicio') {
        loadFeaturedContent();
    }
};
