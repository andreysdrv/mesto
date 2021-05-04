import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, api, card) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')
    this._api = api
    this._card = card
  }

  _setEventListeners() {
    super._setEventListeners()
    const handleDeleteCard = e => {
      e.preventDefault()
      this._api.then(() => {
        document.getElementById(this._card.id).remove()
      })
      this._popupForm.removeEventListeners('submit', handleDeleteCard)
      this.close()
    }
    this._popupForm.addEventListeners('submit', handleDeleteCard)
  }
}