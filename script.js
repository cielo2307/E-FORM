// Utilidades de carrito con localStorage
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function parsePriceToNumber(priceText) {
  // Convierte "$45.000" a 45000
  const digits = (priceText || '').toString().replace(/[^0-9]/g, '');
  return Number(digits || 0);
}

function formatCurrency(num) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num || 0);
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCart().length;
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  updateCartCount();
}

function handleIndexAddButtons() {
  const addButtons = document.querySelectorAll('.agregar');
  if (!addButtons || addButtons.length === 0) return;
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.producto');
      if (!card) return;
      const title = card.querySelector('h3')?.textContent?.trim() || 'Producto';
      const priceText = card.querySelector('p')?.textContent?.trim() || '$0';
      const img = card.querySelector('img')?.getAttribute('src') || '';
      const price = parsePriceToNumber(priceText);
      addToCart({ title, price, img });
    });
  });
}

function renderCartPage() {
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const emptyEl = document.getElementById('empty-cart');
  if (!list || !totalEl || !emptyEl) return; // No estamos en carrito.html

  const cart = getCart();
  list.innerHTML = '';

  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    totalEl.textContent = formatCurrency(0);
  } else {
    emptyEl.style.display = 'none';
    let total = 0;
    cart.forEach((item, index) => {
      total += Number(item.price || 0);
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="info">
          ${item.img ? `<img src="${item.img}" alt="${item.title}">` : ''}
          <div>
            <strong>${item.title}</strong>
            <div class="price">${formatCurrency(item.price)}</div>
          </div>
        </div>
        <button class="btn btn-outline btn-remove" data-index="${index}">Eliminar</button>
      `;
      list.appendChild(li);
    });
    totalEl.textContent = formatCurrency(total);
  }

  // Eliminar individual
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('btn-remove')) {
      const idx = Number(target.getAttribute('data-index'));
      const cart = getCart();
      cart.splice(idx, 1);
      saveCart(cart);
      updateCartCount();
      renderCartPage();
    }
  });

  // Vaciar
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      saveCart([]);
      updateCartCount();
      renderCartPage();
    });
  }

  // Pagar (simulado)
  const payBtn = document.getElementById('pay-cart');
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
      }
      alert('Pago realizado con éxito. ¡Gracias por tu compra!');
      saveCart([]);
      updateCartCount();
      renderCartPage();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  handleIndexAddButtons();
  renderCartPage();
});
