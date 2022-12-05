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
        this._buttonSubmitText = this._popup.querySelector('.popup__btn-save').textContent
        this._buttonSubmit = this._popup.querySelector('.popup__btn-save')

    }

    _setEventListeners () {
        super._setEventListeners();
        this._formElement.addEventListener('submit', this._submitForm)
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._formElement.removeEventListener('submit', this._submitForm)
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
        this.renderLoading(true)
        
        this._functionSubmitForm(this._getInputValues()); 
        this._formElement.removeEventListener('submit', this._submitForm)
    } 

    _reset () {
        this._formElement.reset(); 
    }

    renderLoading (isLoading, loadingText='Сохранение...') {
        if (isLoading) {
            this._buttonSubmit.textContent = loadingText
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitText
        }
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }

    close = () => {
        super.close();
        this._reset();
        this._renderLoading(false);
    }
}