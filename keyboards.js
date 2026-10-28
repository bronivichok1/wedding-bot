const dateMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Да', callback_data: 'date_yes', style: 'primary' }],
      [{ text: 'Всегда да', callback_data: 'date_always', style: 'primary' }],
      [{ text: 'Для вас — да', callback_data: 'date_foryou', style: 'primary' }],
    ],
  },
};

const companyMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Разумеется', callback_data: 'company_sure', style: 'primary' }],
      [{ text: 'Конечно', callback_data: 'company_ofcourse', style: 'primary' }],
      [{ text: 'Бесспорно', callback_data: 'company_undoubtedly', style: 'primary' }],
    ],
  },
};

const finalMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📍 Где и когда', callback_data: 'place', style: 'primary' }],
      [{ text: '👗 Дресс-код', callback_data: 'dresscode', style: 'primary' }],
      [{ text: '✅ Я приду', callback_data: 'confirm', style: 'primary' }],
      [{ text: '❌ Не смогу', callback_data: 'decline', style: 'primary' }],
    ],
  },
};

module.exports = { dateMenu, companyMenu, finalMenu };