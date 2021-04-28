export default class Card {
  constructor( {data, handleCardClick}, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick

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
  renderCard() {
    this._getCardTemplate()
    this._setEventListeners()
    this._cardImage = this._view.querySelector('.elements__image')
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._view.querySelector('.elements__title').textContent = this._name
    return this._view
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
      this._handleCardClick({ 
        name: this._name,
        src: this._link })
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
}