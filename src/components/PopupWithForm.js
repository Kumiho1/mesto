//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  С ФОРМОЙ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor (selectorPopup, submitForm) {
        super(selectorPopup)
        this._inputList = this._popup.querySelectorAll('.popup__input')
        this._formElement = this._popup.querySelector('.popup__form')
        this._functionSubmitForm = submitForm
    }

    setEventListeners () {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitForm)
    }

    _getInputValues () {
        const inputsValues = {}
        this._inputList.forEach(input => {
            inputsValues[input.name] = input.value
        });
        return inputsValues
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this._functionSubmitForm(this._getInputValues()); 
        this._formElement.removeEventListener('submit', this._submitForm)
        this.close()
    } 

    _reset () {
        this._formElement.reset(); 
    }

    close = () => {
        super.close();
        this._reset();
    }
}