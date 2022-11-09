//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  С ФОРМОЙ
//___________________________________

export default class PopupWithForm extends Popup {
    constructor () {
        super()
    }

    _getInputValues () {
        const inputsValues = document.querySelector(this.selectorPopup).querySelectorAll('.popup__input')

        return inputsValues
    }

    setEventListeners () {
        
    }
    }