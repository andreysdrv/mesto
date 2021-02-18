let popupOpen = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');

console.log(popupOpen);
console.log(popup);
console.log(popupClose);

function open () {
  popup.classList.add('popup_opened');
};

popupOpen.addEventListener('click', open);

function close () {
  popup.classList.remove('popup_opened');
};

popupClose.addEventListener('click', close);