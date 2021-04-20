//Импорт

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
  initialCards,
  cardSelector,
  popupFigureSelector,
  elementsContainerSelector,
  profileNameSelector,
  profileAboutSelector,
  popupCardAddSelector,
  popupProfileEditSelector
 } from '../utils/constans.js'

import { FormValidator } from '../components/FormValidator.js'

const profileEditFormValidator = new FormValidator(selectors, modalWindowForm)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(selectors, cardAddForm)
cardAddFormValidator.enableValidation()

// ***********************************************************************
import PopupWithImage from '../components/PopupWithImage.js'

const popupFigure = new PopupWithImage(popupFigureSelector)

popupFigure.setEventListeners()
// ***********************************************************************
import { Card } from '../components/Card.js'

import Section from '../components/Section.js'

const createCard = (data) => {
  const card = new Card( {
    data: data,
    handleCardClick: _ => {
      popupFigure.open(data)
    }
  }, cardSelector)
  return card
}

const cardList = new Section( {
  items: initialCards,
  renderer: item => {
    const card = createCard(item)
    const cardElement = card.renderCard()
    cardList.addItem(cardElement)
  } }, elementsContainerSelector)

cardList.render()
// ***********************************************************************
import UserInfo from '../components/UserInfo.js'

const userInfo = new UserInfo({name: profileNameSelector, info: profileAboutSelector})
// ***********************************************************************
import PopupWithForm from '../components/PopupWithForm.js'

const popupFormCardAdd = new PopupWithForm(popupCardAddSelector, newValues => {
  const card = createCard(newValues)
  const cardElement = card.renderCard()
  cardList.addItem(cardElement)
  cardAddFormValidator.disableSubmitButton()
})

popupFormCardAdd.setEventListeners()

modalAddFormButtonOpen.addEventListener('click', _ => {
  popupFormCardAdd.open()
})

const popupFormProfilEdit = new PopupWithForm(popupProfileEditSelector, _ => {
  userInfo.setUserInfo(profileNameInput, profileAboutInput)
})

popupFormProfilEdit.setEventListeners()

modalProfileEditButtonOpen.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()

  profileEditFormValidator.handleErrorElements()

  profileNameInput.value = userData.name
  profileAboutInput.value = userData.info

  popupFormProfilEdit.open()
})
// ***********************************************************************
