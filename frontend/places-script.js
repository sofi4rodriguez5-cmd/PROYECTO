// API Configuration
const API_BASE_URL = 'http://localhost:5000/api/tourism';

// Global variables
let allPlaces = [];
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
        await loadPlaces();
        await loadCategories();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Modal
    const modal = document.getElementById('place-modal');
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

// Load places from API
async function loadPlaces() {
    try {
        const response = await fetch(`${API_BASE_URL}/places`);
        if (!response.ok) throw new Error('Failed to fetch places');
        
        allPlaces = await response.json();
        renderPlaces(allPlaces);
    } catch (error) {
        console.error('Error loading places:', error);
        document.getElementById('places-grid').innerHTML = `
            <div class="no-content">
                <p>Los lugares turísticos no están disponibles en este momento.</p>
                <p>Por favor, verifica que el servidor esté funcionando correctamente.</p>
            </div>
        `;
    }
}

// Load categories for filters
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const categories = await response.json();
        renderCategoryFilters(categories);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Render category filter buttons
function renderCategoryFilters(categories) {
    const filtersContainer = document.getElementById('category-filters');
    
    // Keep the "All" button
    const allButton = filtersContainer.querySelector('[data-category="all"]');
    
    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-category', category);
        button.textContent = category;
        button.addEventListener('click', () => filterPlaces(category));
        filtersContainer.appendChild(button);
    });
    
    // Event listener for "All" button
    allButton.addEventListener('click', () => filterPlaces('all'));
}

// Filter places by category
function filterPlaces(category) {
    currentFilter = category;
    
    // Update active buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter and render places
    const filteredPlaces = category === 'all' 
        ? allPlaces 
        : allPlaces.filter(place => place.category === category);
    
    renderPlaces(filteredPlaces);
}

// Render places as cards
function renderPlaces(places) {
    const placesGrid = document.getElementById('places-grid');
    
    if (places.length === 0) {
        placesGrid.innerHTML = `
            <div class="no-content">
                <p>No se encontraron lugares turísticos en esta categoría.</p>
                <p>Intenta seleccionar otra categoría o verifica la conexión.</p>
            </div>
        `;
        return;
    }
    
    placesGrid.innerHTML = places.map(place => `
        <div class="place-card">
            <img src="${place.imageUrl}" alt="${place.name}" class="place-image" loading="lazy">
            <div class="place-content">
                <h3 class="place-title">${place.name}</h3>
                <span class="place-category">${place.category}</span>
                <p class="place-description">${place.description}</p>
                <div class="card-actions">
                    <button class="btn-info" onclick="showPlaceDetails(${place.id})">Ver información</button>
                    <button class="btn-add-cart" onclick="addPlaceToCart(${place.id})">🛒 Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show place details in modal
async function showPlaceDetails(placeId) {
    try {
        const response = await fetch(`${API_BASE_URL}/places/${placeId}`);
        if (!response.ok) throw new Error('Failed to fetch place details');
        
        const place = await response.json();
        renderPlaceModal(place);
        
        const modal = document.getElementById('place-modal');
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading place details:', error);
        showNotification('No se pudieron cargar los detalles de este lugar. Intenta nuevamente.', 'error');
    }
}

// Render place modal
function renderPlaceModal(place) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}" class="modal-place-image">
        <div class="modal-place-content">
            <h2 class="modal-place-title">${place.name}</h2>
            <span class="modal-place-category">${place.category}</span>
            <p class="modal-place-description">${place.description}</p>
            
            <div class="modal-section">
                <h4>🎯 Actividades Disponibles</h4>
                <div class="services-list">
                    ${place.activities.map(activity => `<span class="service-tag">${activity}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>📍 Información de Ubicación y Horarios</h4>
                <div class="contact-info">
                    <p><strong>⏰ Horarios:</strong> ${place.openingHours}</p>
                    <p><strong>🗺️ Coordenadas:</strong> ${place.latitude}, ${place.longitude}</p>
                    <p><strong>🎫 Entrada:</strong> Gratuita</p>
                    <p><strong>📱 Recomendación:</strong> Llevar cámara fotográfica y ropa cómoda</p>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-add-cart-modal" onclick="addPlaceToCart(${place.id})">🛒 Agregar al Itinerario</button>
                <div style="margin-top: 15px;">
                    <span class="contact-button">🕐 ${place.openingHours}</span>
                    <span class="contact-button">🎫 Entrada Gratuita</span>
                </div>
            </div>
        </div>
    `;
}

// Add place to cart
async function addPlaceToCart(placeId) {
    if (window.addToCart) {
        const success = await window.addToCart('place', placeId);
        if (success) {
            // Show visual feedback
            const buttons = document.querySelectorAll(`[onclick="addPlaceToCart(${placeId})"]`);
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