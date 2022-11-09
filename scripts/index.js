import FormValidator from './FormValidator.js';
import Card from './Сard.js';
import Section from './Section.js';
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'


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


// //_____________________________
// //  УНИВЕРСАЛЬНОЕ
// //_____________________________

// добавление кода в html элемент
// function addElementInContainer(element,container) { 
//   container.prepend(element);
// };

// // показать попап
// function openPopup(p) {
//   document.addEventListener('keydown', handeListenEscape);
//   p.classList.add('popup_opened');
// };

// // скрыть попап 
// function closePopup(p) {
//   document.removeEventListener('keydown', handeListenEscape);
//   p.classList.remove('popup_opened');
// };

// // закрытие по оверлею
// popupList.forEach(p => {
//   p.addEventListener('click', (evt)=> {
//     if (evt.target.classList.contains('popup')){
//       closePopup(p);
//     }
//   })
// });

// // слушатель Esc
// function handeListenEscape(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   };
// };

// сброс формы 
function resetForm(p) { 
  // очистка инпутов 
    p.querySelector('.popup__form').reset(); 
  };

  
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

// закрытие попапа фото
buttonCloseFoto.addEventListener('click', () => {
closePopup(popupFoto);
}); 

// открытие попапа фото
const openPopupFoto = () => {new PopupWithImage().open();}

// const openPopupFoto = (name, link) => {
//       imgFoto.src = link;
//       imgFoto.alt = `${name} на фотографии`;
//       nameFoto.textContent = name;
//       openPopup(popupFoto);
// }

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________


// создание и добавление карточки в разметку


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
  resetForm(popupAddCard); 
  popupAddFotoValidate.deactivateButton();
  new Popup('.popup-add-card').open();
});

// обработчик «отправки» формы добавления фото
function submitHandlerFoto (evt) { 
  evt.preventDefault();
  // создание и добавление корточки
  const dataCard = {
    name: nameFotoInput.value,
    link: linkFotoInput.value
  }
  createAndAddCard(dataCard);
  closePopup(popupAddCard);
};
formElementAddFoto.addEventListener('submit', submitHandlerFoto);  

// // закрытие попапа
// buttonCloseAddFoto.addEventListener('click', () => {
//   closePopup(popupAddCard);
// });

//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

// нажатие кнопки редактирования
buttonEdit.addEventListener('click', ()=>{  
  resetForm(popupEdit); 
  popupEditValidate.deactivateButton();
  new Popup('.popup-edit').open();


  // присвоение значения title инпутам
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  nameInput.focus();
});

// обработчик «отправки» формы редактирования профиля
function submitHandler (evt) { 
  evt.preventDefault();
  titleName.textContent = nameInput.value; 
  titleJob.textContent = jobInput.value; 
  // closePopup(popupEdit);
};
formElementEdit.addEventListener('submit', submitHandler);  

// // закрытие попапа редактирования
// buttonCloseEdit.addEventListener('click', () => {
//   closePopup(popupEdit); 
// });

