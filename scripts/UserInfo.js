export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = document.querySelector(userSelectors.name)
    this._profileInfo = document.querySelector(userSelectors.info)

    // this._profileNameInput = document.querySelector('.popup__input_data_name')
    // this._profileInfoInput = document.querySelector('.popup__input_data_about')
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent
    }

    return this._userData
  }

  setUserInfo() {

  }
}