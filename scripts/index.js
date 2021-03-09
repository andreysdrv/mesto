const modalProfileEdit = document.querySelector('.popup_profile-edit'); // попап редактирования профиля
const modalProfileEditButtonOpen = document.querySelector('.profile__edit-button');// кнопка открытия попапа редактирования профиля
const modalProfileEditButtonClose = document.querySelector('.popup__close-button'); // кнопка закрытия попапа редактирования профиля
const profileNameInput = document.querySelector('.popup__input_data_name'); // инпут имени попапа редактирования профиля
const profileAboutInput = document.querySelector('.popup__input_data_about'); // инпут описания попапа редактирования профиля
const modalWindowForm = document.querySelector('.popup__form'); // форма попапа
const profileName = document.querySelector('.profile__name'); // имя профиля
const profileAbout = document.querySelector('.profile__about'); // описание профиля
const modalAddForm = document.querySelector('.popup_card-add'); // попап добавления карточек
const modalAddFormButtonOpen = document.querySelector('.profile__add-button'); // кнопка попапа добавления карточек
const modalAddFormButtonClose = document.querySelector('.popup__close-button_card-add'); // кнопка попапа добавления карточек
const modalFigurePopup = document.querySelector('.popup_zoom-image'); // Попап с изображением
const modalFigurePopupCloseButton = document.querySelector('.popup__close-button_zoom-image'); // Кнопка закрытия попапа с изображением

//Функция открытия попапа
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened');
};

//Функция закрытия попапа
const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
};

// Функция отправки формы редактирования профиля с отменой стандартной отправки
function handleProfileEditForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closeModalWindow (modalProfileEdit);
}

function profileInputHandler () {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
};

//Вызовы функций открытия, закрытия и отправки попапов
modalProfileEditButtonOpen.addEventListener('click', function () {
  profileInputHandler();
  openModalWindow(modalProfileEdit);
});

modalProfileEditButtonClose.addEventListener('click', () => closeModalWindow(modalProfileEdit));
modalWindowForm.addEventListener('submit', handleProfileEditForm);

modalAddFormButtonOpen.addEventListener('click', () => openModalWindow(modalAddForm));
modalAddFormButtonClose.addEventListener('click', () => closeModalWindow(modalAddForm));


const elementsContainer = document.querySelector('.elements');
const cardAddForm = modalAddForm.querySelector('.popup__form');
const cardTemplate = document.querySelector('#card-template');


function createElement (data) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardTitle = cardElement.querySelector('.elements__title');
  cardTitle.textContent = data.name;
  
  const cardImage = cardElement.querySelector('.elements__image');
  cardImage.alt = data.name;
  cardImage.src = data.link;

  const deleteButton = cardElement.querySelector('.elements__remove-button');
  deleteButton.addEventListener('click', deleteCardHandler);

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click',likeCardHandler);
  
  cardImage.addEventListener('click', () => {
    openPopupWithImage(data);
  });

  modalFigurePopupCloseButton.addEventListener('click', () => closeModalWindow(modalFigurePopup));
  
  return cardElement;  
};

function openPopupWithImage (data) {
  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = data.name;

  const popupImage = document.querySelector('.popup__image');
  popupImage.src = data.link;
  popupImage.alt = data.name;

  openModalWindow(modalFigurePopup);
}

function deleteCardHandler (evt) {
  evt.target.closest('.elements__card').remove();
}

function likeCardHandler (evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

function renderCard () {
  const card = initialCards.map(function (item) {
    const newCard = createElement(item);
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

  const newCard = createElement({name: newPlaceName, link: newPlaceUrl});

  elementsContainer.prepend(newCard);

  cardAddForm.reset();
  closeModalWindow(modalAddForm);
}

renderCard();
cardAddForm.addEventListener('submit', cardAdd);