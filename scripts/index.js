//Импорт
import { modalProfileEdit,
  modalProfileEditButtonOpen,
  modalProfileEditButtonClose,
  profileNameInput,
  profileAboutInput,
  modalWindowForm,
  profileName,
  profileAbout,
  modalAddForm,
  modalAddFormButtonOpen,
  modalAddFormButtonClose,
  modalFigurePopup,
  modalFigurePopupCloseButton,
  elementsContainer,
  cardAddForm,
  placeName,
  placeUrl,
  selectors,
  initialCards } from './constans.js'

// import { openModalWindow, closeModalWindow } from './utils.js'

import { Card } from './Card.js'

import { FormValidator } from './FormValidator.js'


//Функция закрытия попапов по клику на оверлей
const handleClickOverlay = (e) => {
  if (e.target.classList.contains('popup_opened')) {
    closeModalWindow(e.target)
  }
}

//Вызов функции закрытия попапа по клику на оверлей
modalProfileEdit.addEventListener('click', handleClickOverlay)
modalAddForm.addEventListener('click', handleClickOverlay)

// Функция отправки формы редактирования профиля с отменой стандартной отправки
function handleProfileEditForm () {
  // e.preventDefault()
  profileName.textContent = profileNameInput.value
  profileAbout.textContent = profileAboutInput.value
  // closeModalWindow(modalProfileEdit)
}

//Функция передачи имени и описания профиля в поля ввода формы
function handleProfileInputValue () {
  profileNameInput.value = profileName.textContent
  profileAboutInput.value = profileAbout.textContent
}

//Вызовы функций открытия, закрытия и отправки попапов
// modalProfileEditButtonOpen.addEventListener('click', function () {
//   handleProfileInputValue()
//   openModalWindow(modalProfileEdit)
// })

// modalProfileEditButtonClose.addEventListener('click', () => closeModalWindow(modalProfileEdit))
// modalWindowForm.addEventListener('submit', handleProfileEditForm)

// modalAddFormButtonOpen.addEventListener('click', () => {
//   cardAddFormValidator.disableSubmitButton()
//   openModalWindow(modalAddForm)
// })

// modalAddFormButtonClose.addEventListener('click', () => {
//   closeModalWindow(modalAddForm)
//   cardAddForm.reset()
// })

function addCard (e) {
  e.preventDefault()

  const newValues = {
    name: placeName.value,
    link: placeUrl.value
  }

  handleAddCard(newValues)

  // cardAddForm.reset()
  closeModalWindow(modalAddForm)
}

// cardAddForm.addEventListener('submit', addCard)

modalFigurePopupCloseButton.addEventListener('click', () => closeModalWindow(modalFigurePopup))
modalFigurePopup.addEventListener('click', handleClickOverlay)

// const handleAddCard = (item) => {
//   const newCard = new Card(item, '#card-template')
//   newCard.renderCard(elementsContainer)
// }

// initialCards.reverse().forEach((item) => {
//   handleAddCard(item)
// })

const profileEditFormValidator = new FormValidator(selectors, modalWindowForm)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(selectors, cardAddForm)
cardAddFormValidator.enableValidation()


// ***********************************************************************
import Section from './Section.js'

const cardList = new Section( {
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template')
    const cardElement = card.renderCard()

    cardList.addItem(cardElement)
  } }, '.elements')

cardList.render()
// ***********************************************************************
import PopupWithImage from './PopupWithImage.js'

const popupFigure = new PopupWithImage('.popup_zoom-image', { /*some obj*/ })
// ***********************************************************************
import PopupWithForm from './PopupWithForm.js'

const popupFormCardAdd = new PopupWithForm('.popup_card-add', _ => {
  const newValues = 
  {
    name: placeName.value,
    link: placeUrl.value
  }

  const card = new Card(newValues, '#card-template')
  const cardElement = card.renderCard()
  cardList.addItem(cardElement)
  cardAddFormValidator.disableSubmitButton()
})

popupFormCardAdd.setEventListeners()

modalAddFormButtonOpen.addEventListener('click', _ => {
  popupFormCardAdd.open()
})

const popupFormProfilEdit = new PopupWithForm('.popup_profile-edit', _ => {
  handleProfileEditForm()
})

popupFormProfilEdit.setEventListeners()

modalProfileEditButtonOpen.addEventListener('click', _ => {
  popupFormProfilEdit.open()
  handleProfileInputValue()
})
// ***********************************************************************
import UserInfo from './UserInfo.js'

const userInfo = new UserInfo({name: '.profile__name', info: '.profile__about'})

userInfo.getUserInfo()
// ***********************************************************************
