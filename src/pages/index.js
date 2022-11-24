import './index.css';
import {buttonEdit,
        nameInput,
        nameInfo,
        jobInput,
        jobInfo,
        buttonAddCard,
        initialCards,
        validationObject }
  from '../utils/constans.js' 

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';

//_____________________________
//  ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ
//_____________________________

const popupEditValidate = new FormValidator(validationObject, '.popup-edit')
popupEditValidate.enableValidation();
const popupAddFotoValidate = new FormValidator(validationObject, '.popup-add-card')
popupAddFotoValidate.enableValidation();

//_____________________________
//  ПОПАПЫ
//_____________________________
const popupWithImage = new PopupWithImage('.popup-foto')
const popupWithCard = new PopupWithForm('.popup-add-card', addCardFromPopup)
const popupWithProfile = new PopupWithForm('.popup-edit', submitHandlerEdit)
const popupWithDelete =  new PopupWithDelete('.popup-delete');

// профиль

const userInfo = new UserInfo(nameInfo, jobInfo)

// список карточек
const cardList = new Section({
  renderer: (item) => {
    const card = generateCard(item);
    cardList.addItem(card);
  }
}, '.elements');

//_____________________________
//  СЕРВЕР  
//_____________________________

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
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
  nameInput.value = user.name
  jobInput.value = user.about
  nameInput.focus();
});

// обработчик «отправки» формы редактирования профиля
// editUserInfo
function submitHandlerEdit (dataUser) { 
  userInfo.setUserInfo(dataUser) 
  // сохранение имени на сервере
  api.editUserInfo()
};

//_____________________________
//  API
//_____________________________

// загрузка данных пользователя
let userId
api.startPageProfile()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res)
    document.querySelector('.profile__avatar').src = res.avatar
})
; 

// загрузка карточек
api.startPageCards()
  .then((result) => {
  // добавление карточек
      cardList.renderItems(result);
  })
  ;

// функция загрузка данных 
  function renderLoading(isLoading) {
    if  (isLoading) {
      //  кнопка в форме .textContent = "Сохранение..."
    } else {
      //  кнопка в форме .textContent = "Создать"
    }
   }

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
  // console.log(dataCard)
  const counterLike = 0
  return new Card(dataCard, '.elements__list', openPopupFoto, popupWithDelete, userId, counterLike,).createCard()
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
  // .finally(()=>{renderLoading('false')})
}
