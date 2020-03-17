'use strict';

(function () {
  var mainContainerElement = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageElement;

  var showSuccessPopup = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);
    mainContainerElement.appendChild(successMessage);
    messageElement = document.querySelector('.success');
    var successButtonElement = document.querySelector('.success__button');

    document.addEventListener('click', onMessageClick);
    successButtonElement.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onMessageDown);
  };

  var showErrorPopup = function (textMessage, textButton) {
    var errorMessage = errorMessageTemplate.cloneNode(true);

    if (textMessage) {
      errorMessage.querySelector('.error__title').textContent = textMessage;
    }

    if (textButton) {
      errorMessage.querySelector('.error__button').textContent = textButton;
    }

    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    mainContainerElement.appendChild(fragment);
    messageElement = document.querySelector('.error');
    var errorButtonElement = document.querySelector('.error__button');

    document.addEventListener('click', onMessageClick);
    errorButtonElement.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onMessageDown);
  };

  var onSuccessButtonClick = function () {
    hidePopup();
  };

  var onMessageClick = function (evt) {
    if (evt.target === messageElement) {
      hidePopup();
    }
  };

  var onMessageDown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      hidePopup();
    }
  };

  var hidePopup = function () {
    messageElement.remove();
  };

  window.notification = {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup
  };
})();
