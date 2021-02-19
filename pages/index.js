let popupOpen = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');
let userName = document.querySelector('.popup__input-name');
let userAbout = document.querySelector('.popup__input-about');
let popupButton = document.querySelector('.popup__button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function popUP () {
  if (popup.classList.contains('popup_opened') === false) {
    popupOpen.addEventListener('click', function () {
      popup.classList.toggle('popup_opened');
      userName.value = profileName.textContent;
      userAbout.value = profileAbout.textContent;
    });
  } 
    popupClose.addEventListener('click', function () {
    popup.classList.toggle('popup_opened');
  });
    popupButton.addEventListener('click', function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileAbout.textContent = userAbout.value;
  });
  popupButton.addEventListener('click', function () {
    popup.classList.toggle('popup_opened');
  });
}

popUP ();
