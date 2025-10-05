const fs = require('fs');
const path = require('path');

const oldNav = `<a href="#">ЗАПУСК</a>`;
const newNav = `<div class="dropdown">
                <a href="#" class="dropdown-toggle">ЗАПУСК</a>
                <div class="dropdown-content">
                    <a href="launches.html">Предстоящие запуски</a>
                    <a href="launch-process.html">Процесс запуска</a>
                </div>
            </div>`;

// Получаем список всех HTML файлов
const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join('.', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Заменяем старую навигацию на новую
    if (content.includes(oldNav)) {
        content = content.replace(oldNav, newNav);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Finished updating files');
