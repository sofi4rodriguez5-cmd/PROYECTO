// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api/tourism';

// Variables globales
let allPlaces = [];
let currentFilter = 'all';

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Inicializar la aplicación
async function initializeApp() {
    try {
        await loadCityInfo();
        await loadTouristPlaces();
        await loadCategories();
    } catch (error) {
        console.error('Error initializing app:', error);
        // No mostrar error general, cada sección maneja sus propios errores
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación suave
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

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

// Cargar información de la ciudad
async function loadCityInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/city-info`);
        if (!response.ok) throw new Error('Failed to fetch city info');
        
        const cityInfo = await response.json();
        renderCityInfo(cityInfo);
    } catch (error) {
        console.error('Error loading city info:', error);
        document.getElementById('city-info').innerHTML = `
            <div class="no-content">
                <p>La información de la ciudad no está disponible en este momento.</p>
                <p>Por favor, verifica que el servidor esté funcionando correctamente.</p>
            </div>
        `;
    }
}

// Renderizar información de la ciudad
function renderCityInfo(cityInfo) {
    const cityInfoContainer = document.getElementById('city-info');
    
    cityInfoContainer.innerHTML = `
        <p class="city-description">${cityInfo.description}</p>
        <div class="city-details">
            <div class="city-detail-card">
                <h3>📍 Ubicación</h3>
                <p>${cityInfo.location}</p>
            </div>
            <div class="city-detail-card">
                <h3>👥 Población</h3>
                <p>${cityInfo.population.toLocaleString()} habitantes</p>
            </div>
            <div class="city-detail-card">
                <h3>🌡️ Clima</h3>
                <p>${cityInfo.climate}</p>
            </div>
            <div class="city-detail-card">
                <h3>🏛️ Economía y Cultura</h3>
                <p>${cityInfo.history}</p>
            </div>
            <div class="city-detail-card">
                <h3>✨ Características Destacadas</h3>
                <ul class="highlights-list">
                    ${cityInfo.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Cargar lugares turísticos
async function loadTouristPlaces() {
    try {
        const response = await fetch(`${API_BASE_URL}/places`);
        if (!response.ok) throw new Error('Failed to fetch places');
        
        allPlaces = await response.json();
        renderTouristPlaces(allPlaces);
    } catch (error) {
        console.error('Error loading tourist places:', error);
        document.getElementById('places-grid').innerHTML = `
            <div class="no-content">
                <p>Los lugares turísticos no están disponibles en este momento.</p>
                <p>Por favor, verifica que el servidor esté funcionando correctamente.</p>
            </div>
        `;
    }
}

// Cargar categorías
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

// Renderizar filtros de categorías
function renderCategoryFilters(categories) {
    const filtersContainer = document.getElementById('category-filters');
    
    // Mantener el botón "Todos"
    const allButton = filtersContainer.querySelector('[data-category="all"]');
    
    // Agregar botones de categorías
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-category', category);
        button.textContent = category;
        button.addEventListener('click', () => filterPlaces(category));
        filtersContainer.appendChild(button);
    });
    
    // Event listener para el botón "Todos"
    allButton.addEventListener('click', () => filterPlaces('all'));
}

// Filtrar lugares por categoría
function filterPlaces(category) {
    currentFilter = category;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filtrar y renderizar lugares
    const filteredPlaces = category === 'all' 
        ? allPlaces 
        : allPlaces.filter(place => place.category === category);
    
    renderTouristPlaces(filteredPlaces);
}

// Renderizar lugares turísticos
function renderTouristPlaces(places) {
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
        <div class="place-card" onclick="showPlaceDetails(${place.id})">
            <img src="${place.imageUrl}" alt="${place.name}" class="place-image">
            <div class="place-content">
                <h3 class="place-title">${place.name}</h3>
                <span class="place-category">${place.category}</span>
                <p class="place-description">${place.description}</p>
                <p class="place-hours">⏰ ${place.openingHours}</p>
            </div>
        </div>
    `).join('');
}

// Mostrar detalles del lugar en modal
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
        showError('No se pudieron cargar los detalles de este lugar. Intenta nuevamente.');
    }
}

// Renderizar modal del lugar
function renderPlaceModal(place) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}" class="modal-place-image">
        <div class="modal-place-content">
            <h2 class="modal-place-title">${place.name}</h2>
            <span class="modal-place-category">${place.category}</span>
            <p class="modal-place-description">${place.description}</p>
            
            <div class="activities-section">
                <h4>🎯 Actividades</h4>
                <div class="activities-list">
                    ${place.activities.map(activity => `<span class="activity-tag">${activity}</span>`).join('')}
                </div>
            </div>
            
            <div class="location-section">
                <h4>📍 Información de ubicación</h4>
                <div class="location-info">
                    <p><strong>Coordenadas:</strong> ${place.latitude}, ${place.longitude}</p>
                    <p><strong>Horarios:</strong> ${place.openingHours}</p>
                </div>
            </div>
        </div>
    `;
}

// Navegación suave
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 70;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Mostrar errores
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Efectos de scroll para el header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(45, 90, 39, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)';
        header.style.backdropFilter = 'none';
    }
});