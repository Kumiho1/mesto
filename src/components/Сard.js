// //_____________________________
// //  ДОБАВЛЕНИЕ КАРТОЧЕК
// //_____________________________

// попап просмотра фото

export default class Card{
    constructor(data, selector, handleCardClick, popupDelete) {
        this._name = data.name
        this._link = data.link
        this._selector = selector
        this._handleCardClick = handleCardClick
        this._selectorLike = '.element__btn-like'
        this._selectorTrash = '.element__btn-trash'
        this._selectorFoto = '.element__foto'
        this._popupDelete = popupDelete
        this._popupDeleteSaveButton = document.querySelector('.popup-delete').querySelector('.popup__btn-save')
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
      this._element.querySelector(this._selectorTrash).addEventListener ('click', this._openPopupRemove);
      }
  
    _openFoto = () => {
      this._handleCardClick( this._name, this._link);
    }
  
    _like = (evt) => {
      evt.target.classList.toggle('element__btn-like_active')
    }
  
    _openPopupRemove = () => {
      this._popupDelete('.popup-delete').open()
      this._popupDeleteSaveButton.addEventListener('click', this._remove)
    }

    _remove = () => {
      this._element.remove();
    }
  }
