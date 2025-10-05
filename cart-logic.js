// Функция для рендеринга корзины с кнопкой "ЗАПРОСИТЬ ЦЕНУ"
function renderCartItems() {
    const items = JSON.parse(localStorage.getItem('rusky_cart') || '[]');
    const container = document.getElementById('cartItems');
    const empty = document.getElementById('cartEmpty');
    const totalEl = document.getElementById('cartTotal') || document.querySelector('.total-amount');
    
    if (!container || !empty) return;
    container.innerHTML = '';
    let total = 0;

    if (!items.length) {
        empty.style.display = 'flex';
        if (totalEl) totalEl.textContent = '0 ₽';
        return;
    }
    empty.style.display = 'none';

    // Создаем заголовок таблицы
    const header = document.createElement('div');
    header.className = 'cart-table-header';
    header.innerHTML = `
        <div class="cart-header-cell">Наименование</div>
        <div class="cart-header-cell">Количество</div>
        <div class="cart-header-cell">Цена</div>
        <div class="cart-header-close"></div>
    `;
    container.appendChild(header);

    items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-table-row';
        const qty = item.qty || 1;
        const price = item.price || 0;
        const itemTotal = price * qty;

        if (item.type !== 'satellite') {
            total += itemTotal;
        }

        const itemName = item.name || item.id || 'Неизвестный товар';
        const itemImage = item.image || item.img || 'placeholder.png';

        row.innerHTML = `
            <div class="cart-item-info">
                <img src="${itemImage}" alt="${itemName}" class="cart-item-image" onerror="this.style.display='none'"/>
                <span class="cart-item-name">${itemName}</span>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-action="dec">−</button>
                <span class="quantity-value">${String(qty).padStart(2,'0')}</span>
                <button class="quantity-btn" data-action="inc">+</button>
            </div>
            <div class="cart-item-price">
                ${item.type === 'satellite' ? 
                    `<button class="btn btn-outline" onclick="window.location.href='request.html'">ЗАПРОСИТЬ ЦЕНУ</button>` : 
                    (price > 0 ? `<span class="price-amount">${formatPrice(itemTotal)} ₽</span>` : 
                    `<button class="btn btn-outline" onclick="window.location.href='request.html'">ЗАПРОСИТЬ ЦЕНУ</button>`)}
            </div>
            <button class="cart-item-remove">×</button>
        `;

        // Добавляем обработчики событий
        row.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cart = JSON.parse(localStorage.getItem('rusky_cart') || '[]');
                const idx = cart.findIndex(i => i.id === item.id);
                if (idx < 0) return;
                const action = btn.getAttribute('data-action');
                if (action === 'inc') cart[idx].qty = (cart[idx].qty || 1) + 1;
                if (action === 'dec') cart[idx].qty = Math.max(1, (cart[idx].qty || 1) - 1);
                localStorage.setItem('rusky_cart', JSON.stringify(cart));
                renderCartItems();
                window.updateCartBadge();
            });
        });

        row.querySelector('.cart-item-remove').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('rusky_cart') || '[]');
            const updated = cart.filter(i => i.id !== item.id);
            localStorage.setItem('rusky_cart', JSON.stringify(updated));
            renderCartItems();
            window.updateCartBadge();
        });

        container.appendChild(row);
    });

    // Обновляем общую сумму
    if (totalEl) {
        const hasSatellites = items.some(item => item.type === 'satellite');
        const hasEquipment = items.some(item => item.type !== 'satellite');
        
        if (hasEquipment && total > 0) {
            totalEl.textContent = formatPrice(total) + ' ₽';
        } else {
            totalEl.textContent = '0 ₽';
        }
    }
}

// Заменяем оригинальную функцию рендеринга корзины
if (typeof window.renderCart === 'function') {
    window.renderCart = renderCartItems;
}

// Инициализируем корзину при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartItems')) {
        renderCartItems();
    }
});