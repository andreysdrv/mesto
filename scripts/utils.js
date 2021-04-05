//Функция открытия попапа
export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened')
  document.addEventListener('keydown', handleEscPress)
}

//Функция закрытия попапа
export const closeModalWindow = (modalWindow) => {
 modalWindow.classList.remove('popup_opened')
 document.removeEventListener('keydown', handleEscPress)
}

//Функция закрытия попаов по нажатию на Esc
export const handleEscPress = (e) => {
  if (e.key === 'Escape') {
    const modalOpened = document.querySelector('.popup_opened')
    closeModalWindow(modalOpened)
  }
}
