// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Variables globales
let cartId = localStorage.getItem('cartId') || null;
let currentCart = null;
  

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    setupEventListeners();
});

// Inicializar carrito
async function initializeCart() {
    try {
        if (!cartId) {
            await createNewCart();
        } else {
            await loadCart();
        }
        updateCartDisplay();
    } catch (error) {
        console.error('Error initializing cart:', error);
        await createNewCart();
    }
}

// Crear nuevo carrito
async function createNewCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/create`, {
            method: 'POST'
        });
        
        if (!response.ok) throw new Error('Failed to create cart');
        
        currentCart = await response.json();
        cartId = currentCart.id;
        localStorage.setItem('cartId', cartId);
    } catch (error) {
        console.error('Error creating cart:', error);
    }
}

// Cargar carrito existente
async function loadCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${cartId}`);
        
        if (!response.ok) throw new Error('Failed to load cart');
        
        currentCart = await response.json();
    } catch (error) {
        console.error('Error loading cart:', error);
        await createNewCart();
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Limpiar carrito
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    
    // Compartir itinerario
    document.getElementById('share-itinerary').addEventListener('click', shareItinerary);
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    if (!currentCart) return;
    
    const totalItems = currentCart.totalItems || 0;
    const totalPrice = currentCart.totalPrice || 0;
    
    // Actualizar estadísticas
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = `$${totalPrice.toLocaleString()}`;
    document.getElementById('cart-count').textContent = totalItems;
    
    // Mostrar contenido apropiado
    if (totalItems === 0) {
        document.getElementById('empty-cart').style.display = 'block';
        document.getElementById('cart-content').style.display = 'none';
    } else {
        document.getElementById('empty-cart').style.display = 'none';
        document.getElementById('cart-content').style.display = 'block';
        renderCartItems();
    }
}

// Renderizar items del carrito
function renderCartItems() {
    if (!currentCart || !currentCart.itemsByCategory) return;
    
    // Limpiar contenedores
    document.getElementById('places-items').innerHTML = '';
    document.getElementById('hotels-items').innerHTML = '';
    document.getElementById('restaurants-items').innerHTML = '';
    document.getElementById('transport-items').innerHTML = '';
    
    // Ocultar todas las secciones inicialmente
    document.getElementById('places-section').style.display = 'none';
    document.getElementById('hotels-section').style.display = 'none';
    document.getElementById('restaurants-section').style.display = 'none';
    document.getElementById('transport-section').style.display = 'none';
    
    // Renderizar cada categoría
    Object.keys(currentCart.itemsByCategory).forEach(category => {
        const items = currentCart.itemsByCategory[category];
        if (items && items.length > 0) {
            renderCategoryItems(category, items);
        }
    });
}

// Renderizar items de una categoría
function renderCategoryItems(category, items) {
    const sectionId = `${category}s-section`;
    const containerId = `${category}s-items`;
    
    // Mostrar la sección
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = items.map(item => `
        <div class="cart-item">
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-content">
                <h4 class="cart-item-title">${item.name}</h4>
                <span class="cart-item-category">${item.category}</span>
                <p class="cart-item-description">${item.description}</p>
                <div class="cart-item-price">
                    ${item.price > 0 ? `$${item.price.toLocaleString()}` : 'Gratuito'}
                </div>
                <div class="cart-item-actions">
                    <button class="btn-remove" onclick="removeFromCart('${item.id}')">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Eliminar item del carrito
async function removeFromCart(itemId) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${cartId}/items/${itemId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to remove item');
        
        currentCart = await response.json();
        updateCartDisplay();
        showNotification('Elemento eliminado del itinerario', 'success');
    } catch (error) {
        console.error('Error removing item:', error);
        showNotification('Error al eliminar elemento', 'error');
    }
}

// Limpiar carrito completo
async function clearCart() {
    if (!confirm('¿Estás seguro de que quieres limpiar todo tu itinerario?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to clear cart');
        
        currentCart = await response.json();
        updateCartDisplay();
        showNotification('Itinerario limpiado completamente', 'success');
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Error al limpiar el itinerario', 'error');
    }
}

// Compartir itinerario
function shareItinerary() {
    if (!currentCart || currentCart.totalItems === 0) {
        showNotification('No hay elementos en tu itinerario para compartir', 'warning');
        return;
    }
    
    // Crear resumen del itinerario
    let summary = `🌿 Mi Itinerario para Ortega, Tolima\n\n`;
    
    Object.keys(currentCart.itemsByCategory).forEach(category => {
        const items = currentCart.itemsByCategory[category];
        if (items && items.length > 0) {
            const categoryNames = {
                'place': '🏞️ Lugares Turísticos',
                'hotel': '🏨 Alojamiento',
                'restaurant': '🍽️ Restaurantes',
                'transport': '🚌 Transporte'
            };
            
            summary += `${categoryNames[category] || category}:\n`;
            items.forEach(item => {
                summary += `• ${item.name}\n`;
            });
            summary += '\n';
        }
    });
    
    summary += `💰 Costo estimado: $${currentCart.totalPrice.toLocaleString()}\n`;
    summary += `📱 Creado con Descubre Ortega - Turismo en Tolima`;
    
    // Intentar usar la API de compartir nativa
    if (navigator.share) {
        navigator.share({
            title: 'Mi Itinerario - Ortega, Tolima',
            text: summary
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(summary);
        });
    } else {
        fallbackShare(summary);
    }
}

// Compartir alternativo (copiar al portapapeles)
function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Itinerario copiado al portapapeles', 'success');
        }).catch(() => {
            showTextModal(text);
        });
    } else {
        showTextModal(text);
    }
}

// Mostrar modal con texto para copiar manualmente
function showTextModal(text) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <h3>Compartir Itinerario</h3>
            <textarea readonly>${text}</textarea>
            <div class="share-modal-actions">
                <button onclick="this.parentElement.parentElement.parentElement.remove()">Cerrar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función global para agregar al carrito (usada desde otras páginas)
window.addToCart = async function(itemType, itemId) {
    try {
        if (!cartId) {
            await createNewCart();
        }
        
        const response = await fetch(`${API_BASE_URL}/cart/${cartId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemType: itemType,
                itemId: itemId
            })
        });
        
        if (!response.ok) throw new Error('Failed to add item');
        
        currentCart = await response.json();
        
        // Actualizar contador en todas las páginas
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = currentCart.totalItems || 0;
        }
        
        showNotification('Elemento agregado al itinerario', 'success');
        
        return true;
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error al agregar elemento', 'error');
        return false;
    }
};

// Función para obtener el carrito actual (usada desde otras páginas)
window.getCurrentCart = function() {
    return currentCart;
};

// Función para actualizar contador del carrito (usada desde otras páginas)
window.updateCartCount = async function() {
    try {
        if (cartId) {
            await loadCart();
            const cartCount = document.getElementById('cart-count');
            if (cartCount && currentCart) {
                cartCount.textContent = currentCart.totalItems || 0;
            }
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
};