import FormValidator from './FormValidator.js';
import Card from './Сard.js';
import Section from './Section.js';
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js';


// значения profile
const titleName = document.querySelector('.profile__name');
const titleJob = document.querySelector('.profile__job');

// попапы
const popupList = Array.from(document.querySelectorAll('.popup'));

// попап редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const buttonEdit = document.querySelector('.profile__btn-edit');

const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const formElementEdit =  popupEdit.querySelector('.popup__form');
const buttonCloseEdit = popupEdit.querySelector('.popup__btn-close');
const buttonSaveEdit = popupEdit.querySelector('.popup__btn-save');

// попап добавления фото
const popupAddCard = document.querySelector('.popup-add-card');
const buttonAddCard = document.querySelector('.profile__btn-add');

const buttonCloseAddFoto = popupAddCard.querySelector('.popup__btn-close');
const nameFotoInput = popupAddCard.querySelector('.popup__input_type_name');
const linkFotoInput = popupAddCard.querySelector('.popup__input_type_job');
const formElementAddFoto = popupAddCard.querySelector('.popup__form');
const buttonSaveAddFoto = popupAddCard.querySelector('.popup__btn-save');

// попап просмотра фото
const popupFoto = document.querySelector('.popup-foto');

const imgFoto = popupFoto.querySelector('.popup__foto');
const buttonCloseFoto = popupFoto.querySelector('.popup__btn-close');
const nameFoto = popupFoto.querySelector('.popup__name');

// карточки
const cardsContainer = document.querySelector('.elements');




  
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
const openPopupFoto = (name, link) => {new PopupWithImage('.popup-foto').open(name, link);}


//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

//_____________________________
//  добавление массива фотографий
//_____________________________
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

// // обработчик «отправки» формы добавления фото
// function submitHandlerFoto (evt) { 
//   evt.preventDefault();
//   // создание и добавление корточки
//   const dataCard = {
//     name: nameFotoInput.value,
//     link: linkFotoInput.value
//   }
//   createAndAddCard(dataCard);
//   closePopup(popupAddCard);
// };
// formElementAddFoto.addEventListener('submit', submitHandlerFoto);  


//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

// нажатие кнопки редактирования
buttonEdit.addEventListener('click', ()=>{  
  // resetForm(popupEdit); 
  popupEditValidate.deactivateButton();
  new PopupWithForm('.popup-edit', submitHandlerEdit).open();

  // присвоение значения title инпутам
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  nameInput.focus();
});

// // обработчик «отправки» формы редактирования профиля
const submitHandlerEdit = (userInfo) => { 
  titleName.textContent = userInfo.name; 
  titleJob.textContent = userInfo.link; 
};
// formElementEdit.addEventListener('submit', submitHandler);  


