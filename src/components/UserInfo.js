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

  setUserInfo(profileNameInput, profileAboutInput) {
    this._profileName.textContent = profileNameInput.value
    this._profileInfo.textContent = profileAboutInput.value
  }
}