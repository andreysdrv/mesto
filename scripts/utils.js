//Функция открытия попапа
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened')
  document.addEventListener('keydown', handleEscPress)
}