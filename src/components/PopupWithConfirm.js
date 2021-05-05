import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener('submit', e => {
      e.preventDefault()
      this._handleSubmitCallback()
      this.close()
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action
  }
}