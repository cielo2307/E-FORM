// EFORM - Modern JavaScript con ES6+
class EFormApp {
  constructor() {
    this.cart = [];
    this.init();
  }

  // Inicialización de la aplicación
  init() {
    this.loadCart();
    this.setupEventListeners();
    this.updateCartCount();
    this.setupAnimations();
    this.setupFilterButtons();
  }

  // Gestión del carrito con localStorage
  loadCart() {
    try {
      this.cart = JSON.parse(localStorage.getItem('eform_cart')) || [];
    } catch (error) {
      console.warn('Error loading cart:', error);
      this.cart = [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('eform_cart', JSON.stringify(this.cart));
    } catch (error) {
      console.warn('Error saving cart:', error);
    }
  }

  // Utilidades de precio
  parsePriceToNumber(priceText) {
    const digits = (priceText || '').toString().replace(/[^0-9]/g, '');
    return Number(digits || 0);
  }

  formatCurrency(num) {
    return new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP', 
      maximumFractionDigits: 0 
    }).format(num || 0);
  }

  // Actualizar contador del carrito
  updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      const count = this.cart.length;
      cartCountEl.textContent = count;
      cartCountEl.setAttribute('aria-label', `Número de productos en el carrito: ${count}`);
      
      // Animación del contador
      cartCountEl.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartCountEl.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Agregar producto al carrito
  addToCart(product) {
    const productToAdd = {
      ...product,
      id: Date.now() + Math.random(), // ID único
      timestamp: new Date().toISOString()
    };
    
    this.cart.push(productToAdd);
    this.saveCart();
    this.updateCartCount();
    this.showNotification('Producto agregado al carrito', 'success');
  }

  // Eliminar producto del carrito
  removeFromCart(index) {
    if (index >= 0 && index < this.cart.length) {
      const removedProduct = this.cart[index];
      this.cart.splice(index, 1);
      this.saveCart();
      this.updateCartCount();
      this.showNotification(`${removedProduct.title} eliminado`, 'info');
      return true;
    }
    return false;
  }

  // Vaciar carrito
  clearCart() {
    const itemCount = this.cart.length;
    this.cart = [];
    this.saveCart();
    this.updateCartCount();
    this.showNotification(`Carrito vaciado (${itemCount} productos)`, 'info');
  }

  // Sistema de notificaciones
  showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Estilos inline para la notificación
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#10b981' : '#3b82f6',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      fontSize: '14px',
      fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Configurar event listeners
  setupEventListeners() {
    // Botones de agregar al carrito
    this.setupAddButtons();
    
    // Botones de eliminar del carrito
    this.setupRemoveButtons();
    
    // Botón de vaciar carrito
    this.setupClearButton();
    
    // Botón de pagar
    this.setupPayButton();
    
    // Filtros de productos
    this.setupFilterButtons();
  }

  // Configurar botones de agregar
  setupAddButtons() {
    const addButtons = document.querySelectorAll('.agregar');
    addButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.producto');
        if (!card) return;
        
        const title = card.querySelector('h3')?.textContent?.trim() || 'Producto';
        const priceText = card.querySelector('p')?.textContent?.trim() || '$0';
        const img = card.querySelector('img')?.getAttribute('src') || '';
        const price = this.parsePriceToNumber(priceText);
        
        // Deshabilitar botón temporalmente
        btn.disabled = true;
        btn.textContent = 'Agregando...';
        
        setTimeout(() => {
          this.addToCart({ title, price, img });
          btn.disabled = false;
          btn.textContent = 'Agregar';
        }, 500);
      });
    });
  }

  // Configurar botones de eliminar
  setupRemoveButtons() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('btn-remove')) {
        const idx = Number(e.target.getAttribute('data-index'));
        if (this.removeFromCart(idx)) {
          this.renderCartPage();
        }
      }
    });
  }

  // Configurar botón de vaciar carrito
  setupClearButton() {
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showNotification('El carrito ya está vacío', 'info');
          return;
        }
        
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
          this.clearCart();
          this.renderCartPage();
        }
      });
    }
  }

  // Configurar botón de pagar
  setupPayButton() {
    const payBtn = document.getElementById('pay-cart');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showNotification('Tu carrito está vacío', 'info');
          return;
        }
        
        // Simulación de pago
        payBtn.disabled = true;
        payBtn.textContent = 'Procesando...';
        
        setTimeout(() => {
          const total = this.cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
          this.showNotification(`Pago de ${this.formatCurrency(total)} realizado con éxito`, 'success');
          this.clearCart();
          this.renderCartPage();
          
          payBtn.disabled = false;
          payBtn.textContent = 'Pagar';
        }, 2000);
      });
    }
  }

  // Configurar filtros de productos
  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filtros .btn');
    const products = document.querySelectorAll('.producto');
    
    if (filterButtons.length === 0 || products.length === 0) return;
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Actualizar estado activo
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        
        // Filtrar productos (simulado)
        const filter = btn.textContent.trim();
        this.filterProducts(filter, products);
      });
    });
  }

  // Filtrar productos
  filterProducts(filter, products) {
    products.forEach(product => {
      const title = product.querySelector('h3')?.textContent?.toLowerCase() || '';
      
      let shouldShow = true;
      
      if (filter === 'Todos los productos') {
        shouldShow = true;
      } else if (filter === 'Camisas y polos') {
        shouldShow = title.includes('camisa') || title.includes('polo');
      } else if (filter === 'Pantalones') {
        shouldShow = title.includes('pantalón');
      } else if (filter === 'Calzado') {
        shouldShow = title.includes('zapato') || title.includes('tenis');
      } else if (filter === 'Accesorios') {
        shouldShow = !title.includes('camisa') && !title.includes('polo') && !title.includes('pantalón');
      }
      
      // Animar productos
      if (shouldShow) {
        product.style.display = 'block';
        product.style.animation = 'fadeIn 0.5s ease-out';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Renderizar página del carrito
  renderCartPage() {
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const emptyEl = document.getElementById('empty-cart');
    
    if (!list || !totalEl || !emptyEl) return;
    
    list.innerHTML = '';
    
    if (this.cart.length === 0) {
      emptyEl.style.display = 'block';
      totalEl.textContent = this.formatCurrency(0);
    } else {
      emptyEl.style.display = 'none';
      let total = 0;
      
      this.cart.forEach((item, index) => {
        total += Number(item.price || 0);
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="info">
            ${item.img ? `<img src="${item.img}" alt="${item.title}">` : ''}
            <div>
              <strong>${item.title}</strong>
              <div class="price">${this.formatCurrency(item.price)}</div>
            </div>
          </div>
          <button class="btn btn-outline btn-remove" data-index="${index}" aria-label="Eliminar ${item.title}">Eliminar</button>
        `;
        list.appendChild(li);
      });
      
      totalEl.textContent = this.formatCurrency(total);
    }
  }

  // Configurar animaciones al hacer scroll
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.6s ease-out';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.card, .producto').forEach(el => {
      observer.observe(el);
    });
  }

  // Calcular total del carrito
  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  }

  // Obtener resumen del carrito
  getCartSummary() {
    return {
      itemCount: this.cart.length,
      total: this.getCartTotal(),
      items: [...this.cart]
    };
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.eFormApp = new EFormApp();
  
  // Exponer funciones globales para compatibilidad
  window.updateCartCount = () => window.eFormApp.updateCartCount();
  window.addToCart = (product) => window.eFormApp.addToCart(product);
  
  // Renderizar carrito si estamos en la página del carrito
  if (document.getElementById('cart-items')) {
    window.eFormApp.renderCartPage();
  }
});

// Manejar errores globales
window.addEventListener('error', (e) => {
  console.error('EFORM Error:', e.error);
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}
