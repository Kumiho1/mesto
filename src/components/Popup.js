//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
//___________________________________

export default class Popup {
    constructor (selectorPopup) {
        this._popup = document.querySelector(selectorPopup)
        this._btnCloseSelector = '.popup__btn-close'
        this._btnClose = this._popup.querySelector(this._btnCloseSelector)
        this._popupOpenSelector = 'popup_opened'

    }

    _setEventListeners() {
        document    .addEventListener('keydown', this._handeListenEscape);
        this._popup .addEventListener('click', this._handleListenOverlay);
<<<<<<< HEAD
        this._btnClose.addEventListener('click', this._closeButton = () => this.close());
=======
        this._btnClose.addEventListener('click', () =>  this.close());
>>>>>>> dd1b5035f0f037d7623f5c4caf78b1ddd2a5de7a
    }

    _removeEventListeners() {
        document    .removeEventListener('keydown', this._handeListenEscape);
        this._popup .removeEventListener('click', this._handleListenOverlay);
<<<<<<< HEAD
        this._btnClose.removeEventListener('click', this._closeButton);
=======
        this._btnClose.removeEventListener('click', () => this.close());
>>>>>>> dd1b5035f0f037d7623f5c4caf78b1ddd2a5de7a
    }

    open() {
        this._popup.classList.add(this._popupOpenSelector);
        this._setEventListeners();
    }

    close() {
        this._removeEventListeners();
        this._popup.classList.remove(this._popupOpenSelector);
    }

    _handeListenEscape = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
          };
    }

    _handleListenOverlay = (evt) => {
        if (evt.target.classList.contains('popup')){
            this.close();
          }
    }
}