let modalAddForm = document.querySelector('.popup_card-add'); // попап добавления карточек
let modalAddFormButtonOpen = document.querySelector('.profile__add-button'); // кнопка попапа добавления карточек
let modalAddFormButtonClose = document.querySelector('.popup__close-button_card-add'); // кнопка попапа добавления карточек
let placeName = document.querySelector('.popup__input_place_name'); // поле ввода названия карточки
let placeUrl = document.querySelector('.popup__input_place_url'); // поле ввода ссылки на картинку

// Функция открытия поп-апа
function modalAddFormOpen () {
  modalAddForm.classList.add('popup_opened');
}

// Функция добавления карточки с отменой стандартной отправки формы
function modalAddFormCard (evt) {
  evt.preventDefault();

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  cardElement.querySelector('.elements__image').src = placeUrl.value;
  cardElement.querySelector('.elements__image').alt = 'Ваша карточка'
  cardElement.querySelector('.elements__title').textContent = placeName.value;
  document.querySelector('.elements').prepend(cardElement);

  modalAddFormClose ();
}

// Функция закрытия поп-апа
function modalAddFormClose () {
  modalAddForm.classList.remove('popup_opened');
}

// Вызыв функции открытия поп-апа
modalAddFormButtonOpen.addEventListener('click', modalAddFormOpen);

// Вызыв функции закрытия поп-апа
modalAddFormButtonClose.addEventListener('click', modalAddFormClose);

// Вызыв функции добавлния карточки
modalAddForm.addEventListener('submit', modalAddFormCard);