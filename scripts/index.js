const popupOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_profile-edit');
const popupClose = document.querySelector('.popup__close-button');
const userName = document.querySelector('.popup__input_data_name');
const userAbout = document.querySelector('.popup__input_data_about');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const modalAddForm = document.querySelector('.popup_card-add'); // попап добавления карточек
const modalAddFormButtonOpen = document.querySelector('.profile__add-button'); // кнопка попапа добавления карточек
const modalAddFormButtonClose = document.querySelector('.popup__close-button_card-add'); // кнопка попапа добавления карточек
const modalFigurePopup = document.querySelector('.popup_zoom-image'); // Попап с изображением
const modalFigurePopupCloseButton = document.querySelector('.popup__close-button_zoom-image'); // Кнопка закрытия попапа с изображением

//Функция открытия попапа
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened');

  userName.value = profileName.textContent;
  userAbout.value = profileAbout.textContent;
};

//Функция закрытия попапа
const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
};

// Функция отправки формы редактирования профиля с отменой стандартной отправки
function submit (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileAbout.textContent = userAbout.value;
  closeModalWindow (popup);
}

//Вызовы функций открытия, закрытия и отправки попапов
popupOpen.addEventListener('click', () => openModalWindow(popup));
popupClose.addEventListener('click', () => closeModalWindow(popup));
popupForm.addEventListener('submit', submit);

modalAddFormButtonOpen.addEventListener('click', () => openModalWindow(modalAddForm));
modalAddFormButtonClose.addEventListener('click', () => closeModalWindow(modalAddForm));


const elementsContainer = document.querySelector('.elements');
const cardAddForm = modalAddForm.querySelector('.popup__form');
const cardTemplate = document.querySelector('#card-template');


function createElement (item) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardTitle = cardElement.querySelector('.elements__title');
  cardTitle.textContent = item.name;
  
  const cardImage = cardElement.querySelector('.elements__image');
  cardImage.alt = item.name;
  cardImage.src = item.link;

  const deleteButton = cardElement.querySelector('.elements__remove-button');
  deleteButton.addEventListener('click', deleteCardHandler);

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click',likeCardHandler);
  
  cardImage.addEventListener('click', function () {
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = item.name;

    const popupImage = document.querySelector('.popup__image');
    popupImage.src = item.link;
    popupImage.alt = item.name;

    openModalWindow(modalFigurePopup);
  });

  modalFigurePopupCloseButton.addEventListener('click', () => closeModalWindow(modalFigurePopup));
  
  return cardElement;  
};

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

  placeName.value = '';
  placeUrl.value = '';
  closeModalWindow(modalAddForm);
}

renderCard();
cardAddForm.addEventListener('submit', cardAdd);