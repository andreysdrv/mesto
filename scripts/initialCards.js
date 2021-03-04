// Массив первых 6-и карточек при загрузке страницы
const initialCards = [
  {
    name: 'Гора Олимп',
    link: 'https://weatlas.com/img/landmarks/f2be31c534ad180012614017c02341b5.jpg'
  },
  {
    name: 'Нидерланды',
    link: 'https://yablyk.com/wp-content/uploads/2019/02/niderlandy.jpg'
  },
  {
    name: 'Рим, колизей',
    link: 'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/Colosseum-Rome.jpg'
  },
  {
    name: 'Афины',
    link: 'https://www.grekomania.ru/images/places/attica/athens/4757_Erectheion-Acropolis-Athens.jpg'
  },
  {
    name: 'Батуми',
    link: 'https://www.kavkaz-uzel.eu/system/uploads/article_image/image/0013/139551/Panoramic_view_of_Batumi_at_night.jpg'
  },
  {
    name: 'Тбилиси',
    link: 'https://summerhotels.ru/wp-content/uploads/2017/08/Most-Mira-1.jpg'
  }
];

// Функция добавления первых 6-и карточек
function cardsInit () {
  for (i = 0; i < 6; i++) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
    cardElement.querySelector('.elements__image').src = initialCards[i].link;
    cardElement.querySelector('.elements__title').textContent = initialCards[i].name;
    document.querySelector('.elements').prepend(cardElement);
    const cardLike = document.querySelector('.elements__like-button');
    cardLike.addEventListener('click', function (evt) {
      event.target.classList.toggle('elements__like-button_active');
    })
  }
}

// Вызыв функции добавления карточек при загрузке страницы
cardsInit ();