//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  С ФОРМОЙ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (selectorPopup, submitForm) {
        super(selectorPopup)
        this._inputList = this.popup.querySelectorAll('.popup__input')
        this._inputFirst = this._inputList[0]
        this._inputSecond = this._inputList[1]
        this._formElement = this.popup.querySelector('.popup__form')
        this._functionSubmitForm = submitForm
    }

    open() {
        super.open();
        this.reset();
    }

    _getInputValues () {
        const inputsValues = {}
        inputsValues.name = this._inputFirst.value
        inputsValues.link = this._inputSecond.value
        return inputsValues
    }

    setEventListeners () {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitForm)
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this._functionSubmitForm(this._getInputValues()); 
        this._formElement.removeEventListener('submit', this._submitForm)
        this.close()
    } 

    reset () {
        this._formElement.reset(); 
    }

    }