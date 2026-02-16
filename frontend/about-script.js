// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api/tourism';

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito
    if (window.updateCartCount) {
        window.updateCartCount();
    }
    
    loadCityInfo();
});

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