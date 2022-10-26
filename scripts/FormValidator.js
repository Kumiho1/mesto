//_____________________________
//  ВАЛИДАЦИЯ
//_____________________________

export default class FormValidator {
  constructor (validationObject, formPrivateSelector) {
    this._formPrivateSelector = formPrivateSelector
    this._formSelector = validationObject.formSelector
    this._inputSelector = validationObject.inputSelector
    this._inactiveButtonClass = validationObject.inactiveButtonClass
    this._inputErrorClass = validationObject.inputErrorClass
    this._errorClass = validationObject.errorClass
    this._fieldSet = document.querySelector(validationObject.fieldSet)
    this._inputList = Array.from(this._fieldSet.querySelectorAll(this._inputSelector))
    this._submitButtonSelector = this._fieldSet.querySelector(validationObject.submitButtonSelector)
  }

  //  отмена перезагрузки. выделение инпутов
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
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
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
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  };

  // span ошибки
  _showInputError(inputElement) {
    const errorElement = this._fieldSet.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._fieldSet.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
}

