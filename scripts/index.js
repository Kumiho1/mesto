
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
  document.addEventListener('keydown', listenEscape);
  p.classList.add('popup_opened');
};

// скрыть попап 
function closePopup(p) {
  document.removeEventListener('keydown', listenEscape);
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
function listenEscape(evt) {
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

// //_____________________________
// //  ДОБАВЛЕНИЕ КАРТОЧЕК
// //_____________________________

class Card{
  constructor(data, selector) {
      this._name = data.name
      this._link = data.link
      this._selector = selector
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardFoto =  this._element.querySelector('.element__foto');
    this._element.querySelector('.element__name').textContent = this._name;
    cardFoto.src = this._link;
    cardFoto.alt = `${this._name} на фотографии`;
    
    return this._element;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._openFoto()
    this._like()
    this._remove()
    }

  _openFoto() {
    this._element.querySelector('.element__foto').addEventListener('click', ()=> openFoto(this._name, this._link));
  }

  _like() {
    this._element.querySelector('.element__btn-like').addEventListener ('click', function (evt) {
      evt.target.classList.toggle('element__btn-like_active')
    });
  }

  _remove() {
    this._element.querySelector('.element__btn-trash').addEventListener ('click', () => this._element.closest('.element').remove());
  }
}

// добавление массив фотографий
initialCards.forEach(item => {
  const card = new Card(item, '.elements__list');
  const cardElement = card.createCard(item)
  addElementInContainer(cardElement ,cardsContainer)
});

//_____________________________
//  ПОПАП ФОТО
//_____________________________

// открытие попапа фото  
function openFoto (name, link) {
  openPopup(popupFoto);
  imgFoto.src = link;
  imgFoto.alt = `${name} на фотографии`;
  nameFoto.textContent = name;
};

// закрытие попапа фото
buttonCloseFoto.addEventListener('click', () => {
closePopup(popupFoto);
}); 

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

buttonAddCard.addEventListener('click', ()=>{
  resetForm(popupAddCard);
  openPopup(popupAddCard);
  deactivateButton(buttonSaveAddFoto);
  new FormValidator(validationObject, '.popup-add-card').enableValidation()
});

// обработчик «отправки» формы добавления фото
function submitHandlerFoto (evt) { 
  evt.preventDefault();
  // создание и добавление корточки
  const dataCard = {
    name: nameFotoInput.value,
    link: linkFotoInput.value
  }
  const card = new Card(dataCard, '.elements__list').createCard()
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
  resetForm(popupEdit);
  openPopup(popupEdit);
  deactivateButton(buttonSaveEdit)
  // присвоение значения title инпутам
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  nameInput.focus();
  new FormValidator(validationObject, '.popup-edit').enableValidation()
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