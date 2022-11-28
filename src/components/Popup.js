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
        this._btnClose.addEventListener('click', this.close);
    }

    _removeEventListeners() {
        document    .removeEventListener('keydown', this._handeListenEscape);
        this._popup .removeEventListener('click', this._handleListenOverlay);
        this._btnClose.removeEventListener('click', this.close);
    }

    open() {
        this._popup.classList.add(this._popupOpenSelector);
        this._setEventListeners();
    }

    close () {
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