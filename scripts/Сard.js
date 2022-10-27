// //_____________________________
// //  ДОБАВЛЕНИЕ КАРТОЧЕК
// //_____________________________

// попап просмотра фото
const popupFoto = document.querySelector('.popup-foto');

const imgFoto = popupFoto.querySelector('.popup__foto');
const nameFoto = popupFoto.querySelector('.popup__name');


export default class Card{
    constructor(data, selector, functionOpenPopup) {
        this._name = data.name
        this._link = data.link
        this._selector = selector
        this._functionOpenPopup = functionOpenPopup
        this._selectorLike = '.element__btn-like'
        this._selectorTrash = '.element__btn-trash'
        this._selectorFoto = '.element__foto'
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      const cardFoto =  this._element.querySelector(this._selectorFoto);
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
      this._element.querySelector(this._selectorFoto).addEventListener('click', this._openFoto);
      this._element.querySelector(this._selectorLike).addEventListener ('click', this._like);
      this._element.querySelector(this._selectorTrash).addEventListener ('click', this._remove);
      }
  
    _openFoto = () => {
      this._functionOpenPopup(this._name, this._link);
    }
  
    _like = (evt) => {
      evt.target.classList.toggle('element__btn-like_active')
    }
  
    _remove = () => {
      this._element.remove();
    }
  }
