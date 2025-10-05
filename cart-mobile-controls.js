(function(){
  const MOBILE_MAX = 768; // <=768px — мобильная версия

  // Словарь, где будем хранить оригинальные позиции элементов для восстановления
  const originals = new WeakMap();

  function storeOriginal(removeEl) {
    if (originals.has(removeEl)) return;
    const parent = removeEl.parentElement;
    const next = removeEl.nextElementSibling;
    originals.set(removeEl, { parent, next });
  }

  function restoreOriginal(removeEl) {
    const info = originals.get(removeEl);
    if (!info) return;
    const { parent, next } = info;
    // Вставляем назад на исходную позицию (перед next или в конец)
    if (parent) {
      if (next && parent.contains(next)) parent.insertBefore(removeEl, next);
      else parent.appendChild(removeEl);
    }
    originals.delete(removeEl);
  }

  function processCartItems() {
    // Для каждой строки корзины перемещаем кнопку внутрь qty (на мобилке)
    document.querySelectorAll('.cart-table-row').forEach(row => {
      const qty = row.querySelector('.cart-item-quantity');
      const remove = row.querySelector('.cart-item-remove');

      if (!qty || !remove) return;

      // Сохраним исходную позицию один раз
      storeOriginal(remove);

      if (window.innerWidth <= MOBILE_MAX) {
        // Если ещё не внутри qty — переместим
        if (!qty.contains(remove)) {
          // Создаём обёртку для кнопок количества, если её ещё нет
          let qtyGroup = qty.querySelector('.qty-buttons-group');
          if (!qtyGroup) {
            qtyGroup = document.createElement('div');
            qtyGroup.className = 'qty-buttons-group';
            qtyGroup.style.cssText = 'display: flex; align-items: center; gap: 8px;';
            
            // Перемещаем все существующие дочерние элементы в группу
            while (qty.firstChild) {
              qtyGroup.appendChild(qty.firstChild);
            }
            qty.appendChild(qtyGroup);
          }
          
          // Добавляем кнопку удаления в конец контейнера (правый край)
          qty.appendChild(remove);
        }
      } else {
        // На десктопе: восстановим на прежнее место
        restoreOriginal(remove);
        
        // Убираем группировку на десктопе
        const qtyGroup = qty.querySelector('.qty-buttons-group');
        if (qtyGroup) {
          while (qtyGroup.firstChild) {
            qty.insertBefore(qtyGroup.firstChild, qtyGroup);
          }
          qtyGroup.remove();
        }
      }
    });
  }

  // Debounce для оптимальности
  function debounce(fn, wait = 80){
    let t;
    return function(){ clearTimeout(t); t = setTimeout(fn, wait); };
  }

  const run = debounce(processCartItems, 80);

  // Запускаем при загрузке и изменениях размера/ориентации
  window.addEventListener('load', run, { passive:true });
  window.addEventListener('resize', run, { passive:true });
  window.addEventListener('orientationchange', run, { passive:true });

  // Если корзина динамически обновляется, наблюдаем за изменениями
  const cartRoot = document.querySelector('.cart-items') || document.querySelector('.cart-box');
  if (cartRoot) {
    const mo = new MutationObserver(debounce(() => {
      processCartItems();
    }, 120));
    mo.observe(cartRoot, { childList: true, subtree: true });
  } else {
    // Фоллбек: вызвать один раз через небольшой таймаут
    setTimeout(processCartItems, 200);
  }
})();