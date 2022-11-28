// //_____________________________
// //  ДОБАВЛЕНИЕ КАРТОЧЕК
// //_____________________________

// попап просмотра фото

export default class Card{
    constructor(data, selectorContainerCards, handleCardClick, popupDelete, userId, cardId, api) {
        this._name = data.name
        this._link = data.link
        this._counter = data.likes.length
        this._likes = data.likes
        this._containerCards =  document.querySelector(selectorContainerCards)
        this._handleCardClick = handleCardClick
        this._selectorLike = '.element__btn-like'
        // this._containerLike = this._element.querySelector(this._selectorLike)
        this._selectorTrash = '.element__btn-trash'
        this._selectorFoto = '.element__foto'
        this._selectorCounter = '.element__counter'
        this._popupDelete = popupDelete
        this._popupDeleteSaveButton = document.querySelector('.popup-confirmation').querySelector('.popup__btn-save')
        this._userId = userId
        this._userIdCard = data.owner._id
        this._idCard = cardId
        this._api = api
        // this._element = () => {
        //   const cardElement = 
        //     this._containerCards
        //     .content
        //     .querySelector('.element')
        //     .cloneNode(true);
        //   return cardElement;
        // }
        // console.log(this._element);
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._cardFoto = this._element.querySelector(this._selectorFoto);
      this._element.querySelector('.element__name').textContent = this._name;
      this._cardFoto.src = this._link;
      this._cardFoto.alt = `${this._name} на фотографии`;
      
      this._element.querySelector(this._selectorCounter).textContent = this._counter
      
      // корзина
      if (this._isOwnedCard()) {
        this._element.querySelector(this._selectorTrash).remove()
      }

      // лайк
      this._likes.forEach(el =>{
      if (el._id == this._userId) {
        this._element.querySelector(this._selectorLike).classList.add('element__btn-like_active')
      }
      })
      return this._element;
    };

    _isOwnedCard() {
      return this._userIdCard !== this._userId
    }
  
    _getTemplate() {
      const cardElement = 
        this._containerCards
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
     if ( evt.target.classList.contains('element__btn-like_active') ) {
        this._api.deleteLike(this._idCard)
          .then((res) => {
            this._assignLikeCount(res)
            evt.target.classList.remove('element__btn-like_active')
          })
          .catch((err) => {
            console.log(err); 
          });
        
     } else {
        this._api.sendLike(this._idCard)
          .then((res) => {
            this._assignLikeCount(res)
            evt.target.classList.add('element__btn-like_active')
          })
          .catch((err) => {
            console.log(err); 
          });
     }
    }

    _assignLikeCount (cardInfo) {
      this._element.querySelector(this._selectorCounter).textContent = cardInfo.likes.length
    }

    _openPopupRemove = () => {
      this._popupDelete.open(this._idCard, this._element)
    }

     _remove = () => {
      this._element.remove()
    }

  }
