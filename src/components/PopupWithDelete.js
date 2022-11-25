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

    open() {
        this._popup.classList.add(this._popupOpenSelector);
    }

    setEventListeners (idCard) {
        super.setEventListeners();
        // this._formElement.addEventListener('submit', () => {
        //     this._submitForm(evt, idCard)
        // })
        console.log(idCard)
        this._popup.querySelector('.popup__btn-save').addEventListener('click', () => {
            this._submitForm(idCard)
        })
    }

    _submitForm = (idCard) => {
        console.log(idCard)
        // evt.preventDefault();
        this._functionSubmit(idCard)
        this.close();
    } 
}