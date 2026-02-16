// API Configuration
const API_BASE_URL = 'http://localhost:5000/api/transportation';

// Global variables
let allTransportations = [];
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
        await loadTransportations();
        await loadTransportTypes();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Modal
    const modal = document.getElementById('transport-modal');
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

// Load transportations from API
async function loadTransportations() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch transportations');
        
        allTransportations = await response.json();
        renderTransportations(allTransportations);
    } catch (error) {
        console.error('Error loading transportations:', error);
        document.getElementById('transportation-grid').innerHTML = `
            <div class="no-content">
                <p>Las opciones de transporte no están disponibles en este momento.</p>
                <p>Por favor, verifica que el servidor esté funcionando correctamente.</p>
            </div>
        `;
    }
}

// Load transport types for filters
async function loadTransportTypes() {
    try {
        const response = await fetch(`${API_BASE_URL}/types`);
        if (!response.ok) throw new Error('Failed to fetch transport types');
        
        const transportTypes = await response.json();
        renderTransportFilters(transportTypes);
    } catch (error) {
        console.error('Error loading transport types:', error);
    }
}

// Render transport filter buttons
function renderTransportFilters(transportTypes) {
    const filtersContainer = document.getElementById('transport-filters');
    
    // Keep the "All" button
    const allButton = filtersContainer.querySelector('[data-transport="all"]');
    
    // Add transport type buttons
    transportTypes.forEach(type => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-transport', type);
        button.textContent = type;
        button.addEventListener('click', () => filterTransportations(type));
        filtersContainer.appendChild(button);
    });
    
    // Event listener for "All" button
    allButton.addEventListener('click', () => filterTransportations('all'));
}

// Filter transportations by type
function filterTransportations(type) {
    currentFilter = type;
    
    // Update active buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-transport="${type}"]`).classList.add('active');
    
    // Filter and render transportations
    const filteredTransportations = type === 'all' 
        ? allTransportations 
        : allTransportations.filter(transport => transport.type === type);
    
    renderTransportations(filteredTransportations);
}

// Render transportations as cards
function renderTransportations(transportations) {
    const transportationGrid = document.getElementById('transportation-grid');
    
    if (transportations.length === 0) {
        transportationGrid.innerHTML = `
            <div class="no-content">
                <p>No se encontraron opciones de transporte en esta categoría.</p>
                <p>Intenta seleccionar otra categoría o verifica la conexión.</p>
            </div>
        `;
        return;
    }
    
    transportationGrid.innerHTML = transportations.map(transport => `
        <div class="transport-card">
            <img src="${transport.imageUrl}" alt="${transport.name}" class="transport-image" loading="lazy">
            <div class="transport-content">
                <h3 class="transport-title">${transport.name}</h3>
                <span class="transport-type">${transport.type}</span>
                <div class="transport-price">$${transport.price.toLocaleString()} COP</div>
                <p class="transport-description">${transport.description}</p>
                <p class="transport-route">🚌 ${transport.route}</p>
                <p class="transport-schedule">⏰ ${transport.schedule}</p>
                <div class="card-actions">
                    <button class="btn-info" onclick="showTransportDetails(${transport.id})">Ver información</button>
                    <button class="btn-add-cart" onclick="addTransportToCart(${transport.id})">🛒 Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show transport details in modal
async function showTransportDetails(transportId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${transportId}`);
        if (!response.ok) throw new Error('Failed to fetch transport details');
        
        const transport = await response.json();
        renderTransportModal(transport);
        
        const modal = document.getElementById('transport-modal');
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading transport details:', error);
        showNotification('No se pudieron cargar los detalles de este transporte. Intenta nuevamente.', 'error');
    }
}

// Render transport modal
function renderTransportModal(transport) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${transport.imageUrl}" alt="${transport.name}" class="modal-place-image">
        <div class="modal-place-content">
            <h2 class="modal-place-title">${transport.name}</h2>
            <span class="modal-place-category">${transport.type}</span>
            <div class="transport-price" style="font-size: 1.3rem; margin-bottom: 20px; font-weight: bold; color: #2d5a27;">$${transport.price.toLocaleString()} COP</div>
            <p class="modal-place-description">${transport.description}</p>
            
            <div class="modal-section">
                <h4>🚌 Servicios Incluidos</h4>
                <div class="services-list">
                    ${transport.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>📍 Información de Ruta y Contacto</h4>
                <div class="contact-info">
                    <p><strong>🚌 Tipo de transporte:</strong> ${transport.type}</p>
                    <p><strong>🛣️ Ruta:</strong> ${transport.route}</p>
                    <p><strong>⏰ Horarios:</strong> ${transport.schedule}</p>
                    <p><strong>💰 Precio:</strong> $${transport.price.toLocaleString()} COP</p>
                    <p><strong>📞 Contacto:</strong> ${transport.contact}</p>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-add-cart-modal" onclick="addTransportToCart(${transport.id})">🛒 Agregar al Itinerario</button>
                <div style="margin-top: 15px;">
                    <span class="contact-button">💰 $${transport.price.toLocaleString()}</span>
                    <span class="contact-button">${transport.type}</span>
                </div>
                <div style="margin-top: 10px;">
                    <p style="font-size: 0.9rem; color: #666; margin-top: 15px;"><strong>Contacto:</strong> ${transport.contact}</p>
                </div>
            </div>
        </div>
    `;
}

// Add transport to cart
async function addTransportToCart(transportId) {
    if (window.addToCart) {
        const success = await window.addToCart('transport', transportId);
        if (success) {
            // Show visual feedback
            const buttons = document.querySelectorAll(`[onclick="addTransportToCart(${transportId})"]`);
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