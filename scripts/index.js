let popupOpen = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');
let userName = document.querySelector('.popup__input_data_name');
let userAbout = document.querySelector('.popup__input_data_about');
let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

// Функция открытия поп-апа редактирования профиля
function open () {
  popup.classList.add('popup_opened');
  userName.value = profileName.textContent;
  userAbout.value = profileAbout.textContent;
}

// Функция закрытия поп-апа редактирования профиля
 function close () {
  popup.classList.remove('popup_opened');
}

// Функция отправки формы редактирования профиля с отменой стандартной отправки
function submit (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileAbout.textContent = userAbout.value;
  close ();
}

// Вызыв функции открытия поп-апа редактирования профиля
if (popup.classList.contains('popup_opened') === false) {
  popupOpen.addEventListener('click', open);
} 

// Вызыв функции закрытия поп-апа редактирования профиля
popupClose.addEventListener('click', close);

// Вызыв функции отправки формы редактирования профиля
popupForm.addEventListener('submit', submit);

const modalAddForm = document.querySelector('.popup_card-add'); // попап добавления карточек
const modalAddFormButtonOpen = document.querySelector('.profile__add-button'); // кнопка попапа добавления карточек
const modalAddFormButtonClose = document.querySelector('.popup__close-button_card-add'); // кнопка попапа добавления карточек

// Функция открытия поп-апа добавления карточек
function modalAddFormOpen () {
  modalAddForm.classList.add('popup_opened');
}

// Функция закрытия поп-апа добавления карточек
function modalAddFormClose () {
  modalAddForm.classList.remove('popup_opened');
}

// Вызыв функции открытия поп-апа добавления карточек
modalAddFormButtonOpen.addEventListener('click', modalAddFormOpen);

// Вызыв функции закрытия поп-апа добавления карточек
modalAddFormButtonClose.addEventListener('click', modalAddFormClose);

const elementsContainer = document.querySelector('.elements');
const cardAddForm = modalAddForm.querySelector('.popup__form');
const cardTemplate = document.querySelector('#card-template');

function createEletemt (item) {
  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.elements__image').alt = 'Ваша карточка';
  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__title').textContent = item.name;

  return cardElement;
};

function renderCard () {
  const card = initialCards.map(function (item) {
    const newCard = createEletemt(item);
    cardRevome(newCard);
    return newCard;
  });

  elementsContainer.append(...card);
}

function cardAdd (event) {
  event.preventDefault();

  const placeName = document.querySelector('.popup__input_place_name');
  const placeUrl = document.querySelector('.popup__input_place_url');

  const newPlaceName = placeName.value;
  const newPlaceUrl = placeUrl.value;

  const newCard = createEletemt({name: newPlaceName, link: newPlaceUrl});

  cardRevome(newCard);

  elementsContainer.prepend(newCard);

  placeName.value = '';
  placeUrl.value = '';
  modalAddFormClose();
}

function deleteCardHandler (evt) {
  evt.target.closest('.elements__card').remove();
}

function likeCardHandler (evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

function cardRevome(element) {
  const deleteButton = element.querySelector('.elements__remove-button');
  deleteButton.addEventListener('click', deleteCardHandler)

  const likeButton = element.querySelector('.elements__like-button');
  likeButton.addEventListener('click',likeCardHandler)
}

renderCard();
cardAddForm.addEventListener('submit', cardAdd);