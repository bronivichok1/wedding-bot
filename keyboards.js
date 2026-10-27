// Экран 1: свободны ли вы 21.11.2026
const dateMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Да', callback_data: 'date_yes' }],
      [{ text: 'Всегда да', callback_data: 'date_always' }],
      [{ text: 'Для вас — да', callback_data: 'date_foryou' }],
    ],
  },
};

// Экран 2: проведёте дату активно и в приятной компании?
const companyMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Разумеется', callback_data: 'company_sure' }],
      [{ text: 'Конечно', callback_data: 'company_ofcourse' }],
      [{ text: 'Бесспорно', callback_data: 'company_undoubtedly' }],
    ],
  },
};

// Экран 3: финальное меню после приглашения
const finalMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📍 Где и когда', callback_data: 'place' }],
      [{ text: '👗 Дресс-код', callback_data: 'dresscode' }],
      [{ text: '✅ Я приду', callback_data: 'confirm' }],
      [{ text: '❌ Не смогу', callback_data: 'decline' }],
    ],
  },
};

module.exports = { dateMenu, companyMenu, finalMenu };