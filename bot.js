const TelegramBot = require('node-telegram-bot-api');
const { BOT_TOKEN, ADMIN_ID, WEDDING } = require('./config');
const { dateMenu, companyMenu, finalMenu } = require('./keyboards');
const { saveGuest, getAllGuests } = require('./storage');

if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN не задан в .env');
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true,
  request: {
    agentOptions: { keepAlive: true, family: 4 },
  },
});

// /start — приветствие + вопрос 1
bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'друг';
  bot.sendMessage(
    msg.chat.id,
    `Доброго дня, ${name}! ☀️\n\n` +
      `Вас приветствуют ${WEDDING.couple} ♥️\n\n` +
      `1️⃣ Скажите, пожалуйста, свободны ли Вы *${WEDDING.date}*?`,
    { parse_mode: 'Markdown', ...dateMenu }
  );
});

// Обработка кнопок
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  switch (data) {
    // --- Вопрос 1: дата ---
    case 'date_yes':
    case 'date_always':
    case 'date_foryou':
      bot.sendMessage(
        chatId,
        `2️⃣ Хотите провести этот вечер вкусно, красиво и в приятной компании?`,
        companyMenu
      );
      break;

    // --- Вопрос 2: компания ---
    case 'company_sure':
    case 'company_ofcourse':
    case 'company_undoubtedly':
      bot.sendMessage(
        chatId,
        `Класс!) До встречи) 🥂\n\n` +
          `Ждём Вас *${WEDDING.dateShort}* в *${WEDDING.time}*\n` +
          `в ${WEDDING.place} ♥️\n` +
          `_(${WEDDING.address})_\n\n` +
          `👗 *Дресс-код:* ${WEDDING.dressCode}`,
        { parse_mode: 'Markdown', ...finalMenu }
      );
      break;

    // --- Финальное меню ---
    case 'place':
      bot.sendMessage(
        chatId,
        `📍 *${WEDDING.place}*\n${WEDDING.address}\n\n` +
          `🗓 *${WEDDING.dateShort}* в *${WEDDING.time}*\n\n` +
          `🗺 [Открыть на карте](${WEDDING.mapUrl})`,
        { parse_mode: 'Markdown' }
      );
      break;

    case 'dresscode':
      bot.sendMessage(
        chatId,
        `👗 *Дресс-код:*\n\n${WEDDING.dressCode}`,
        { parse_mode: 'Markdown' }
      );
      break;

    case 'confirm':
      saveGuest(userId, query.from.first_name, 'confirmed');
      bot.sendMessage(
        chatId,
        `Ура! 🎉 Мы очень рады, что Вы будете с нами!\n` +
          `Ждём Вас ${WEDDING.dateShort} в ${WEDDING.time} в ${WEDDING.place} ♥️`
      );
      break;

    case 'decline':
      saveGuest(userId, query.from.first_name, 'declined');
      bot.sendMessage(
        chatId,
        `Очень жаль 😢 Но спасибо, что сообщили!\nБудем скучать.`
      );
      break;
  }

  bot.answerCallbackQuery(query.id);
});

// /guests — список ответивших (только для админа)
bot.onText(/\/guests/, (msg) => {
  if (msg.from.id !== ADMIN_ID) {
    return bot.sendMessage(msg.chat.id, 'Эта команда только для админа 🙈');
  }

  const list = getAllGuests();
  if (!list.length) {
    return bot.sendMessage(msg.chat.id, 'Пока никто не ответил.');
  }

  const confirmed = list.filter((g) => g.status === 'confirmed');
  const declined = list.filter((g) => g.status === 'declined');

  bot.sendMessage(
    msg.chat.id,
    `✅ Придут (${confirmed.length}):\n` +
      (confirmed.map((g) => `• ${g.name}`).join('\n') || '—') +
      `\n\n❌ Не смогут (${declined.length}):\n` +
      (declined.map((g) => `• ${g.name}`).join('\n') || '—')
  );
});

console.log('🤖 Бот запущен...');