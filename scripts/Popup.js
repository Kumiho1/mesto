//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
//___________________________________

export default class Popup {
    constructor (selectorPopup) {
        this.popup = document.querySelector(selectorPopup)
    }

    setEventListeners() {
        this.popup.addEventListener('click', this._handleListenOverlay)
        document.addEventListener('keydown', this._handeListenEscape);
        this.popup.querySelector('.popup__btn-close').addEventListener('click', this.close)
    }

    open() {
        this.popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close = () => {
        document.removeEventListener('keydown', this._handeListenEscape);
        this.popup.classList.remove('popup_opened');
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