//Функция открытия попапа
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened')
  document.addEventListener('keydown', handleEscPress)
}

//Функция закрытия попапа
const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscPress)
}

//Функция закрытия попапов по клику на оверлей
const handleClickOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closeModalWindow(evt.target)
  }
}

//Вызов функции закрытия попапа по клику на оверлей
modalProfileEdit.addEventListener('click', handleClickOverlay)
modalAddForm.addEventListener('click', handleClickOverlay)

//Функция закрытия попаов по нажатию на Esc
const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const modalOpened = document.querySelector('.popup_opened')
    closeModalWindow(modalOpened)
  }
}

// Функция отправки формы редактирования профиля с отменой стандартной отправки
function handleProfileEditForm (evt) {
  evt.preventDefault()
  profileName.textContent = profileNameInput.value
  profileAbout.textContent = profileAboutInput.value
  closeModalWindow (modalProfileEdit)
}

//Функция передачи имени и описания профиля в поля ввода формы
function handleProfileInputValue () {
  profileNameInput.value = profileName.textContent
  profileAboutInput.value = profileAbout.textContent
}

//Функция деактивации кнопки сабмита в попапе добавления карточки
const handleAddFormButtonState = () => {
  submitButtonAddForm.classList.add('popup__button_disabled')
  submitButtonAddForm.disabled = true
}

//Вызовы функций открытия, закрытия и отправки попапов
modalProfileEditButtonOpen.addEventListener('click', function () {
  handleProfileInputValue()
  openModalWindow(modalProfileEdit)
})

modalProfileEditButtonClose.addEventListener('click', () => closeModalWindow(modalProfileEdit))
modalWindowForm.addEventListener('submit', handleProfileEditForm)

modalAddFormButtonOpen.addEventListener('click', () => {
  handleAddFormButtonState()
  openModalWindow(modalAddForm)
})

modalAddFormButtonClose.addEventListener('click', () => closeModalWindow(modalAddForm))

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
