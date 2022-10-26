// //_____________________________
// //  ДОБАВЛЕНИЕ КАРТОЧЕК
// //_____________________________

// попап просмотра фото
const popupFoto = document.querySelector('.popup-foto');

const imgFoto = popupFoto.querySelector('.popup__foto');
const nameFoto = popupFoto.querySelector('.popup__name');


export default class Card{
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
      this._element.querySelector('.element__foto').addEventListener('click', () => this._openFotoZum());
    }
  
    _like() {
      this._element.querySelector('.element__btn-like').addEventListener ('click', function (evt) {
        evt.target.classList.toggle('element__btn-like_active')
      });
    }
  
    _remove() {
      this._element.querySelector('.element__btn-trash').addEventListener ('click', () => this._element.closest('.element').remove());
    }

    // открытие попапа фото  
    _openFotoZum () {
      
      imgFoto.src = this._link;
      imgFoto.alt = `${this._name} на фотографии`;
      nameFoto.textContent = this._name;
      openPopup(popupFoto);
    };

  }

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
