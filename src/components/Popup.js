//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
//___________________________________

export default class Popup {
    constructor (selectorPopup) {
        this.popups = document.querySelector(selectorPopup)
    }

    _setEventListeners() {
        this.popups  .addEventListener('click', this._handleListenOverlay)
        document    .addEventListener('keydown', this._handeListenEscape);
        this.popups.querySelector('.popup__btn-close')
                    .addEventListener('click', this.close)
    }

    _removeEventListeners() {
        document    .removeEventListener('keydown', this._handeListenEscape);
        this.popups  .removeEventListener('click', this._handleListenOverlay);
        this.popups.querySelector('.popup__btn-close')
                    .removeEventListener('click', this.close)
    }

    open() {
        this.popups.classList.add('popup_opened');
        this._setEventListeners();
    }

    close () {
        this._removeEventListeners();
        this.popups.classList.remove('popup_opened');
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