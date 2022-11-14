import './index.css';
import {buttonEdit,
        nameInput,
        jobInput,
        buttonAddCard,
        initialCards,
        validationObject }
  from '../scripts/constans.js' 

import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Сard.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

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
const popupWithCard = new PopupWithForm('.popup-add-card', generateCard)
const popupWithProfile = new PopupWithForm('.popup-edit', submitHandlerEdit);

//_____________________________
//  ПОПАП ФОТО
//_____________________________

// открытие попапа фото
const openPopupFoto = (name, link) => {
  new popupWithImage.open(name, link);
}

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

//  добавление массива фотографий
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.elements__list', openPopupFoto).createCard()
      cardList.addItem(card)
    }
  }, '.elements');

cardList.renderItems();

// открытие попапа
buttonAddCard.addEventListener('click', ()=>{
  popupAddFotoValidate.deactivateButton();
  popupWithCard.open();
});

// добавление карточки
function generateCard (dataCard) {
  cardList.renderItem(dataCard);
}

//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

const userInfo = new UserInfo({nameInput,jobInput})

// нажатие кнопки редактирования
buttonEdit.addEventListener('click', ()=>{  
  popupEditValidate.deactivateButton();
  popupWithProfile.open();

  // присвоение значения title инпутам
  const user =  userInfo.getUserInfo()
  nameInput.value = user.name
  jobInput.value = user.about
  nameInput.focus();
});

// обработчик «отправки» формы редактирования профиля
function submitHandlerEdit (dataUser) { 
  userInfo.setUserInfo(dataUser) 
};


