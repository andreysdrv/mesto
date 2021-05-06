import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')

    this._popupButton = this._popupForm.querySelector('.popup__button')
    this._popupButtonTextContent = this._popupButton.textContent
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener('submit', e => {
      e.preventDefault()
      this._handleSubmitCallback()
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action
  }

  renderLoadingWhileDeleting(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonTextContent
    }
  }
}