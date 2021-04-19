import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback

    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = this._popupForm.querySelectorAll('.popup__input')
  }

  _getInputValues() {
    this._newValues = {}
    this._inputList.forEach(inputElement => {
      this._newValues[inputElement.name] = inputElement.value
    })
    return this._newValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault()
      this._submitCallback(this._getInputValues())
      this.close()
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }
}