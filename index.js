
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
//  УНИВЕРСАЛЬНОЕ
//_____________________________

// добавление кода в html элемент
function addElementInContainer(element,container) { 
  container.prepend(element);
};

//_____________________________
//  ПОПАП
//_____________________________

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

// слушатель Esc
function listenEscape(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    };
};

// закрытие по оверлею
popupList.forEach(p => {
  p.addEventListener('click', (evt)=> {
    if (evt.target.classList.contains('popup')){
      closePopup(p);
    }
  })
});

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

//_____________________________
//  ДОБАВЛЕНИЕ КАРТОЧКИ
//_____________________________

// ф-ция добавления карточки
  function createCard(name, link) {
    const cardsTemplate = document.querySelector('.elements__list').content;
    const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const cardFoto =  cardElement.querySelector('.element__foto');
  
    cardElement.querySelector('.element__name').textContent = name;
    cardFoto.src = link;
    cardFoto.alt = `${name} на фотографии`;

    // нажатие лайка
    cardElement.querySelector('.element__btn-like').addEventListener ('click', function (evt) {
        evt.target.classList.toggle('element__btn-like_active')
      });
    // удаление карточки
    cardElement.querySelector('.element__btn-trash').addEventListener ('click', () => cardElement.closest('.element').remove());
        
    // открытие попапа фото
    cardFoto.addEventListener ('click', ()=> openFoto (name, link));
    
    return cardElement;
  };

// добавление массив фотографий
  initialCards.forEach(item => {
    const card = createCard(item.name , item.link);
    addElementInContainer(card ,cardsContainer)
  });

//_____________________________
//  ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
//_____________________________

buttonAddCard.addEventListener('click', ()=>{
  resetForm(popupAddCard);
  openPopup(popupAddCard);
  deactivateButton(buttonSaveAddFoto);
});

// обработчик «отправки» формы добавления фото
function submitHandlerFoto (evt) { 
  evt.preventDefault();
  // создание и добавление корточки
  card = createCard(nameFotoInput.value, linkFotoInput.value);
  addElementInContainer(card, cardsContainer);
  closePopup(popupAddCard);
};
formElementAddFoto.addEventListener('submit', submitHandlerFoto);  

// закрытие попапа
buttonCloseAddFoto.addEventListener('click', () => {
  closePopup(popupAddCard);
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