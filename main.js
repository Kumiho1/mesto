(()=>{"use strict";var e=document.querySelector(".profile__btn-edit"),t=document.querySelector(".popup-edit").querySelector(".popup__input_type_name"),n=document.querySelector(".popup-edit").querySelector(".popup__input_type_job"),r=document.querySelector(".profile__name"),o=document.querySelector(".profile__job"),i=document.querySelector(".profile__btn-add"),u=[{name:"Италия",link:"https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},{name:"Канада",link:"https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=653&q=80"},{name:"Озеро Ратлснейк",link:"https://images.unsplash.com/photo-1502318217862-aa4e294ba657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"},{name:"Тула",link:"https://images.unsplash.com/photo-1595552598993-0510760b1860?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"},{name:"Портланд",link:"https://images.unsplash.com/photo-1434873740857-1bc5653afda8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80"},{name:"Кильписъярви",link:"https://images.unsplash.com/photo-1568607689150-17e625c1586e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}],a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn-save",inactiveButtonClass:"btn-save_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active",fieldSet:".popup__set"};function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formPrivateSelector=document.querySelector(n),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._fieldSet=this._formPrivateSelector.querySelector(t.fieldSet),this._inputList=Array.from(this._fieldSet.querySelectorAll(this._inputSelector)),this._submitButtonSelector=this._fieldSet.querySelector(t.submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButtonSelector.classList.add(this._inactiveButtonClass),this._submitButtonSelector.disabled=!0):(this._submitButtonSelector.classList.remove(this._inactiveButtonClass),this._submitButtonSelector.disabled=!1)}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e){var t=this._fieldSet.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._fieldSet.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"deactivateButton",value:function(){this._submitButtonSelector.classList.add(this._inactiveButtonClass),this._submitButtonSelector.disabled=!0}},{key:"hideAllInputErrors",value:function(){var e=this;this._inputList.forEach((function(t){return e._hideInputError(t)}))}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(){function e(t,n,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),f(this,"_openFoto",(function(){o._handleCardClick(o._name,o._link)})),f(this,"_like",(function(e){e.target.classList.toggle("element__btn-like_active")})),f(this,"_remove",(function(){o._element.remove()})),this._name=t.name,this._link=t.link,this._selector=n,this._handleCardClick=r,this._selectorLike=".element__btn-like",this._selectorTrash=".element__btn-trash",this._selectorFoto=".element__foto"}var t,n;return t=e,(n=[{key:"createCard",value:function(){this._element=this._getTemplate(),this._setEventListeners();var e=this._element.querySelector(this._selectorFoto);return this._element.querySelector(".element__name").textContent=this._name,e.src=this._link,e.alt="".concat(this._name," на фотографии"),this._element}},{key:"_getTemplate",value:function(){return document.querySelector(this._selector).content.querySelector(".element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){this._element.querySelector(this._selectorFoto).addEventListener("click",this._openFoto),this._element.querySelector(this._selectorLike).addEventListener("click",this._like),this._element.querySelector(this._selectorTrash).addEventListener("click",this._remove)}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),b(this,"_handeListenEscape",(function(e){"Escape"===e.key&&n.close()})),b(this,"_handleListenOverlay",(function(e){e.target.classList.contains("popup")&&n.close()})),this.popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"setEventListeners",value:function(){this.popup.addEventListener("click",this._handleListenOverlay),document.addEventListener("keydown",this._handeListenEscape),this.popup.querySelector(".popup__btn-close").addEventListener("click",this.close)}},{key:"_removeEventListeners",value:function(){document.removeEventListener("keydown",this._handeListenEscape),this.popup.removeEventListener("click",this._handleListenOverlay),this.popup.querySelector(".popup__btn-close").removeEventListener("click",this.close)}},{key:"open",value:function(){this.popup.classList.add("popup_opened"),this.setEventListeners()}},{key:"close",value:function(){this._removeEventListeners(),this.popup.classList.remove("popup_opened")}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},w.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function E(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._name=t.popup.querySelector(".popup__name"),t._link=t.popup.querySelector(".popup__foto"),t}return t=u,(n=[{key:"open",value:function(e,t){w(g(u.prototype),"open",this).call(this),this._link.src=t,this._name.alt="".concat(e," на фотографии"),this._name.textContent=e}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(d);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e,t){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},x(e,t)}function C(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return B(e)}function B(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=q(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function q(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}function I(e){return I=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},I(e)}function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var H=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&x(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(r);if(o){var n=I(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function u(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),M(B(r=i.call(this,e)),"_submitForm",(function(e){e.preventDefault(),r._functionSubmitForm(r._getInputValues()),r._formElement.removeEventListener("submit",r._submitForm),r.close()})),M(B(r),"close",(function(){P((n=B(r),I(u.prototype)),"close",n).call(n),r._reset()})),r._inputList=r.popup.querySelectorAll(".popup__input"),r._formElement=r.popup.querySelector(".popup__form"),r._functionSubmitForm=t,r}return t=u,(n=[{key:"open",value:function(){P(I(u.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){P(I(u.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",this._submitForm)}},{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"_reset",value:function(){this._formElement.reset()}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(d);function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var D=function(){function e(t){var n=t.nameInput,r=t.jobInput,o=t.nameInfo,i=t.jobInfo;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=n,this._about=r,this._nameContaier=o,this._aboutContainer=i}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameContaier.textContent,about:this._aboutContainer.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._nameContaier.textContent=t,this._aboutContainer.textContent=n}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),T=new s(a,".popup-edit");T.enableValidation();var V=new s(a,".popup-add-card");V.enableValidation();var A=new O(".popup-foto"),G=new H(".popup-add-card",(function(e){N(U(e))})),F=new H(".popup-edit",(function(e){z.setUserInfo(e)})),W=function(e,t){A.open(e,t)},Y=new y({data:u,renderer:function(e){N(U(e))}},".elements");function U(e){return new p(e,".elements__list",W).createCard()}function N(e){Y.addItem(e)}Y.renderItems(u),i.addEventListener("click",(function(){V.deactivateButton(),G.open(),V.hideAllInputErrors()}));var z=new D({nameInput:t,jobInput:n,nameInfo:r,jobInfo:o});e.addEventListener("click",(function(){T.deactivateButton(),F.open(),T.hideAllInputErrors();var e=z.getUserInfo();t.value=e.name,n.value=e.about,t.focus()}))})();
//# sourceMappingURL=main.js.map