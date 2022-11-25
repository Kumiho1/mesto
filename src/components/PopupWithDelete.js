//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
    constructor (selectorPopup, functionSubmit) {
        super(selectorPopup)
        this._formElement = this._popup.querySelector('.popup__form')
        this._functionSubmit = functionSubmit
    }

    open(idCard, card) {
        this._popup.classList.add(this._popupOpenSelector); 
        this.setEventListeners(idCard, card)
    }

    setEventListeners (idCard, card) {
        super.setEventListeners();
        this._popup.querySelector('.popup__btn-save').addEventListener('click', (evt) => {
            evt.preventDefault();
            this._functionSubmit(idCard, card)
            this.close();
        })
    }
    
}