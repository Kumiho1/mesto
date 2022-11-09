//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  С КАРТИНКОЙ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor (selectorPopup, name, link) {
        super()
        this._selectorPopup = selectorPopup
        this.name = name
        this.link = link
    }

    open () {
        document.querySelector(this._selectorPopup).querySelector('.popup__foto').src = this.link;
        document.querySelector(this._selectorPopup).querySelector('.popup__foto').alt = `${this.name} на фотографии`;
        document.querySelector(this._selectorPopup).querySelector('.popup__name').textContent = this.name;
        document.querySelector(this._selectorPopup).classList.add('popup_opened');
    }
}