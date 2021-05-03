export default class Api {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject((`Ошибка: ${res.status}`))
      })
  }

  setUserInfo(userData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.info
      })
    })
      .then(res => {
        if (res.ok) {
          console.log(res)
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  addUserCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject((`Ошибка: ${res.status}`))
      })
  }
}

