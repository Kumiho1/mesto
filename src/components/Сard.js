// //_____________________________
// //  ДОБАВЛЕНИЕ КАРТОЧЕК
// //_____________________________

// попап просмотра фото

export default class Card{
    constructor(data, selector, handleCardClick, popupDelete, userId, cardId) {
        this._name = data.name
        this._link = data.link
        this._counter = data.likes.length
        this._selector = selector
        this._handleCardClick = handleCardClick
        this._selectorLike = '.element__btn-like'
        this._selectorTrash = '.element__btn-trash'
        this._selectorFoto = '.element__foto'
        this._selectorCounter = '.element__counter'
        this._popupDelete = popupDelete
        this._popupDeleteSaveButton = document.querySelector('.popup-delete').querySelector('.popup__btn-save')
        this._userId = userId
        this._userIdCard = data.owner._id
        this._idCard = cardId
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      const cardFoto =  this._element.querySelector(this._selectorFoto);
      this._element.querySelector('.element__name').textContent = this._name;
      cardFoto.src = this._link;
      cardFoto.alt = `${this._name} на фотографии`;
      
      this._element.querySelector(this._selectorCounter).textContent = this._counter
      
      if (this._isOwnedCard()) {
        this._element.querySelector(this._selectorTrash).remove()
      }

      return this._element;
    };

    _isOwnedCard() {
      return this._userIdCard !== this._userId
    }
  
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
      this._popupDelete.setEventListeners(this._idCard)
      this._popupDelete.open()
    }

    // _remove = () => {
    //   console.log(this._idCard)
    //   this._popupDelete.setEventListeners(this._idCard)
    // }
  }
