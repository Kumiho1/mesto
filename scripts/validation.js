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

// const popupEdit = new FormValidator(validationObject, '.popup-edit').enableValidation()
// const popupAddCard = new FormValidator(validationObject, '.popup-add-card').enableValidation()


class FormValidator {
  constructor (validationObject, formPrivateSelector) {
    this._formSelector = validationObject.formSelector
    this._inputSelector = validationObject.inputSelector
    this._submitButtonSelector = validationObject.submitButtonSelector
    this._inactiveButtonClass = validationObject.inactiveButtonClass
    this._inputErrorClass = validationObject.inputErrorClass
    this._errorClass = validationObject.errorClass
    this._fieldSet = validationObject.fieldSet
    this._formPrivateSelector = formPrivateSelector
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
    const fieldSet = document.querySelector(this._fieldSet)
    const inputList = Array.from(fieldSet.querySelectorAll(this._inputSelector));

    const buttonElement = fieldSet.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        // this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // активация и дезактивация кнопки
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)){
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled = false;
    }
    console.log(10)
  };

  // проверка на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  };

  // span ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(this._fieldSet).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(this._fieldSet).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
}