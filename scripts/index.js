let popupOpen = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');
let userName = document.querySelector('.popup__input_data_name');
let userAbout = document.querySelector('.popup__input_data_about');
let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

// Функция открытия поп-апа
function open () {
  popup.classList.add('popup_opened');
  userName.value = profileName.textContent;
  userAbout.value = profileAbout.textContent;
}

// Функция закрытия поп-апа
 function close () {
  popup.classList.remove('popup_opened');
}

// Функция отправки формы с отменой стандартной отправки
function submit (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileAbout.textContent = userAbout.value;
  close ();
}

// Вызыв функции открытия поп-апа
if (popup.classList.contains('popup_opened') === false) {
  popupOpen.addEventListener('click', open);
} 

// Вызыв функции закрытия поп-апа
popupClose.addEventListener('click', close);

// Вызыв функции отправки формы
popupForm.addEventListener('submit', submit);