import FormValidator from './FormValidator.js';
import Card from './Сard.js';

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
function addElementInContainer(element,container) { 
  container.prepend(element);
};

// показать попап
function openPopup(p) {
  document.addEventListener('keydown', handleListenEscape);
  p.classList.add('popup_opened');
};

// скрыть попап 
function closePopup(p) {
  document.removeEventListener('keydown', handleListenEscape);
  p.classList.remove('popup_opened');
};

// закрытие по оверлею
popupList.forEach(p => {
  p.addEventListener('click', (evt)=> {
    if (evt.target.classList.contains('popup')){
      closePopup(p);
    }
  })
});

// слушатель Esc
function handleListenEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

// сброс формы
function resetForm(p) {
  // очистка инпутов
    p.querySelector('.popup__form').reset();
  // удаление ошибки
    p.querySelectorAll('.popup__input-error').forEach(spanError =>{
      spanError.textContent='';
    })
  // удаление стиля ошибки
    p.querySelectorAll('.popup__input').forEach(inputElement =>{
      inputElement.classList.remove('popup__input_type_error');
    })
};

// блокировка кнопки
function deactivateButton(btn) {
  btn.classList.add('btn-save_inactive');
  btn.disabled = true;
};

//_____________________________
//  для валидации
//_____________________________

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  fieldSet:'.popup__set'
};

//_____________________________
//  добавление массива фотографий
//_____________________________

// добавление массива фотографий
initialCards.forEach(item => {
  const card = new Card(item, '.elements__list', openPopupFoto);
  const cardElement = card.createCard(item)
  addElementInContainer(cardElement ,cardsContainer)
});

//_____________________________
//  ПОПАП ФОТО
//_____________________________

// закрытие попапа фото
buttonCloseFoto.addEventListener('click', () => {
closePopup(popupFoto);
}); 

// открытие попапа фото
function openPopupFoto(name, link) {
      imgFoto.src = link;
      imgFoto.alt = `${name} на фотографии`;
      nameFoto.textContent = name;
      openPopup(popupFoto);
}

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

buttonAddCard.addEventListener('click', ()=>{
  new FormValidator(validationObject, '.popup-add-card').enableValidation();
  resetForm(popupAddCard);
  openPopup(popupAddCard);
  deactivateButton(buttonSaveAddFoto);
});

// обработчик «отправки» формы добавления фото
function submitHandlerFoto (evt) { 
  evt.preventDefault();
  // создание и добавление корточки
  const dataCard = {
    name: nameFotoInput.value,
    link: linkFotoInput.value
  }
  const card = new Card(dataCard, '.elements__list', openPopupFoto).createCard()
  addElementInContainer(card, cardsContainer);
  closePopup(popupAddCard);
};
formElementAddFoto.addEventListener('submit', submitHandlerFoto);  

// закрытие попапа
buttonCloseAddFoto.addEventListener('click', () => {
  closePopup(popupAddCard);
});

//_____________________________
//  РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//_____________________________

// нажатие кнопки редактирования
buttonEdit.addEventListener('click', ()=>{  
  new FormValidator(validationObject, '.popup-edit').enableValidation();
  resetForm(popupEdit);
  openPopup(popupEdit);
  deactivateButton(buttonSaveEdit)
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
  closePopup(popupEdit);
};
formElementEdit.addEventListener('submit', submitHandler);  

// закрытие попапа редактирования
buttonCloseEdit.addEventListener('click', () => {
  closePopup(popupEdit); 
});

