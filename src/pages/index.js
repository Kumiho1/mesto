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
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
const popupWithProfile = new PopupWithForm('.popup-edit', submitHandlerEdit);

//_____________________________
//  ПОПАП ФОТО
//_____________________________

// открытие попапа фото
const openPopupFoto = (name, link) => {
  popupWithImage.open(name, link);
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
  return new Card(dataCard, '.elements__list', openPopupFoto).createCard()
}

function addCard(card) {
  cardList.addItem(card)
}

// function addCard(card) {
//   cardList.addItem(card)
// }

function addCardFromPopup (dataCard) {
  addCard(generateCard (dataCard));
  
}

//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

const userInfo = new UserInfo({nameInfo, jobInfo})

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
function submitHandlerEdit (dataUser) { 
  userInfo.setUserInfo(dataUser) 
  // сохранение имени на сервере
  fetch('https://mesto.nomoreparties.co/v1/cohort-54/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'b54228be-8e0f-45cf-a3af-cf408891c36e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userInfo.getUserInfo())
})
};


//_____________________________
//  API
//_____________________________

// загрузка фото
fetch('https://mesto.nomoreparties.co/v1/cohort-54/cards', {
  headers: {
    authorization: 'b54228be-8e0f-45cf-a3af-cf408891c36e'
  }
})
  .then(res => res.json())
  .then((result) => {
    
    //  добавление массива фотографий
    const cardList = new Section({
      data: result,
      renderer: (item) => {
        const card = generateCard(item);
        cardList.addItem(card);
      }
    }, '.elements');

    cardList.renderItems(result);
  }); 


// загрузка данных пользователя
fetch('https://mesto.nomoreparties.co/v1/cohort-54/users/me', {
  headers: {
    authorization: 'b54228be-8e0f-45cf-a3af-cf408891c36e'
  }
})
.then(res => res.json())
.then((res) => {
  const dataUser = {
    name: res.name,
    about: res.about
  }
  userInfo.setUserInfo(dataUser)
  document.querySelector('.profile__avatar').src = res.avatar
}); 


