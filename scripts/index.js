import FormValidator from './FormValidator.js';
import Card from './Сard.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


// попап редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const buttonEdit = document.querySelector('.profile__btn-edit');

const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

// попап добавления фото
const buttonAddCard = document.querySelector('.profile__btn-add');

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

// // обработчик «отправки» формы редактирования профиля
const submitHandlerEdit = (dataUser) => { 
  userInfo.setUserInfo(dataUser) 
};


