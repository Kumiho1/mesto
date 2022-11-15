//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  С КАРТИНКОЙ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor (selectorPopup) {
        super(selectorPopup)
        this._name = this._popup.querySelector('.popup__name')
        this._link = this._popup.querySelector('.popup__foto')
    }

    open (name, link) {
        super.open()
        this._link.src = link;
        this._name.alt = `${name} на фотографии`;
        this._name.textContent = name;
    }
}