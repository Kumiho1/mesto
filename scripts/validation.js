//_____________________________
//  ВАЛИДАЦИЯ
//_____________________________

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  fieldSet:'.popup__set'
};

class FormValidator {
  constructor (validationObject, formPrivateSelector) {
    this._formSelector = validationObject.formSelector
    this._inputSelector = validationObject.inputSelector
    this._submitButtonSelector = document.querySelector(validationObject.fieldSet).querySelector(validationObject.submitButtonSelector)
    this._inactiveButtonClass = validationObject.inactiveButtonClass
    this._inputErrorClass = validationObject.inputErrorClass
    this._errorClass = validationObject.errorClass
    this._fieldSet = document.querySelector(validationObject.fieldSet)
    this._formPrivateSelector = formPrivateSelector
    this._inputList = Array.from(this._fieldSet.querySelectorAll(this._inputSelector))
  }

  //  отмена перезагрузки. выделение филдсетов
  enableValidation() {
    
    document.querySelector(this._formPrivateSelector).addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    this._setEventListeners();
  };

  //  выделение инпутов  
  _setEventListeners() {   
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement
      inputElement.addEventListener('input', function () {
        console.log(inputElement)
        // this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  };

  // активация и дезактивация кнопки
  _toggleButtonState () {
    if (this._hasInvalidInput()){
      this._submitButtonSelector.classList.add(this._inactiveButtonClass)
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass)
      this._submitButtonSelector.disabled = false;
    }
  };

  // проверка на валидность
  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  };

  // span ошибки
  _showInputError() {
    const errorElement = this._fieldSet.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError() {
    const errorElement = this._fieldSet.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
}

new FormValidator(validationObject, '.popup-edit').enableValidation()
new FormValidator(validationObject, '.popup-add-card').enableValidation()