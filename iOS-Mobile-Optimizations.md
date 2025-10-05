# 📱 iOS Мобильные Оптимизации - RUSKY

## 🎯 Что было добавлено

### 1. **iOS Корректный вьюпорт**
```css
html {
  -webkit-text-size-adjust: 100%; /* Запрещает автоматическое изменение размера текста */
}
```

### 2. **Адаптивная типографика через CSS clamp()**
```css
:root {
  --fs-h1: clamp(28px, 6vw, 44px);    /* H1: от 28px до 44px */
  --fs-h2: clamp(22px, 4.8vw, 32px);  /* H2: от 22px до 32px */
  --fs-body: clamp(15px, 3.8vw, 18px); /* Body: от 15px до 18px */
}
```

### 3. **Безопасные зоны (Dynamic Island/ночик)**
```css
.safe-pad {
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

### 4. **Предотвращение горизонтального скролла**
```css
html, body {
  overflow-x: hidden;
}
```

### 5. **iOS-дружественный фон**
```css
.hero-section {
  background-attachment: scroll; /* вместо fixed */
  min-height: 100svh; /* динамический вьюпорт */
}
```

### 6. **Touch-friendly элементы**
```css
/* Минимальные размеры для касания */
button, .mobile-nav-list a {
  min-height: 44px;
  min-width: 44px;
}

/* Убираем синие выделения при касании */
button, a, input {
  -webkit-tap-highlight-color: transparent;
}
```

## 🛠 Как использовать

### В HTML
```html
<!-- Обязательно добавить viewport-fit=cover -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- Использовать класс safe-pad для безопасных зон -->
<div class="safe-pad">
  Контент с учетом безопасных зон
</div>
```

### В CSS
```css
/* Использовать CSS переменные для текста */
h1 { font-size: var(--fs-h1); }
h2 { font-size: var(--fs-h2); }
p { font-size: var(--fs-body); }

/* Для элементов требующих безопасных зон */
.my-header {
  padding-top: max(20px, env(safe-area-inset-top));
  padding-left: max(20px, env(safe-area-inset-left));
}
```

## 📁 Тестовые файлы

### 1. `ios-optimized-example.html`
- Полный пример iOS оптимизаций
- Демонстрация безопасных зон
- Адаптивная типографика
- Touch-friendly кнопки
- Информация об устройстве

### 2. `rusky-mobile.html` (обновлен)
- Расширенная отладочная информация
- Визуальные индикаторы безопасных зон
- Проверка поддержки iOS функций
- Мониторинг ориентации экрана

## 🧪 Тестирование

### На iPhone/iPad:
1. Откройте `ios-optimized-example.html` в Safari
2. Проверьте адаптацию под Dynamic Island
3. Поверните устройство для проверки адаптивности
4. Тестируйте касания кнопок и меню

### В браузере:
1. Используйте Developer Tools
2. Включите режим эмуляции iPhone
3. Проверьте responsive поведение
4. Измените viewport для тестирования clamp()

## 🔧 Настройки VS Code для тестирования

Добавьте в `settings.json`:
```json
{
  "liveServer.settings.host": "0.0.0.0",
  "liveServer.settings.useLocalIp": true
}
```

Это позволит тестировать сайт на реальном iPhone в локальной сети.

## 📊 Ключевые улучшения

### Производительность:
- ✅ Плавная прокрутка с инерцией
- ✅ Оптимизированные анимации
- ✅ Предотвращение зума при фокусе на input

### UX:
- ✅ Touch-friendly размеры (44px минимум)
- ✅ Безопасные зоны для новых iPhone
- ✅ Адаптивная типографика без резких скачков
- ✅ Правильное поведение viewport на iOS

### Accessibility:
- ✅ Улучшенные индикаторы фокуса
- ✅ Соответствие WCAG guidelines
- ✅ Поддержка screen readers

## 🐛 Решенные iOS проблемы

1. **Автоматическое изменение размера текста** → `-webkit-text-size-adjust: 100%`
2. **Синие выделения при касании** → `-webkit-tap-highlight-color: transparent`
3. **Проблемы с fixed background** → `background-attachment: scroll`
4. **Неточный viewport height** → `100svh` вместо `100vh`
5. **Игнорирование безопасных зон** → `env(safe-area-inset-*)`
6. **Мелкие кнопки** → `min-height: 44px`
7. **Зум при фокусе на input** → `font-size: 16px !important`

## 📱 Совместимость

- ✅ iOS 11+ (safe-area)
- ✅ iOS 15+ (100svh)
- ✅ Safari на iOS
- ✅ Chrome на iOS
- ✅ Все современные браузеры

---

**Важно:** Тестируйте на реальных устройствах! Эмуляторы не всегда точно передают поведение iOS.