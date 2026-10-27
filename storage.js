const fs = require('fs');
const path = require('path');

const RESPONSES_DIR = path.join(__dirname, 'responses');

// Создаём папку, если её нет
if (!fs.existsSync(RESPONSES_DIR)) {
  fs.mkdirSync(RESPONSES_DIR, { recursive: true });
}

// Убираем из имени всё, что нельзя писать в имя файла
function safeName(name) {
  return String(name).replace(/[\\/:*?"<>|]/g, '_').trim() || 'guest';
}

// Сохраняем ответ гостя в отдельный txt-файл
// Имя файла: responses/<userId>_<name>.txt
function saveGuest(userId, name, status) {
  const fileName = `${userId}_${safeName(name)}.txt`;
  const filePath = path.join(RESPONSES_DIR, fileName);

  const statusText = status === 'confirmed' ? '✅ Придёт' : '❌ Не сможет прийти';
  const content =
    `Имя: ${name}\n` +
    `Telegram ID: ${userId}\n` +
    `Статус: ${statusText}\n` +
    `Обновлено: ${new Date().toLocaleString('ru-RU')}\n`;

  fs.writeFileSync(filePath, content, 'utf8');
}

// Читаем все txt-файлы и собираем список гостей
function getAllGuests() {
  if (!fs.existsSync(RESPONSES_DIR)) return [];

  return fs
    .readdirSync(RESPONSES_DIR)
    .filter((f) => f.endsWith('.txt'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(RESPONSES_DIR, file), 'utf8');

      const nameMatch = raw.match(/^Имя: (.+)$/m);
      const statusMatch = raw.match(/^Статус: (.+)$/m);
      const updatedMatch = raw.match(/^Обновлено: (.+)$/m);

      let status = 'unknown';
      if (statusMatch) {
        if (statusMatch[1].includes('Придёт')) status = 'confirmed';
        else if (statusMatch[1].includes('Не сможет')) status = 'declined';
      }

      return {
        name: nameMatch ? nameMatch[1] : file,
        status,
        updatedAt: updatedMatch ? updatedMatch[1] : '',
      };
    });
}

module.exports = { saveGuest, getAllGuests };