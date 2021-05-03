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
  popupProfileEditSelector
 } from '../utils/constans.js'

import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Api from '../components/Api.js'

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

const userInfo = new UserInfo({name: profileNameSelector, info: profileAboutSelector})

const popupFigure = new PopupWithImage(popupFigureSelector)
popupFigure.setEventListeners()

//Функция создания карточки
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
  // items: initialCards,
  renderer: item => {
    const card = createCard(item)
    const cardElement = card.renderCard()
    cardList.addItem(cardElement)
  } }, elementsContainerSelector)
// cardList.render()



const popupFormCardAdd = new PopupWithForm(popupCardAddSelector, newValues => {
  api.addUserCard(newValues)
    .then((data) => {
      const card = createCard(data)
      const cardElement = card.renderCard()
      cardList.addItem(cardElement)
    })
    .catch((err) => {
      console.log(err)
    })
  cardAddFormValidator.disableSubmitButton()
})
popupFormCardAdd.setEventListeners()

const popupFormProfilEdit = new PopupWithForm(popupProfileEditSelector, newValues => {
  console.log(newValues)
  api.setUserInfoApi(newValues)
    .then((data) => {
      console.log(data)
      userInfo.setUserInfo(data)
    })
})
popupFormProfilEdit.setEventListeners()

modalAddFormButtonOpen.addEventListener('click', _ => {
  cardAddFormValidator.handleErrorElements()
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
  .catch(err => {
      console.log(err)
  })

const apiInfo = api.getUserInfo()
apiInfo
  .then((data) => {
    userInfo.setUserInfo(data)
  })
  .catch((err) => {
    console.log(err)
  })