export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', _ => this.close())
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keyup', this._handleEscClose.bind(this))
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', this._handleEscClose.bind(this))
  }
}