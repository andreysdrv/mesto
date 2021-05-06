export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  _hanldeOverlayClose(e) {
    if (e.target.classList.contains('popup_opened')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', _ => this.close())
    this._popup.addEventListener('click', this._hanldeOverlayClose.bind(this))    
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keyup', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', this._handleEscClose)
  }
}