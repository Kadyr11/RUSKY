// Функция для перехода к деталям спутника
function goToSatelliteDetail(satelliteType) {
    console.log(`Переход к деталям спутника: ${satelliteType}`);
    
    // Карта соответствия типов спутников и страниц товаров
    const satellitePages = {
        'CLAY-CUBE': 'product-1.html',
        'CLAY-COM': 'clay-com-detail.html', 
        'CLAY-NAV': 'product-3.html',
        'CLAY-SCI': 'product-4.html'
    };
    
    // Проверяем есть ли страница для данного типа спутника
    if (satellitePages[satelliteType]) {
        window.location.href = satellitePages[satelliteType];
    } else {
        console.error(`Страница для спутника ${satelliteType} не найдена`);
        // Переход к общему каталогу спутников
        window.location.href = 'satellites.html';
    }
}

// Функция для просмотра модуля
function viewModule(moduleId, moduleName, moduleImage) {
    console.log(`Просмотр модуля: ${moduleName} (ID: ${moduleId})`);
    
    // Создаем модальное окно для просмотра модуля
    const modal = document.createElement('div');
    modal.className = 'view-module-modal';
    modal.innerHTML = `
        <div class="view-module-content">
            <div class="view-module-header">
                <h2>${moduleName}</h2>
                <button class="view-module-close" onclick="closeViewModule()">&times;</button>
            </div>
            <div class="view-module-body">
                <div class="view-module-image">
                    <img src="${moduleImage}" alt="${moduleName}">
                </div>
                <div class="view-module-info">
                    <h3>Информация о модуле</h3>
                    <p>Подробная техническая информация о спутниковом модуле ${moduleName}.</p>
                    <div class="view-module-actions">
                        <button class="view-module-btn primary" onclick="addToCart('${moduleId}', '${moduleName}', 0, '${moduleImage}', 'satellite')">Добавить в корзину</button>
                        <button class="view-module-btn secondary" onclick="closeViewModule()">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Добавляем анимацию появления
    setTimeout(() => {
        modal.classList.add('modal-open');
    }, 10);
}

function closeViewModule() {
    const modal = document.querySelector('.view-module-modal');
    if (modal) {
        modal.classList.remove('modal-open');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 200);
    }
}

// Функции для работы с модальными окнами
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Автоматически раскрываем dropdown при открытии модального окна
        const dropdown = modal.querySelector('.feature-modal-dropdown');
        if (dropdown) {
            dropdown.classList.add('open');
        }
        
        // Добавляем анимацию появления
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
        
        console.log(`Модальное окно ${modalId} открыто`);
    } else {
        console.error(`Модальное окно с ID ${modalId} не найдено`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal-open');
        
        // Сбрасываем состояние dropdown при закрытии
        const dropdown = modal.querySelector('.feature-modal-dropdown');
        if (dropdown) {
            dropdown.classList.remove('open');
        }
        
        // Добавляем задержку для анимации закрытия
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 200);
        
        console.log(`Модальное окно ${modalId} закрыто`);
    } else {
        console.error(`Модальное окно с ID ${modalId} не найдено`);
    }
}

// Функция для переключения выпадающего блока в модальных окнах
function toggleFeatureDropdown(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const dropdown = modal.querySelector('.feature-modal-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('open');
            console.log(`Выпадающий блок в ${modalId} переключен`);
        }
    }
}

// BURGER MENU FUNCTIONALITY
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (burgerMenu && mobileNav) {
        // Убираем onclick из HTML и добавляем обработчик только через JavaScript
        burgerMenu.removeAttribute('onclick');
        
        burgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
            console.log('Бургер-меню: клик обработан');
        });
        
        // Закрытие меню при клике на ссылку
        const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Закрытие меню при изменении размера экрана
        window.addEventListener('resize', function() {
            if (window.innerWidth > 967) {
                closeMobileMenu();
            }
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
                if (mobileNav.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
        
        console.log('Бургер-меню инициализировано успешно');
    } else {
        console.error('Элементы бургер-меню не найдены:', {
            burgerMenu: !!burgerMenu,
            mobileNav: !!mobileNav
        });
    }
}

function toggleMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (burgerMenu && mobileNav) {
        const isActive = burgerMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
        
        console.log('Меню переключено:', isActive ? 'закрыто' : 'открыто');
    } else {
        console.error('Элементы меню не найдены при переключении');
    }
}

function openMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (burgerMenu && mobileNav) {
        burgerMenu.classList.add('active');
        mobileNav.classList.add('active');
        body.classList.add('mobile-menu-open');
        
        // Принудительно показываем меню
        mobileNav.style.display = 'block';
        
        console.log('Мобильное меню открыто');
    }
}

function closeMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (burgerMenu && mobileNav) {
        burgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('mobile-menu-open');
        
        // Скрываем меню через небольшую задержку для анимации
        setTimeout(() => {
            if (!mobileNav.classList.contains('active')) {
                mobileNav.style.display = 'none';
            }
        }, 300);
        
        console.log('Мобильное меню закрыто');
    }
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Закрытие модального окна фильтра при клике вне его
    if (event.target.classList.contains('filter-modal')) {
        if (event.target.id === 'filterModal') {
            closeFilterModal();
        } else if (event.target.id === 'documentationModal') {
            closeDocumentationModal();
        }
    }
}

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Закрытие обычных модальных окон
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Закрытие модального окна фильтра
        const filterModal = document.getElementById('filterModal');
        if (filterModal && filterModal.style.display === 'block') {
            closeFilterModal();
        }
        
        // Закрытие модального окна документации
        const documentationModal = document.getElementById('documentationModal');
        if (documentationModal && documentationModal.style.display === 'block') {
            closeDocumentationModal();
        }
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт RUSKY загружен успешно!');
    
    // Инициализация бургер-меню
    initBurgerMenu();
    
    // Добавляем обработчики для кнопок закрытия
    document.querySelectorAll('.feature-modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Предотвращаем всплытие события
        });
    });
    
    // Добавляем обработчик для карточки CLAY-COM
    const clayComCard = document.querySelector('.box.clickable');
    if (clayComCard) {
        console.log('Карточка CLAY-COM найдена, добавляем обработчик');
        clayComCard.addEventListener('click', function(e) {
            console.log('Клик по карточке CLAY-COM');
            e.preventDefault();
            goToSatelliteDetail('CLAY-COM');
        });
    } else {
        console.log('Карточка CLAY-COM не найдена!');
    }
    
    // Инициализация hover эффектов для feature-arrow элементов
    const featureArrows = document.querySelectorAll('.feature-arrow');
    
    console.log(`Найдено ${featureArrows.length} элементов .feature-arrow`);
    
    featureArrows.forEach((arrow, index) => {
        console.log(`Элемент ${index + 1}:`, {
            innerHTML: arrow.innerHTML,
            className: arrow.className,
            offsetTop: arrow.offsetTop,
            offsetLeft: arrow.offsetLeft,
            offsetWidth: arrow.offsetWidth,
            offsetHeight: arrow.offsetHeight,
            parent: arrow.parentElement.className,
            computedStyles: {
                position: getComputedStyle(arrow).position,
                top: getComputedStyle(arrow).top,
                left: getComputedStyle(arrow).left,
                width: getComputedStyle(arrow).width,
                height: getComputedStyle(arrow).height,
                zIndex: getComputedStyle(arrow).zIndex,
                transform: getComputedStyle(arrow).transform
            }
        });
        
        arrow.addEventListener('mouseenter', function() {
            console.log(`Hover начался на элементе ${index + 1}: "${arrow.querySelector('span').textContent}"`);
            console.log('Размеры элемента при hover:', {
                width: arrow.offsetWidth,
                height: arrow.offsetHeight,
                top: arrow.offsetTop,
                left: arrow.offsetLeft
            });
        });
        
        arrow.addEventListener('mouseleave', function() {
            console.log(`Hover завершился на элементе ${index + 1}: "${arrow.querySelector('span').textContent}"`);
        });
        
        arrow.addEventListener('click', function() {
            console.log(`Клик на элементе ${index + 1}: "${arrow.querySelector('span').textContent}"`);
        });
    });
    
    // Проверка существования модальных окон
    const modals = ['scientificModal', 'launchModal', 'configModal', 'coverageModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            console.log(`Модальное окно ${modalId} найдено`);
        } else {
            console.error(`Модальное окно ${modalId} НЕ найдено`);
        }
    });
    
    // Диагностика: отслеживание изменений layout
    const statsNumbers = document.querySelector('.stats-numbers');
    const statsHeader = document.querySelector('.stats-header');
    const statsYear = document.querySelector('.stats-year');
    
    if (statsNumbers) {
        console.log('stats-numbers позиция:', {
            top: statsNumbers.offsetTop,
            left: statsNumbers.offsetLeft,
            width: statsNumbers.offsetWidth,
            height: statsNumbers.offsetHeight
        });
    }
    
    if (statsHeader) {
        console.log('stats-header позиция:', {
            top: statsHeader.offsetTop,
            left: statsHeader.offsetLeft,
            width: statsHeader.offsetWidth,
            height: statsHeader.offsetHeight
        });
    }
    
    if (statsYear) {
        console.log('stats-year позиция:', {
            top: statsYear.offsetTop,
            left: statsYear.offsetLeft,
            width: statsYear.offsetWidth,
            height: statsYear.offsetHeight
        });
    }
});

// Глобальное объявление функций для доступа из HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleFeatureDropdown = toggleFeatureDropdown;
window.toggleMobileMenu = toggleMobileMenu;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// Функции для модального окна фильтра
function openFilterModal() {
    const modal = document.getElementById('filterModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Модальное окно фильтра открыто');
    }
}

function closeFilterModal() {
    const modal = document.getElementById('filterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Модальное окно фильтра закрыто');
    }
}

function toggleFilterSection(element) {
    const section = element.closest('.filter-section');
    section.classList.toggle('collapsed');
}

function toggleCheckbox(option) {
    const checkbox = option.querySelector('.filter-checkbox');
    checkbox.classList.toggle('checked');
}

// Универсальная функция для переключения фильтров (работает на всех страницах)
function toggleFilter(option) {
    toggleCheckbox(option);
}

function applyFilters() {
    const checkedOptions = document.querySelectorAll('.filter-checkbox.checked');
    const selectedFilters = [];
    
    checkedOptions.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        selectedFilters.push(label);
    });
    
    console.log('Применены фильтры:', selectedFilters);

    // Определяем страницу карточки товара по набору фильтров
    const target = resolveProductByFilters(selectedFilters);
    if (target) {
        closeFilterModal();
        setTimeout(() => window.location.href = target, 100);
        return;
    }

    // Если явного совпадения нет — ведём на общий каталог
    closeFilterModal();
    window.location.href = 'satellites.html';
}

// Добавляем функции в глобальную область видимости
window.openFilterModal = openFilterModal;
window.closeFilterModal = closeFilterModal;
window.toggleFilterSection = toggleFilterSection;
window.toggleCheckbox = toggleCheckbox;
window.toggleFilter = toggleFilter;
window.applyFilters = applyFilters;

// Подбор карточки по выбранным фильтрам
function resolveProductByFilters(filters) {
    // Нормализуем
    const f = (filters || []).map(s => s.toLowerCase());

    // Приоритет по типу спутника
    if (f.includes('коммуникационный')) return 'clay-com-detail.html';
    if (f.includes('навигационный')) return 'product-3.html';
    if (f.includes('научный')) return 'product-4.html';
    if (f.includes('военный')) return 'product-8.html';
    if (f.includes('наноспутник')) return 'product-1.html';

    // По орбите
    if (f.includes('geo (геостационарная)') || f.includes('geo (геостационарная)')) return 'product-1.html';
    if (f.includes('leo (низкая)')) return 'product-5.html';
    if (f.includes('meo (средняя)')) return 'product-3.html';
    if (f.includes('heo (высокоэллиптическая)')) return 'product-9.html';

    // По бренду (примерная логика)
    if (f.includes('clayspace')) return 'clay-com-detail.html';
    if (f.includes('nasa и др.')) return 'product-4.html';
    if (f.includes('airbus')) return 'product-1.html';
    if (f.includes('spacex')) return 'product-6.html';

    // По статусу
    if (f.includes('готов к запуску')) return 'product-5.html';
    if (f.includes('в эксплуатации')) return 'product-1.html';

    return null;
}

window.resolveProductByFilters = resolveProductByFilters;

// Функции для модального окна документации
function openDocumentationModal() {
    const modal = document.getElementById('documentationModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Модальное окно документации открыто');
    }
}

function closeDocumentationModal() {
    const modal = document.getElementById('documentationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Модальное окно документации закрыто');
    }
}

function applyDocumentationFilters() {
    const modal = document.getElementById('documentationModal');
    if (!modal) return;
    
    // Получаем все выбранные типы спутников из элементов с data-satellite атрибутом
    const satelliteTypes = [];
    const typeElements = modal.querySelectorAll('[data-satellite]');
    
    typeElements.forEach(element => {
        const checkbox = element.querySelector('.filter-checkbox');
        if (checkbox && checkbox.classList.contains('checked')) {
            satelliteTypes.push(element.getAttribute('data-satellite'));
        }
    });
    
    // Получаем выбранные годы выпуска
    const releaseYears = [];
    const yearCheckboxes = modal.querySelectorAll('input[name="release-year"]:checked');
    yearCheckboxes.forEach(checkbox => {
        releaseYears.push(checkbox.value);
    });
    
    // Получаем выбранные статусы
    const statuses = [];
    const statusCheckboxes = modal.querySelectorAll('input[name="status"]:checked');
    statusCheckboxes.forEach(checkbox => {
        statuses.push(checkbox.value);
    });
    
    // Получаем серийный номер для поиска
    const serialNumber = modal.querySelector('.serial-search-input')?.value.trim();
    
    console.log('Фильтры документации:', {
        satelliteTypes,
        releaseYears,
        statuses,
        serialNumber
    });
    
    // Логика определения какую страницу открыть
    if (serialNumber) {
        // Если введен серийный номер, определяем тип спутника по номеру
        const docPage = getDocumentBySerialNumber(serialNumber);
        if (docPage) {
            window.location.href = docPage;
            closeDocumentationModal();
            return;
        }
    }
    
    // Если выбран хотя бы один тип спутника, открываем страницу первого выбранного
    if (satelliteTypes.length > 0) {
        const docPages = {
            'clay-com': 'doc-clay-com.html',
            'clay-nav': 'doc-clay-nav.html',
            'clay-sci': 'doc-clay-sci.html',
            'clay-cube': 'doc-clay-cube.html'
        };
        
        // Берем первый выбранный тип спутника
        const selectedType = satelliteTypes[0];
        if (docPages[selectedType]) {
            window.location.href = docPages[selectedType];
            closeDocumentationModal();
            return;
        }
    }
    
    // В остальных случаях открываем общую страницу документации
    window.location.href = 'documentation.html';
    closeDocumentationModal();
}

// Добавляем функции документации в глобальную область видимости
window.openDocumentationModal = openDocumentationModal;
window.closeDocumentationModal = closeDocumentationModal;
window.applyDocumentationFilters = applyDocumentationFilters;

// Throttle функция для оптимизации производительности
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Добавляем lazy loading для изображений
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Инициализация дополнительных функций
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    
    // Добавляем обработчики для фильтров спутников
    setupSatelliteFilters();

    // Кнопки "ПРОСМОТРЕТЬ МОДУЛЬ" в каталоге
    setupCatalogButtons();

    // Кнопки добавления в корзину на страницах товара
    setupProductAddToCartButtons();

    // Рендер корзины на странице cart
    if (document.body.classList.contains('cart-page-body')) {
        cleanCart(); // Очищаем некорректные записи при загрузке страницы корзины
        renderCart();
    }

    // Навигация по иконке корзины и бейдж количества
    setupCartIcon();
    updateCartBadge();

    // Сабмит форм запроса цены
    setupRequestForms();

    // Проставляем ссылку на страницу запусков в меню
    setupLaunchLinks();

    // Инициализация страницы запусков
    initLaunchesCarousel();
});

// Функция для настройки обработчиков фильтров спутников
function setupSatelliteFilters() {
    // Добавляем обработчики событий для всех элементов фильтра спутников
    document.addEventListener('click', function(event) {
        const satelliteWrapper = event.target.closest('[data-satellite]');
        if (satelliteWrapper) {
            const satelliteType = satelliteWrapper.getAttribute('data-satellite');
            
            // Предотвращаем стандартное поведение
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            
            console.log(`Клик по спутнику: ${satelliteType}`);
            console.log('Элемент:', satelliteWrapper);
            console.log('Событие:', event);
            
            // Вызываем функцию выбора спутника
            selectSatelliteType(satelliteType, event);
            
            return false;
        }
    });
    
    console.log('Обработчики фильтров спутников настроены');
}

// Навигация по кнопкам каталога оборудования
function setupCatalogButtons() {
    // Проверяем, находимся ли на странице каталога оборудования
    if (window.location.pathname.includes('equipment.html')) {
        // Для страницы каталога оборудования, кнопки уже настроены через href в HTML
        // Ничего дополнительного делать не нужно
        return;
    }
    
    // Для других страниц (спутники) - оставляем старое поведение
    const cards = document.querySelectorAll('.catalog-card');
    if (!cards.length) return;
    const targets = [
        'product-1.html',
        'clay-com-detail.html',
        'product-3.html',
        'product-4.html',
        'product-5.html',
        'product-6.html',
        'product-7.html',
        'product-8.html',
        'product-9.html'
    ];

    cards.forEach((card, index) => {
        const button = card.querySelector('.catalog-btn');
        if (!button) return;
        const target = targets[index] || 'clay-com-detail.html';
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = target;
        });
    });
}

// Documentation filter functionality
function redirectToDoc(docType) {
    const docPages = {
        'clay-com': 'doc-clay-com.html',
        'clay-nav': 'doc-clay-nav.html', 
        'clay-sci': 'doc-clay-sci.html',
        'clay-cube': 'doc-clay-cube.html'
    };
    
    if (docPages[docType]) {
        window.location.href = docPages[docType];
    }
    // Закрываем именно модальное окно документации
    closeDocumentationModal();
}

// Функция для определения документа по серийному номеру
function getDocumentBySerialNumber(serialNumber) {
    // Правила определения типа спутника по серийному номеру
    const serialRules = {
        'clay-com': /^(COM|24990|25)/i,    // Коммуникационные: начинаются с COM или 24990, 25xxx
        'clay-nav': /^(NAV|26|27)/i,       // Навигационные: начинаются с NAV или 26xxx, 27xxx  
        'clay-sci': /^(SCI|28|29)/i,       // Научные: начинаются с SCI или 28xxx, 29xxx
        'clay-cube': /^(CUBE|SN|20)/i      // Универсальные: начинаются с CUBE, SN или 20xxx
    };
    
    const docPages = {
        'clay-com': 'doc-clay-com.html',
        'clay-nav': 'doc-clay-nav.html',
        'clay-sci': 'doc-clay-sci.html',
        'clay-cube': 'doc-clay-cube.html'
    };
    
    for (const [type, pattern] of Object.entries(serialRules)) {
        if (pattern.test(serialNumber)) {
            return docPages[type];
        }
    }
    
    return null; // Серийный номер не распознан
}

// Make functions globally available
// ВАЖНО: не переопределяем глобальные openModal/closeModal для общих модалок
window.redirectToDoc = redirectToDoc;
window.applyDocumentationFilters = applyDocumentationFilters;
window.getDocumentBySerialNumber = getDocumentBySerialNumber;

// Функция для быстрого выбора типа спутника
function selectSatelliteType(satelliteType, event) {
    // Предотвращаем стандартное поведение чекбокса и всплытие событий
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    // Если клик произошел внутри модального окна документации, просто переключаем чекбокс и ждём нажатия "Применить"
    const inDocumentationModal = event && event.target && event.target.closest && event.target.closest('#documentationModal');
    if (inDocumentationModal) {
        const wrapper = event.target.closest('[data-satellite]');
        if (wrapper) {
            const checkbox = wrapper.querySelector('.filter-checkbox');
            if (checkbox) checkbox.classList.toggle('checked');
        }
        return false;
    }

    const docPages = {
        'clay-com': 'doc-clay-com.html',
        'clay-nav': 'doc-clay-nav.html',
        'clay-sci': 'doc-clay-sci.html',
        'clay-cube': 'doc-clay-cube.html'
    };
    
    console.log(`Выбран тип спутника: ${satelliteType}`);
    
    if (docPages[satelliteType]) {
        // Закрываем модальные окна перед переходом
        closeDocumentationModal();
        closeFilterModal();
        
        // Делаем переход после небольшой задержки
        setTimeout(() => {
            window.location.href = docPages[satelliteType];
        }, 100);
    }
    
    return false; // Дополнительно предотвращаем стандартное поведение
}

// Добавляем функцию в глобальную область видимости
window.selectSatelliteType = selectSatelliteType;


window.setupSatelliteFilters = setupSatelliteFilters;



// ---------------- CART LOGIC -----------------
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('rusky_cart') || '[]');
    } catch (e) {
        return [];
    }
}

function saveCart(items) {
    localStorage.setItem('rusky_cart', JSON.stringify(items));
}

// Обновленная функция добавления в корзину с ценой
function addToCart(id, name, price, image, type) {
    const cart = getCart();
    const item = {
        id: id,
        name: name,
        price: price,
        image: image,
        type: type || 'equipment', // по умолчанию оборудование
        qty: 1
    };
    
    const idx = cart.findIndex(i => i.id === item.id);
    if (idx >= 0) {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
    } else {
        cart.push(item);
    }
    saveCart(cart);
    updateCartBadge();
    
    // Показать уведомление
    showCartNotification(name);
}

// Функция очистки корзины от некорректных записей
function cleanCart() {
    const cart = getCart();
    const cleanedCart = cart.filter(item => {
        // Удаляем записи без названия или с undefined, или [object Object]
        return item && 
               item.id && 
               item.name && 
               item.name !== 'undefined' && 
               item.name !== '[object Object]' &&
               typeof item.name === 'string';
    });
    
    if (cleanedCart.length !== cart.length) {
        console.log('Очищено записей:', cart.length - cleanedCart.length);
        saveCart(cleanedCart);
        updateCartBadge();
    }
}

// Функция полной очистки корзины
function clearCart() {
    saveCart([]);
    updateCartBadge();
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

// Принудительная очистка корзины (удаляет все данные)
function forceClearCart() {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
        localStorage.removeItem('ruskyCart');
        updateCartBadge();
        if (typeof renderCart === 'function') {
            renderCart();
        }
        alert('Корзина очищена!');
    }
}

// Глобальный доступ к функциям очистки
window.clearCart = clearCart;
window.forceClearCart = forceClearCart;

// Показать уведомление о добавлении товара
function showCartNotification(productName) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>✓ ${productName} добавлен в корзину</span>
        </div>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Удаление через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Старая функция для совместимости
function addToCartOld(item) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === item.id);
    if (idx >= 0) {
        cart[idx].qty = (cart[idx].qty || 1) + (item.qty || 1);
    } else {
        cart.push({ ...item, qty: item.qty || 1 });
    }
    saveCart(cart);
    updateCartBadge();
}

function addCurrentProductToCartAndGo() {
    const name = document.querySelector('.product-title')?.innerText?.replace(/\n/g, ' ').trim() || 'Спутник';
    const img = document.querySelector('.product-main-image img')?.getAttribute('src') || '';
    const id = window.location.pathname.split('/').pop();
    addToCart({ id, name, image: img, qty: 1 });
    window.location.href = 'cart.html';
}

function setupProductAddToCartButtons() {
    const buttons = document.querySelectorAll('[data-add-to-cart], .btn-add-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addCurrentProductToCartAndGo();
        });
    });
}

function renderCart() {
    // Очищаем корзину от некорректных записей
    cleanCart();
    
    const items = getCart();
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
        
        // Для спутников не учитываем цену в общей сумме
        if (item.type !== 'satellite') {
            total += itemTotal;
        }
        
        // Обработка неполных данных товара
        const itemName = item.name || item.id || 'Неизвестный товар';
        const itemImage = item.image || item.img || 'placeholder.png';
        
        row.innerHTML = `
            <div class="cart-item-info">
              <img src="${itemImage}" alt="${itemName}" class="cart-item-image" onerror="this.style.display='none'"/>
              <span class="cart-item-name">${itemName}</span>
            </div>
            <div class="cart-item-price">
              ${item.type === 'satellite' ? `<span class="price-request">Цена по запросу</span>` : 
                (price > 0 ? `<span class="price-amount">${formatPrice(itemTotal)} ₽</span>` : `<button class="cart-request-in-row">Запросить цену</button>`)}
            </div>
            <div class="cart-item-quantity">
              <button class="quantity-btn" data-action="dec">−</button>
              <span class="quantity-value">${String(qty).padStart(2,'0')}</span>
              <button class="quantity-btn" data-action="inc">+</button>
            </div>
            <div class="cart-item-total">
              ${item.type === 'satellite' ? `<span class="price-request">Цена по запросу</span>` : 
                (price > 0 ? `<span class="price-amount">${formatPrice(itemTotal)} ₽</span>` : `<button class="cart-request-in-row">Запросить цену</button>`)}
            </div>
            <button class="cart-item-remove">×</button>
        `;

        row.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cart = getCart();
                const idx = cart.findIndex(i => i.id === item.id);
                if (idx < 0) return;
                const action = btn.getAttribute('data-action');
                if (action === 'inc') cart[idx].qty = (cart[idx].qty || 1) + 1;
                if (action === 'dec') cart[idx].qty = Math.max(1, (cart[idx].qty || 1) - 1);
                saveCart(cart);
                renderCart();
                updateCartBadge();
            });
        });

        row.querySelector('.cart-item-remove').addEventListener('click', () => {
            const updated = getCart().filter(i => i.id !== item.id);
            saveCart(updated);
            renderCart();
            updateCartBadge();
        });

        // Вызов формы по кнопке "Запросить цену" внутри строки
        const rq = row.querySelector('.cart-request-in-row');
        if (rq) rq.addEventListener('click', () => requestQuote());

        container.appendChild(row);
    });

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

// Глобальные экспорты корзины
window.addCurrentProductToCartAndGo = addCurrentProductToCartAndGo;
window.renderCart = renderCart;
window.requestQuote = function requestQuote() {
    // Перенаправляем на отдельную страницу запроса цены
    window.location.href = 'request.html';
};

// -------- Cart icon + badge --------
function setupCartIcon() {
    document.querySelectorAll('.cart-icon').forEach(el => {
        el.style.cursor = 'pointer';
        // If this is an anchor without href to cart.html, fix it
        if (el.tagName.toLowerCase() === 'a') {
            el.setAttribute('href', 'cart.html');
        } else {
            el.addEventListener('click', () => window.location.href = 'cart.html');
        }

        // Ensure badge exists
        if (!el.querySelector('.cart-badge')) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = '0';
            el.appendChild(badge);
        }
    });
}

function updateCartBadge() {
    const totalQty = getCart().reduce((sum, it) => sum + (it.qty || 1), 0);
    document.querySelectorAll('.cart-icon .cart-badge').forEach(badge => {
        if (totalQty > 0) {
            badge.style.display = 'block';
            badge.textContent = totalQty;
        } else {
            badge.style.display = 'none';
        }
    });
}

// Устанавливаем href на пункт "ЗАПУСК"/"ЗАПУСКИ" в меню
function setupLaunchLinks() {
    document.querySelectorAll('a').forEach(a => {
        const txt = (a.textContent || '').trim().toUpperCase();
        if (txt === 'ЗАПУСК' || txt === 'ЗАПУСКИ') {
            a.setAttribute('href', 'launches.html');
        }
    });
}

// ---------- Launches page carousel ----------
function initLaunchesCarousel() {
    const page = document.querySelector('.launches-page');
    if (!page) return;

    const data = [
        {
            title: 'RUSKY‑1',
            date: '12 июня 2025',
            orbit: 'Солнечно‑синхронная (SSO), высота ~500 км',
            mass: '150 кг',
            goals: [
                'Высокоточное дистанционное зондирование Земли',
                'Сбор данных для экологического мониторинга, картографии и сельского хозяйства'
            ],
            features: [
                'Камера высокого разрешения 0.5 м/пиксель',
                'Спектрометр для мониторинга растительности',
                'Срок активной эксплуатации: 5 лет'
            ],
            image: 'img 4.png'
        },
        {
            title: 'RUSKY‑COM A1',
            date: '08 марта 2025',
            orbit: 'LEO, наклонение 53°, высота 550 км',
            mass: '120 кг',
            goals: [
                'Широкополосная связь',
                'Тестирование защищённых каналов'
            ],
            features: [
                'Фазированная антенная решётка',
                'Поддержка Ka‑диапазона'
            ],
            image: 'img 3.png'
        },
        {
            title: 'RUSKY‑NAV B2',
            date: '27 января 2025',
            orbit: 'MEO, высота ~20 200 км',
            mass: '240 кг',
            goals: [
                'Повышение точности навигации',
                'Синхронизация времени'
            ],
            features: [
                'Цезиевые стандарты частоты',
                'Многополосная передача (L1/L2/L5)'
            ],
            image: 'img 2.png'
        }
    ];

    let idx = 0;
    const hero = page.querySelector('.hero-bg');
    const prevBtn = page.querySelector('.prev-btn');
    const nextBtn = page.querySelector('.next-btn');
    const previewImg = page.querySelector('.launch-preview img');
    const nameEl = page.querySelector('.mission-name');
    const details = {
        date: page.querySelector('.detail-item:nth-child(1) .detail-value'),
        orbit: page.querySelector('.detail-item:nth-child(2) .detail-value'),
        mass: page.querySelector('.detail-item:nth-child(3) .detail-value'),
    };
    const goalsList = page.querySelector('.mission-objectives ul');
    const featuresList = page.querySelector('.mission-features ul');
    
    // элементы
    const indicators = page.querySelectorAll('.indicator-dot');
    const previewArrow = page.querySelector('.preview-arrow');
    const previewWrapper = page.querySelector('.launch-preview-wrapper');
    const slider = page.querySelector('.slider-indicator');

    // общий корень, к которому привязан absolute у превью
    const root = previewWrapper ? (previewWrapper.offsetParent || document.body) : document.body;

    let centers = [];

    // измеряем центры индикаторов в координатах root
    function measureCenters() {
        if (!previewWrapper || !indicators.length) return;
        const rootRect = root.getBoundingClientRect();
        centers = Array.from(indicators).map(el => {
            const r = el.getBoundingClientRect();
            return (r.left - rootRect.left) + r.width / 2; // X-центр индикатора
        });
    }

    function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

    function positionPreview() {
        if (!indicators.length || !previewWrapper) return;

        // целевая "левая" координата превью = центр индикатора - половина ширины превью
        const targetLeft = centers[idx] - (previewWrapper.offsetWidth / 2);

        // ограничим внутри root
        const maxLeft = root.clientWidth - previewWrapper.offsetWidth;
        const x = clamp(Math.round(targetLeft), 0, Math.max(0, maxLeft));

        // двигаем превью одной и той же системой координат
        previewWrapper.style.transform = `translateX(${x}px)`;
    }

    function render() {
        const item = data[idx];
        if (hero) hero.src = item.image;
        if (previewImg) previewImg.src = data[idx].image; // Показываем текущее изображение, а не следующее
        if (nameEl) nameEl.textContent = item.title;
        if (details.date) details.date.textContent = item.date;
        if (details.orbit) details.orbit.textContent = item.orbit;
        if (details.mass) details.mass.textContent = item.mass;

        if (goalsList) {
            goalsList.innerHTML = '';
            item.goals.forEach(g => {
                const li = document.createElement('li');
                li.textContent = g;
                goalsList.appendChild(li);
            });
        }
        if (featuresList) {
            featuresList.innerHTML = '';
            item.features.forEach(f => {
                const li = document.createElement('li');
                li.textContent = f;
                featuresList.appendChild(li);
            });
        }
        
        // Обновляем индикатор
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === idx);
        });
        
        // Позиционируем превью по новой логике
        positionPreview();
    }

    function next() { idx = (idx + 1) % data.length; render(); }
    function prev() { idx = (idx - 1 + data.length) % data.length; render(); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    
    // Добавляем обработчики для индикаторов
    indicators.forEach((indicator, i) => {
        indicator.style.cursor = 'pointer';
        indicator.addEventListener('click', () => {
            idx = i;
            render();
        });
    });

    // ресайз/поворот: пересчитать центры и вернуть превью на текущий индекс
    window.addEventListener('resize', () => { 
        measureCenters(); 
        render(); 
    });

    // инициализация
    measureCenters();
    render();
}

// ----- Toast + формы запроса -----
function showToast(message) {
    let el = document.querySelector('.toast');
    if (!el) {
        el = document.createElement('div');
        el.className = 'toast';
        document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
}

function setupRequestForms() {
    const forms = [];
    const cartForm = document.getElementById('cartRequestForm');
    if (cartForm) forms.push(cartForm);
    const requestForm = document.getElementById('requestForm');
    if (requestForm) forms.push(requestForm);

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Собираем значения полей и показываем модальное окно-уведомление
            const data = {};
            const fields = form.querySelectorAll('input, textarea, select');
            fields.forEach(f => {
                if (f.type === 'checkbox') return; // не отображаем чекбокс
                const key = (f.placeholder || f.name || f.id || 'Поле').trim();
                const val = (f.value || '').trim();
                if (val) data[key] = val;
            });
            showSuccessModal(data);
            try { form.reset(); } catch (e) {}
        });
    });
}

// Центрированное модальное окно успеха
function showSuccessModal(data) {
    let modal = document.getElementById('successModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'successModal';
        modal.className = 'modal success-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="success-title">Заявка успешно создана</div>
            <div class="success-subtitle">Мы свяжемся с вами в ближайшее время</div>
            <div class="success-data" id="successData"></div>
            <div class="success-actions">
              <button class="success-btn" id="successOk">ОК</button>
              <button class="success-btn alt" id="successToCart">Перейти в корзину</button>
            </div>
          </div>`;
        document.body.appendChild(modal);

        // Закрытие по кнопке ОК
        modal.addEventListener('click', (ev) => {
            if (ev.target.id === 'successOk' || ev.target.classList.contains('modal')) {
                modal.classList.remove('modal-open');
                setTimeout(() => modal.style.display = 'none', 200);
            } else if (ev.target.id === 'successToCart') {
                window.location.href = 'cart.html';
            }
        });
    }

    // Заполняем данные
    const dataBox = modal.querySelector('#successData');
    if (dataBox) {
        dataBox.innerHTML = '';
        Object.entries(data).forEach(([k, v]) => {
            const row = document.createElement('div');
            row.className = 'success-row';
            const key = document.createElement('div');
            key.className = 'success-key';
            key.textContent = k + ':';
            const val = document.createElement('div');
            val.className = 'success-val';
            val.textContent = v;
            row.appendChild(key); row.appendChild(val);
            dataBox.appendChild(row);
        });
    }

    // Показать модалку
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('modal-open'), 10);
}

// Функции для управления заказами
function getOrdersFromStorage() {
    try {
        const orders = localStorage.getItem('userOrders');
        return orders ? JSON.parse(orders) : [];
    } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        return [];
    }
}

// Функция для форматирования цен с пробелами между разрядами
function formatPrice(price) {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

function saveOrdersToStorage(orders) {
    try {
        localStorage.setItem('userOrders', JSON.stringify(orders));
    } catch (error) {
        console.error('Ошибка при сохранении заказов:', error);
    }
}

function createOrderFromCart() {
    const cart = getCartFromStorage();
    if (cart.length === 0) {
        return null;
    }

    const orders = getOrdersFromStorage();
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
    const orderDate = new Date().toLocaleDateString('ru-RU');
    
    const newOrder = {
        id: orderNumber,
        number: orderNumber,
        date: orderDate,
        status: 'processing',
        items: [...cart],
        total: cart.reduce((sum, item) => {
            if (item.price && item.price !== 'Цена по запросу') {
                const priceNum = parseFloat(item.price.replace(/[₽\s]/g, '').replace(',', '.'));
                return sum + (priceNum * item.quantity);
            }
            return sum;
        }, 0)
    };

    orders.unshift(newOrder);
    saveOrdersToStorage(orders);
    
    // Очищаем корзину после создания заказа
    localStorage.removeItem('cart');
    updateCartBadge();
    
    return newOrder;
}

function renderOrdersPage() {
    const ordersContainer = document.querySelector('.cart-container');
    const orders = getOrdersFromStorage();
    
    if (!ordersContainer) return;
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-orders">
                <h3>У вас пока нет заказов</h3>
                <p>Когда вы оформите заказ, он появится здесь</p>
                <a href="index.html" class="btn-primary">Перейти к каталогу</a>
            </div>
        `;
        return;
    }

    const ordersHTML = orders.map(order => `
        <div class="order-block">
            <div class="order-header">
                <div class="order-info">
                    <h3>Заказ ${order.number}</h3>
                    <div class="order-meta">
                        <span class="order-date">${order.date}</span>
                        <span class="order-status status-${order.status}">
                            ${getStatusText(order.status)}
                        </span>
                    </div>
                </div>
                <div class="order-total">
                    ${order.total > 0 ? formatPrice(order.total) + ' ₽' : 'Цена по запросу'}
                </div>
            </div>
            <div class="cart-items">
                ${order.items.map(item => `
                    <div class="cart-item">
                        <div class="product-image">
                            <img src="${item.image}" alt="${item.name}" loading="lazy">
                        </div>
                        <div class="product-details">
                            <h3>${item.name}</h3>
                            <p class="price">${item.price}</p>
                        </div>
                        <div class="quantity-controls">
                            <span class="quantity-display">${item.quantity}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    ordersContainer.innerHTML = ordersHTML;
}

function getStatusText(status) {
    const statusTexts = {
        'processing': 'Обрабатывается',
        'shipped': 'Отправлен',
        'delivered': 'Доставлен',
        'cancelled': 'Отменен'
    };
    return statusTexts[status] || status;
}

// Инициализация страницы заказов
if (window.location.pathname.includes('orders.html')) {
    document.addEventListener('DOMContentLoaded', renderOrdersPage);
}
