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

import { openModalWindow, closeModalWindow } from './utils.js'

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
function handleProfileEditForm (e) {
  e.preventDefault()
  profileName.textContent = profileNameInput.value
  profileAbout.textContent = profileAboutInput.value
  closeModalWindow(modalProfileEdit)
}

//Функция передачи имени и описания профиля в поля ввода формы
function handleProfileInputValue () {
  profileNameInput.value = profileName.textContent
  profileAboutInput.value = profileAbout.textContent
}

//Вызовы функций открытия, закрытия и отправки попапов
modalProfileEditButtonOpen.addEventListener('click', function () {
  handleProfileInputValue()
  openModalWindow(modalProfileEdit)
})

modalProfileEditButtonClose.addEventListener('click', () => closeModalWindow(modalProfileEdit))
modalWindowForm.addEventListener('submit', handleProfileEditForm)

modalAddFormButtonOpen.addEventListener('click', () => {
  cardAddFormValidator.disableSubmitButton()
  openModalWindow(modalAddForm)
})

modalAddFormButtonClose.addEventListener('click', () => {
  closeModalWindow(modalAddForm)
  cardAddForm.reset()
})

function addCard (e) {
  e.preventDefault()

  const newValues = {
    name: placeName.value,
    link: placeUrl.value
  }

  handleAddCard(newValues)

  cardAddForm.reset()
  closeModalWindow(modalAddForm)
}

cardAddForm.addEventListener('submit', addCard)

modalFigurePopupCloseButton.addEventListener('click', () => closeModalWindow(modalFigurePopup))
modalFigurePopup.addEventListener('click', handleClickOverlay)

const handleAddCard = (item) => {
  const newCard = new Card(item, '#card-template')
  newCard.renderCard(elementsContainer)
}

initialCards.reverse().forEach((item) => {
  handleAddCard(item)
})

const profileEditFormValidator = new FormValidator(selectors, modalWindowForm)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(selectors, cardAddForm)
cardAddFormValidator.enableValidation()