import './index.css';
import {buttonEdit,
        nameInput,
        nameInfo,
        jobInput,
        jobInfo,
        avatarContainer,
        buttonAddCard,
        validationObject,
        buttonAvatarEdit }
  from '../utils/constans.js' 

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

//_____________________________
//  ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ
//_____________________________

const popupEditValidate = new FormValidator(validationObject, '.popup-edit')
popupEditValidate.enableValidation();
const popupAddFotoValidate = new FormValidator(validationObject, '.popup-add-card')
popupAddFotoValidate.enableValidation();
const popupAvatarValidate = new FormValidator(validationObject, '.popup-avatar')
popupAvatarValidate.enableValidation();

//_____________________________
//  ПОПАПЫ
//_____________________________
const popupWithImage = new PopupWithImage('.popup-foto')
const popupWithCard = new PopupWithForm('.popup-add-card', addCardFromPopup)
const popupWithProfile = new PopupWithForm('.popup-edit', submitHandlerEdit)
const popupWithConfirmation =  new PopupWithConfirmation('.popup-confirmation', deleteCard);
const popupWithAvatar = new PopupWithForm('.popup-avatar', submitHandlerEditAvatar)

//_____________________________
//  ПРОФИЛЬ
//_____________________________
const userInfo = new UserInfo(nameInfo, jobInfo, avatarContainer)

//_____________________________
//  СЕКЦИЯ КАРТОЧЕК
//_____________________________
let cardId
// список карточек
const cardList = new Section({
  renderer: (item) => {
    cardId = item._id
    const card = generateCard(item);
    cardList.addItem(card);
  }
}, '.elements');

//_____________________________
//  СЕРВЕР  
//_____________________________

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    authorization: 'b54228be-8e0f-45cf-a3af-cf408891c36e',
    'Content-Type': 'application/json'
  }
} , userInfo, cardList)

//_____________________________
//  ПОПАП ФОТО
//_____________________________

// открытие попапа фото
const openPopupFoto = (name, link) => {
  popupWithImage.open(name, link);
}


//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

// нажатие кнопки редактирования
buttonEdit.addEventListener('click', ()=>{  
  popupEditValidate.deactivateButton();
  popupWithProfile.open();
  popupEditValidate.hideAllInputErrors();

  // присвоение значения title инпутам
  const user =  userInfo.getUserInfo()
  popupWithProfile.setInputValues(user)
  nameInput.focus();
});

// обработчик «отправки» формы редактирования профиля
function submitHandlerEdit (dataUser) {  
  // сохранение имени на сервере
  api.editUserInfo(dataUser)
    .then ((dataUserRes)=> {
    userInfo.setUserInfo(dataUserRes)
    })
    .catch((err) => {
        console.log(err); 
      })
    .finally(()=>{
      popupWithProfile.close()
      popupWithProfile.renderLoading(false)
    })
};

// редактирование аватара
buttonAvatarEdit.addEventListener('click', ()=>{  
  popupEditValidate.deactivateButton();
  popupWithAvatar.open();
  popupEditValidate.hideAllInputErrors();
})

// обработчик «отправки» формы редактирования аватара
function submitHandlerEditAvatar (avatarInfo) { 
  // сохранение аватара на сервере
  api.editUserAvatar(avatarInfo.avatar)
    .then((profile)=>{
      userInfo.setUserInfo(profile)
    })
    .catch((err) => {
      console.log(err); 
    }) 
    .finally(()=>{
      popupWithAvatar.renderLoading(false)
      popupWithAvatar.close()
    })
};

//_____________________________
//  API
//_____________________________


// загрузка данных пользователя
let userId

const startPageProfile = api.startPageProfile()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res)
  })
; 

// загрузка карточек
const startPageCards = api.startPageCards()
  .then((result) => {
  // добавление карточек
      cardList.renderItems(result.reverse());
  })

Promise.all([startPageProfile, startPageCards])
  .catch((err) => {
    console.log(err); 
  }) 

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

// открытие попапа
buttonAddCard.addEventListener('click', ()=>{
  popupAddFotoValidate.deactivateButton();
  popupWithCard.open();
  popupAddFotoValidate.hideAllInputErrors();
});

// добавление карточки
function generateCard (dataCard) {
  const card = new  Card(dataCard, '.elements__list', openPopupFoto, 
                        popupWithConfirmation, userId, cardId, api)
                    .createCard()
  return card                 
}

function addCard(card) {
  cardList.addItem(card)
}

// добавление карточки из попапа
function addCardFromPopup (dataCard) {
  api.sendCard(dataCard)
  .then((res) => {
    addCard(generateCard (res));
  })
  .catch((err) => {
    console.log(err); 
  }) 
  .finally(()=>{
    popupWithCard.renderLoading(false)
    setTimeout(() => {
      popupWithCard.close()
    }, 100);
  })
}

// удаление карточки
function deleteCard (idCard,card) {
  api.deleteCard(idCard)
    .then(()=> {
      card.remove()
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(()=>{
      popupWithConfirmation.close()
    })
}