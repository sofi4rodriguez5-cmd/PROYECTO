// API Configuration
const API_BASE_URL = 'http://localhost:5000/api/hotels';

// Global variables
let allHotels = [];

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
        await loadHotels();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Modal
    const modal = document.getElementById('hotel-modal');
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

// Load hotels from API
async function loadHotels() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch hotels');
        
        allHotels = await response.json();
        renderHotels(allHotels);
    } catch (error) {
        console.error('Error loading hotels:', error);
        document.getElementById('hotels-grid').innerHTML = `
            <div class="no-content">
                <p>Los hoteles no están disponibles en este momento.</p>
                <p>Por favor, verifica que el servidor esté funcionando correctamente.</p>
            </div>
        `;
    }
}

// Render hotels as cards
function renderHotels(hotels) {
    const hotelsGrid = document.getElementById('hotels-grid');
    
    if (hotels.length === 0) {
        hotelsGrid.innerHTML = `
            <div class="no-content">
                <p>No se encontraron hoteles disponibles.</p>
            </div>
        `;
        return;
    }
    
    hotelsGrid.innerHTML = hotels.map(hotel => `
        <div class="hotel-card">
            <img src="${hotel.imageUrl}" alt="${hotel.name}" class="hotel-image" loading="lazy">
            <div class="hotel-content">
                <h3 class="hotel-title">${hotel.name}</h3>
                <div class="hotel-stars">${'⭐'.repeat(hotel.stars)} (${hotel.stars} estrellas)</div>
                <div class="hotel-price">$${hotel.pricePerNight.toLocaleString()} COP / noche</div>
                <p class="hotel-description">${hotel.description}</p>
                <div class="card-actions">
                    <button class="btn-info" onclick="showHotelDetails(${hotel.id})">Ver información</button>
                    <button class="btn-add-cart" onclick="addHotelToCart(${hotel.id})">🛒 Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show hotel details in modal
async function showHotelDetails(hotelId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${hotelId}`);
        if (!response.ok) throw new Error('Failed to fetch hotel details');
        
        const hotel = await response.json();
        renderHotelModal(hotel);
        
        const modal = document.getElementById('hotel-modal');
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading hotel details:', error);
        showNotification('No se pudieron cargar los detalles de este hotel. Intenta nuevamente.', 'error');
    }
}

// Render hotel modal
function renderHotelModal(hotel) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${hotel.imageUrl}" alt="${hotel.name}" class="modal-place-image">
        <div class="modal-place-content">
            <h2 class="modal-place-title">${hotel.name}</h2>
            <div class="hotel-stars" style="font-size: 1.5rem; margin-bottom: 15px;">${'⭐'.repeat(hotel.stars)} (${hotel.stars} estrellas)</div>
            <div class="hotel-price" style="font-size: 1.3rem; margin-bottom: 20px; color: #2d5a27; font-weight: bold;">$${hotel.pricePerNight.toLocaleString()} COP / noche</div>
            <p class="modal-place-description">${hotel.description}</p>
            
            <div class="modal-section">
                <h4>🏨 Servicios y Comodidades</h4>
                <div class="services-list">
                    ${hotel.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>🛏️ Tipos de Habitación Disponibles</h4>
                <div class="services-list">
                    ${hotel.roomTypes.map(room => `<span class="service-tag">${room}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>📞 Información de Contacto y Ubicación</h4>
                <div class="contact-info">
                    <p><strong>📍 Dirección:</strong> ${hotel.address}</p>
                    <p><strong>📞 Teléfono:</strong> ${hotel.phone}</p>
                    <p><strong>📧 Email:</strong> ${hotel.email}</p>
                    <p><strong>🗺️ Coordenadas:</strong> ${hotel.latitude}, ${hotel.longitude}</p>
                    <p><strong>💰 Precio por noche:</strong> $${hotel.pricePerNight.toLocaleString()} COP</p>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-add-cart-modal" onclick="addHotelToCart(${hotel.id})">🛒 Agregar al Itinerario</button>
                <div style="margin-top: 15px;">
                    <a href="tel:${hotel.phone}" class="contact-button">📞 Llamar</a>
                    <a href="mailto:${hotel.email}" class="contact-button">📧 Email</a>
                </div>
            </div>
        </div>
    `;
}

// Add hotel to cart
async function addHotelToCart(hotelId) {
    if (window.addToCart) {
        const success = await window.addToCart('hotel', hotelId);
        if (success) {
            // Show visual feedback
            const buttons = document.querySelectorAll(`[onclick="addHotelToCart(${hotelId})"]`);
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