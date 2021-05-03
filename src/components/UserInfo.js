export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = document.querySelector(userSelectors.name)
    this._profileInfo = document.querySelector(userSelectors.info)
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent
    }

    return this._userData
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name
    this._profileInfo.textContent = data.about
  }
}