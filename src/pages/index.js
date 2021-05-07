import './index.css'

import 
{
  modalProfileEditButtonOpen,
  profileNameInput,
  profileAboutInput,
  modalWindowForm,
  modalAddFormButtonOpen,
  cardAddForm,
  selectors,
  cardSelector,
  popupFigureSelector,
  elementsContainerSelector,
  profileNameSelector,
  profileAboutSelector,
  popupCardAddSelector,
  popupProfileEditSelector,
  popupDeleteConfirmSelector,
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
  const card = new Card
  ( 
  {
    data: data,

    handleCardClick: _ => popupFigure.open(data),

    handleLikeClick: _ => card.handleLikeCard(),

    handleConfirmDelete: _ => {
      confirmDeletePopup.setSubmitAction( _ => {
      confirmDeletePopup.renderLoadingWhileDeleting(true)
        api.delete(data._id)
          .then( _ => {
            card.handleRemoveCard()
            confirmDeletePopup.close()
          })
          .catch((err) => console.log(err))
          .finally( _ => confirmDeletePopup.renderLoadingWhileDeleting(false))
      })
      confirmDeletePopup.open()
    }
  },
  cardSelector,
  api,
  userId
  )
  return card
}

const cardList = new Section( {
  renderer: item => {
    const card = createCard(item)
    const cardElement = card.renderCard()
    cardList.addItem(cardElement)
  } }, elementsContainerSelector)

const popupAvatarEditFromValidator = new FormValidator(selectors, avatarEditForm)
popupAvatarEditFromValidator.enableValidation()

const popupAvatarEdit = new PopupWithForm(popupAvatarEditSelector, newValues => {
  popupAvatarEdit.renderLoading(true)
  api.handleUserAvatar(newValues)
    .then((data) => {
      userInfo.setUserAvatar(data)
      popupAvatarEditFromValidator.disableSubmitButton()
      popupAvatarEdit.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupAvatarEdit.renderLoading(false))
})
popupAvatarEdit.setEventListeners()

avatarEditButton.addEventListener('click', _ => {
  popupAvatarEditFromValidator.removeErrors()
  popupAvatarEdit.open()
})

const popupFormCardAdd = new PopupWithForm(popupCardAddSelector, newValues => {
  popupFormCardAdd.renderLoading(true)
  api.addUserCard(newValues)
    .then((data) => {
      const card = createCard(data)
      const cardElement = card.renderCard()
      cardList.addItem(cardElement)
      cardAddFormValidator.disableSubmitButton()
      popupFormCardAdd.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupFormCardAdd.renderLoading(true))
})
popupFormCardAdd.setEventListeners()

const popupFormProfilEdit = new PopupWithForm(popupProfileEditSelector, newValues => {
  popupFormProfilEdit.renderLoading(true)
  api.setUserInfoApi(newValues)
    .then((data) => {
      userInfo.setUserInfo(data)
      popupFormProfilEdit.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupFormProfilEdit.renderLoading(false))
})
popupFormProfilEdit.setEventListeners()

modalAddFormButtonOpen.addEventListener('click', _ => {
  cardAddFormValidator.removeErrors()
  popupFormCardAdd.renderLoading(false)
  popupFormCardAdd.open()
})

modalProfileEditButtonOpen.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()

  profileEditFormValidator.removeErrors()

  profileNameInput.value = userData.name
  profileAboutInput.value = userData.info

  profileEditFormValidator.enableSubmitButton()

  popupFormProfilEdit.open()
})

let userId // переменная под id пользователя

api.getAllNeededData() // возвращает результат исполнения нужных промисов (карточки и информация пользователя)
  .then(( [cards, userData] ) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
    
    cardList.render(cards)
  })
  .catch((err) => console.log(err))