//___________________________________
//  ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА 
//  ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
//___________________________________
import PopupWithForm from './PopupWithForm.js'

export default class PopupWithDelete extends PopupWithForm {
    constructor (selectorPopup) {
        super(selectorPopup)
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this.close();
        return true;
    } 
}