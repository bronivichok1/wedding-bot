require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_ID: Number(process.env.ADMIN_ID),

  WEDDING: {
    couple: 'Лёша и Надюша',
    date: '21.11.2026',
    dateShort: '21.11.26',
    time: '16:30',
    place: 'Усадьба «Edel House»',
    address: 'Минская обл., д. Колодищи, ул. Георгиевская 1',
    mapUrl: 'https://yandex.ru/maps/', // замени на реальную ссылку
    dressCode:
      'будем рады, если отдадите предпочтение глубоким оттенкам, не ярким тонам ' +
      '(бордо / оливка / шоколад / томный синий). ' +
      'Приветствуются текучие силуэты, бархат, сатин, пайетки ✨',
  },
};