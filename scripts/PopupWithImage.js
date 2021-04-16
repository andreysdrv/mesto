import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector)
    // this._name = data.name
    // this._link = data.link
  }

  open(values) {
    super.open()
    this._popupImage = this._popup.querySelector('.popup__image')
    this._popupCaption = this._popup.querySelector('.popup__caption')
    this._popupImage.src = values.link
    this._popupImage.alt = values.name
    this._popupCaption.textContent = values.name
  }
}