//Импорт

import './index.css'

import {
  modalProfileEditButtonOpen,
  profileNameInput,
  profileAboutInput,
  modalWindowForm,
  modalAddFormButtonOpen,
  cardAddForm,
  selectors,
  initialCards } from '../utils/constans.js'

import { FormValidator } from '../components/FormValidator.js'

const profileEditFormValidator = new FormValidator(selectors, modalWindowForm)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(selectors, cardAddForm)
cardAddFormValidator.enableValidation()

// ***********************************************************************
import PopupWithImage from '../components/PopupWithImage.js'

const popupFigure = new PopupWithImage('.popup_zoom-image')

popupFigure.setEventListeners()
// ***********************************************************************
import { Card } from '../components/Card.js'

import Section from '../components/Section.js'

const cardList = new Section( {
  items: initialCards,
  renderer: item => {
    const card = new Card( {
      data: item,
      handleCardClick: _ => {
        popupFigure.open(item)
      }
    }, '#card-template')
    const cardElement = card.renderCard()
    cardList.addItem(cardElement)
  } }, '.elements')

cardList.render()
// ***********************************************************************
import UserInfo from '../components/UserInfo.js'

const userInfo = new UserInfo({name: '.profile__name', info: '.profile__about'})

userInfo.getUserInfo()
// ***********************************************************************
import PopupWithForm from '../components/PopupWithForm.js'

const popupFormCardAdd = new PopupWithForm('.popup_card-add', newValues => {
  const card = new Card( {
    data: newValues,
    handleCardClick: _ => {
      popupFigure.open(newValues)
    }
  }, '#card-template')
  const cardElement = card.renderCard()
  cardList.addItem(cardElement)
  cardAddFormValidator.disableSubmitButton()
})

popupFormCardAdd.setEventListeners()

modalAddFormButtonOpen.addEventListener('click', _ => {
  popupFormCardAdd.open()
})

const popupFormProfilEdit = new PopupWithForm('.popup_profile-edit', _ => {
  userInfo.setUserInfo()
})

popupFormProfilEdit.setEventListeners()

modalProfileEditButtonOpen.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()
  profileNameInput.value = userData.name
  profileAboutInput.value = userData.info

  popupFormProfilEdit.open()
})
// ***********************************************************************
