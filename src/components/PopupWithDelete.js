//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
//___________________________________
import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
    constructor (selectorPopup) {
        super(selectorPopup)
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this.close();
        return true;
    } 
}