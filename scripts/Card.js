class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  //Методы

    //Получение карточки
  _getCardTemplate() {
    this._view = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true)
  }

    //Публичный метод отрисовки карточки
  renderCard(container) {
    this._getCardTemplate()
    this._setEventListeners()
    this._view.querySelector('.elements__image').src = this._link
    this._view.querySelector('.elements__image').alt = this._name
    this._view.querySelector('.elements__title').textContent = this._name
    container.append(this._view)
  }

    //Слушатели событий
  _setEventListeners() {
    //Лайк
    this._view
    .querySelector('.elements__like-button')
    .addEventListener('click', () => {
      this._handleLikeCard()
    })

    //Удаление
    this._view
    .querySelector('.elements__remove-button')
    .addEventListener('click', () => {
      this._handleRemoveCard()
    })

    //Открытие попапа с изображением
    this._view
    .querySelector('.elements__image')
    .addEventListener('click', () => {
      this._handleOpenPopupWithImage()
    })
  }

  //Лайк
  _handleLikeCard() {
    this._view
    .querySelector('.elements__like-button').
    classList.
    toggle('elements__like-button_active')
  }

  //Удаление
  _handleRemoveCard() {
    this._view
    .closest('.elements__card')
    .remove()
  }

    //Открытие попапа с изображением
  _handleOpenPopupWithImage() {
    popupImage.src = this._link
    popupCaption.textContent = this._name
    openModalWindow(modalFigurePopup)
  }
}
