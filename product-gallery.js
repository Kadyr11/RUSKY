// Галерея продуктов - переключение между изображениями
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.product-gallery');
    if (!gallery) return;

    const mainImage = gallery.querySelector('.product-main-image img');
    const thumbs = gallery.querySelectorAll('.thumbs img[data-full], .product-thumbs img[data-full]');
    
    if (!mainImage || !thumbs.length) return;

    // Функция смены главного изображения
    function swapWithMain(thumbImg) {
        if (!thumbImg || !thumbImg.dataset.full) return;
        
        const newSrc = thumbImg.dataset.full;
        const currentSrc = mainImage.getAttribute('src');
        
        // Плавная анимация смены изображения
        mainImage.style.opacity = '0.7';
        
        setTimeout(() => {
            // Меняем источник главного изображения
            mainImage.setAttribute('src', newSrc);
            
            // Если есть srcset, тоже обновляем
            if (thumbImg.dataset.srcset) {
                mainImage.setAttribute('srcset', thumbImg.dataset.srcset);
            }
            
            // Восстанавливаем прозрачность
            mainImage.style.opacity = '1';
            
            // Обновляем data-full у кликнутой миниатюры на старое главное изображение
            thumbImg.dataset.full = currentSrc;
            
            // Обновляем активное состояние миниатюр
            updateActiveThumb(thumbImg);
            
        }, 150);
    }

    // Функция обновления активного состояния миниатюры
    function updateActiveThumb(activeThumb) {
        thumbs.forEach(thumb => {
            thumb.classList.remove('active', 'thumb-active');
            thumb.style.opacity = '0.7';
        });
        
        activeThumb.classList.add('active', 'thumb-active');
        activeThumb.style.opacity = '1';
    }

    // Обработчик клика по миниатюре
    thumbs.forEach(thumb => {
        // Устанавливаем начальные стили
        thumb.style.cursor = 'pointer';
        thumb.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        thumb.style.opacity = '0.7';
        
        // Эффект при наведении
        thumb.addEventListener('mouseenter', () => {
            if (!thumb.classList.contains('active')) {
                thumb.style.opacity = '0.9';
                thumb.style.transform = 'scale(1.05)';
            }
        });
        
        thumb.addEventListener('mouseleave', () => {
            if (!thumb.classList.contains('active')) {
                thumb.style.opacity = '0.7';
                thumb.style.transform = 'scale(1)';
            }
        });

        // Основной обработчик клика
        (thumb.closest('.thumb') || thumb).addEventListener('click', e => {
            e.preventDefault();
            swapWithMain(thumb);  // ← ВОТ эта команда запускает смену
        });
    });

    // Устанавливаем начальное активное состояние (первая миниатюра)
    if (thumbs.length > 0) {
        // Ищем миниатюру, которая соответствует текущему главному изображению
        const currentMainSrc = mainImage.getAttribute('src');
        let activeThumb = Array.from(thumbs).find(thumb => 
            thumb.getAttribute('src') === currentMainSrc || 
            thumb.dataset.full === currentMainSrc
        );
        
        // Если не найдена, берем первую
        if (!activeThumb) {
            activeThumb = thumbs[0];
        }
        
        updateActiveThumb(activeThumb);
    }

    // Добавляем стили для плавной анимации главного изображения
    if (mainImage) {
        mainImage.style.transition = 'opacity 0.3s ease';
    }

    console.log('Product gallery initialized:', {
        mainImage: !!mainImage,
        thumbsCount: thumbs.length,
        galleryElement: !!gallery
    });
});

// Альтернативная инициализация для случаев динамической загрузки
function initProductGallery() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}
