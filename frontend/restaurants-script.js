// API Configuration
const API_BASE_URL = 'http://localhost:5000/api/restaurants';

// Global variables
let allRestaurants = [];
let currentFilter = 'all';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    // Update cart count
    if (window.updateCartCount) {
        window.updateCartCount();
    }
});

// Initialize the application
async function initializeApp() {
    try {
        await loadRestaurants();
        await loadCuisineTypes();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Modal
    const modal = document.getElementById('restaurant-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Load restaurants from API
async function loadRestaurants() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        
        allRestaurants = await response.json();
        renderRestaurants(allRestaurants);
    } catch (error) {
        console.error('Error loading restaurants:', error);
        document.getElementById('restaurants-grid').innerHTML = `
            <div class="no-content">
                <p>Los restaurantes no están disponibles en este momento.</p>
                <p>Por favor, verifica que el servidor esté funcionando correctamente.</p>
            </div>
        `;
    }
}

// Load cuisine types for filters
async function loadCuisineTypes() {
    try {
        const response = await fetch(`${API_BASE_URL}/cuisine-types`);
        if (!response.ok) throw new Error('Failed to fetch cuisine types');
        
        const cuisineTypes = await response.json();
        renderCuisineFilters(cuisineTypes);
    } catch (error) {
        console.error('Error loading cuisine types:', error);
    }
}

// Render cuisine filter buttons
function renderCuisineFilters(cuisineTypes) {
    const filtersContainer = document.getElementById('cuisine-filters');
    
    // Keep the "All" button
    const allButton = filtersContainer.querySelector('[data-cuisine="all"]');
    
    // Add cuisine type buttons
    cuisineTypes.forEach(cuisine => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-cuisine', cuisine);
        button.textContent = cuisine;
        button.addEventListener('click', () => filterRestaurants(cuisine));
        filtersContainer.appendChild(button);
    });
    
    // Event listener for "All" button
    allButton.addEventListener('click', () => filterRestaurants('all'));
}

// Filter restaurants by cuisine type
function filterRestaurants(cuisine) {
    currentFilter = cuisine;
    
    // Update active buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-cuisine="${cuisine}"]`).classList.add('active');
    
    // Filter and render restaurants
    const filteredRestaurants = cuisine === 'all' 
        ? allRestaurants 
        : allRestaurants.filter(restaurant => restaurant.cuisineType === cuisine);
    
    renderRestaurants(filteredRestaurants);
}

// Render restaurants as cards
function renderRestaurants(restaurants) {
    const restaurantsGrid = document.getElementById('restaurants-grid');
    
    if (restaurants.length === 0) {
        restaurantsGrid.innerHTML = `
            <div class="no-content">
                <p>No se encontraron restaurantes en esta categoría.</p>
                <p>Intenta seleccionar otra categoría o verifica la conexión.</p>
            </div>
        `;
        return;
    }
    
    restaurantsGrid.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card">
            <img src="${restaurant.imageUrl}" alt="${restaurant.name}" class="restaurant-image" loading="lazy">
            <div class="restaurant-content">
                <h3 class="restaurant-title">${restaurant.name}</h3>
                <span class="restaurant-cuisine">${restaurant.cuisineType}</span>
                <div class="restaurant-rating">${'⭐'.repeat(Math.floor(restaurant.rating))} ${restaurant.rating}/5.0</div>
                <div class="restaurant-price-range">${restaurant.priceRange}</div>
                <p class="restaurant-description">${restaurant.description}</p>
                <div class="card-actions">
                    <button class="btn-info" onclick="showRestaurantDetails(${restaurant.id})">Ver información</button>
                    <button class="btn-add-cart" onclick="addRestaurantToCart(${restaurant.id})">🛒 Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show restaurant details in modal
async function showRestaurantDetails(restaurantId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${restaurantId}`);
        if (!response.ok) throw new Error('Failed to fetch restaurant details');
        
        const restaurant = await response.json();
        renderRestaurantModal(restaurant);
        
        const modal = document.getElementById('restaurant-modal');
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading restaurant details:', error);
        showNotification('No se pudieron cargar los detalles de este restaurante. Intenta nuevamente.', 'error');
    }
}

// Render restaurant modal
function renderRestaurantModal(restaurant) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${restaurant.imageUrl}" alt="${restaurant.name}" class="modal-place-image">
        <div class="modal-place-content">
            <h2 class="modal-place-title">${restaurant.name}</h2>
            <span class="modal-place-category">${restaurant.cuisineType}</span>
            <div class="restaurant-rating" style="font-size: 1.3rem; margin-bottom: 15px;">${'⭐'.repeat(Math.floor(restaurant.rating))} ${restaurant.rating}/5.0</div>
            <div class="restaurant-price-range" style="font-size: 1.2rem; margin-bottom: 20px; font-weight: bold; color: #2d5a27;">${restaurant.priceRange}</div>
            <p class="modal-place-description">${restaurant.description}</p>
            
            <div class="modal-section">
                <h4>🍽️ Especialidades de la Casa</h4>
                <div class="specialties-list">
                    ${restaurant.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>📞 Información de Contacto y Horarios</h4>
                <div class="contact-info">
                    <p><strong>📍 Dirección:</strong> ${restaurant.address}</p>
                    <p><strong>📞 Teléfono:</strong> ${restaurant.phone}</p>
                    <p><strong>⏰ Horarios:</strong> ${restaurant.openingHours}</p>
                    <p><strong>🍴 Tipo de cocina:</strong> ${restaurant.cuisineType}</p>
                    <p><strong>💰 Rango de precios:</strong> ${restaurant.priceRange}</p>
                    <p><strong>⭐ Calificación:</strong> ${restaurant.rating}/5.0</p>
                    <p><strong>🗺️ Coordenadas:</strong> ${restaurant.latitude}, ${restaurant.longitude}</p>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-add-cart-modal" onclick="addRestaurantToCart(${restaurant.id})">🛒 Agregar al Itinerario</button>
                <div style="margin-top: 15px;">
                    <a href="tel:${restaurant.phone}" class="contact-button">📞 Llamar</a>
                    <span class="contact-button">🕐 ${restaurant.openingHours}</span>
                </div>
            </div>
        </div>
    `;
}

// Add restaurant to cart
async function addRestaurantToCart(restaurantId) {
    if (window.addToCart) {
        const success = await window.addToCart('restaurant', restaurantId);
        if (success) {
            // Show visual feedback
            const buttons = document.querySelectorAll(`[onclick="addRestaurantToCart(${restaurantId})"]`);
            buttons.forEach(button => {
                const originalText = button.textContent;
                button.textContent = '✅ Agregado';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2000);
            });
        }
    } else {
        console.error('Cart functionality not available');
        showNotification('Funcionalidad del carrito no disponible', 'error');
    }
}

// Show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}