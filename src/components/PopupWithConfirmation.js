//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor (selectorPopup, functionSubmit) {
        super(selectorPopup)
        this._formElement = this._popup.querySelector('.popup__form')
        this._functionSubmit = functionSubmit
        this._btnSave = this._popup.querySelector('.popup__btn-save')
    }

    open(idCard, card) {
        super.open()
        this._setEventListeners(idCard, card)
    }

    _setEventListeners (idCard, card) {
        super._setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._functionSubmit(idCard, card)
        })
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._formElement.removeEventListener('submit', (evt) => {
            evt.preventDefault();
            this._functionSubmit(idCard, card)
        })
    }

}