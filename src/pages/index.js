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
//  ПОПАП ФОТО
//_____________________________

// открытие попапа фото
const openPopupFoto = (name, link) => {
  new PopupWithImage('.popup-foto').open(name, link);
}

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

//  добавление массива фотографий
const CardList = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.elements__list', openPopupFoto).createCard();
      CardList.addItem(card);
    }
  }, '.elements');

CardList.renderItems();

// открытие попапа
buttonAddCard.addEventListener('click', ()=>{
  popupAddFotoValidate.deactivateButton();
  new PopupWithForm('.popup-add-card', createAndAddCard).open();
});

// добавление карточки
const createAndAddCard = (dataCard) => {
  CardList.renderItem(dataCard);
}

//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

const userInfo = new UserInfo({nameInput,jobInput})

// нажатие кнопки редактирования
buttonEdit.addEventListener('click', ()=>{  
  popupEditValidate.deactivateButton();
  new PopupWithForm('.popup-edit', submitHandlerEdit).open();

  // присвоение значения title инпутам
  const user =  userInfo.getUserInfo()
  nameInput.value = user.name
  jobInput.value = user.about
  nameInput.focus();
});

// обработчик «отправки» формы редактирования профиля
const submitHandlerEdit = (dataUser) => { 
  userInfo.setUserInfo(dataUser) 
};


