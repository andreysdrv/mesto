import './index.css'

import 
{
  profileAvatar,
  profileName,
  profileAbout,
  modalProfileEditButtonOpen,
  profileNameInput,
  profileAboutInput,
  modalWindowForm,
  modalAddFormButtonOpen,
  cardAddForm,
  selectors,
  initialCards,
  cardSelector,
  popupFigureSelector,
  elementsContainerSelector,
  profileNameSelector,
  profileAboutSelector,
  popupCardAddSelector,
  popupProfileEditSelector,
  popupDeleteConfirmSelector,
  modalAvatarEdit,
  popupAvatarEditSelector,
  avatarEditForm,
  profileAvatarSelector,
  avatarEditButton
 } from '../utils/constans.js'

import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Api from '../components/Api.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '1a04582c-c338-4c76-b689-0417388dddf2',
    'Content-Type': 'application/json'
  }
})

const profileEditFormValidator = new FormValidator(selectors, modalWindowForm)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(selectors, cardAddForm)
cardAddFormValidator.enableValidation()

const userInfo = new UserInfo({name: profileNameSelector, info: profileAboutSelector, avatar: profileAvatarSelector})

const popupFigure = new PopupWithImage(popupFigureSelector)
popupFigure.setEventListeners()

const confirmDeletePopup = new PopupWithConfirm (popupDeleteConfirmSelector)
confirmDeletePopup.setEventListeners()

//Функция создания карточки
const createCard = (data) => {
  const card = new Card( {
    data: data,

    handleCardClick: _ => {
      popupFigure.open(data)
    },

    handleLikeClick: _ => {
      card.handleLikeCard()
    },

    handleConfirmDelete: _ => {
      confirmDeletePopup.setSubmitAction(() => {
        api.delete(data._id)
          .then(() => {
            card.handleRemoveCard()
          })
          .catch((err) => console.log(err))
      })
      confirmDeletePopup.open()
    }
  }, cardSelector, api, userId)

  return card
}

const cardList = new Section( {
  renderer: item => {
    const card = createCard(item)
    const cardElement = card.renderCard(item)
    cardList.addItem(cardElement)
  } }, elementsContainerSelector)

const popupAvatarEditFromValidator = new FormValidator(selectors, avatarEditForm)
popupAvatarEditFromValidator.enableValidation()

const popupAvatarEdit = new PopupWithForm(popupAvatarEditSelector, newValues => {
  popupAvatarEdit.renderLoading(true)
  api.handleUserAvatar(newValues)
    .then((data) => {
      userInfo.setUserAvatar(data)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatarEdit.renderLoading(false)
      popupAvatarEdit.close()
    })

  popupAvatarEditFromValidator.disableSubmitButton()
})
popupAvatarEdit.setEventListeners()

avatarEditButton.addEventListener('click', _ => {
  popupAvatarEditFromValidator.handleErrorElements()
  popupAvatarEditFromValidator.disableSubmitButton()
  popupAvatarEdit.open()
})

const popupFormCardAdd = new PopupWithForm(popupCardAddSelector, newValues => {
  popupFormCardAdd.renderLoading(true)
  api.addUserCard(newValues)
    .then((data) => {
      const card = createCard(data)
      const cardElement = card.renderCard(data)
      cardList.addItem(cardElement)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupFormCardAdd.renderLoading(true)
      popupFormCardAdd.close()
    })
  cardAddFormValidator.disableSubmitButton()
})
popupFormCardAdd.setEventListeners()

const popupFormProfilEdit = new PopupWithForm(popupProfileEditSelector, newValues => {
  popupFormProfilEdit.renderLoading(true)
  api.setUserInfoApi(newValues)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupFormProfilEdit.renderLoading(false)
      popupFormProfilEdit.close()
    })
})
popupFormProfilEdit.setEventListeners()

modalAddFormButtonOpen.addEventListener('click', _ => {
  cardAddFormValidator.handleErrorElements()
  popupFormCardAdd.renderLoading(false)
  popupFormCardAdd.open()
})

modalProfileEditButtonOpen.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()

  profileEditFormValidator.handleErrorElements()

  profileNameInput.value = userData.name
  profileAboutInput.value = userData.info

  popupFormProfilEdit.open()
})


const cards = api.getInitialCards()
cards
  .then((data) => {
    cardList.render(data)
  })
  .catch((err) => console.log(err))

let userId // переменная под id пользователя
const apiInfo = api.getUserInfo()
apiInfo
  .then((data) => {
    userInfo.setUserInfo(data)
    userId = data._id
  })
  .catch((err) => console.log(err))