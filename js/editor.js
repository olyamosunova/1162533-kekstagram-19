'use strict';

var bodyElement = document.querySelector('body');

var uploadFileElement = document.querySelector('#upload-file');
var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
var imgUploadCloseElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
var imgUploadFormElement = document.querySelector('.img-upload__form');

var inputHashtagsElement = document.querySelector('.text__hashtags');

var openUploadOverlay = function () {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  window.effect.reset();
  window.scale.reset();
  window.hashtags.reset();
};

var closeUploadOverlay = function () {
  imgUploadOverlayElement.classList.add('hidden');
  uploadFileElement.value = '';
  bodyElement.classList.remove('modal-open');
};

uploadFileElement.addEventListener('change', function () {
  openUploadOverlay();
});

imgUploadCloseElement.addEventListener('click', function () {
  closeUploadOverlay();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.utils.ESC_KEYCODE) {
    closeUploadOverlay();
  }
});

inputHashtagsElement.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

var mainContainerElement = document.querySelector('main');

var onSuccess = function () {
  imgUploadOverlayElement.classList.add('hidden');

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  fragment.appendChild(successMessage);
  mainContainerElement.appendChild(fragment);

  var successButtonElement = document.querySelector('.success__button');

  successButtonElement.addEventListener('click', function () {
    mainContainerElement.removeChild(successMessage);
  });

  window.onclick = function (evt) {
    if (evt.target === successMessage) {
      mainContainerElement.removeChild(successMessage);
    }
  };

  window.addEventListener('keydown', function (keyEvt) {
    if (keyEvt.keyCode === window.utils.ESC_KEYCODE) {
      mainContainerElement.removeChild(successMessage);
    }
  });
};

var onError = function () {
  imgUploadOverlayElement.classList.add('hidden');

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorMessageTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  fragment.appendChild(errorMessage);
  mainContainerElement.appendChild(fragment);

  var errorButtonElement = document.querySelector('.error__button');

  errorButtonElement.addEventListener('click', function () {
    mainContainerElement.removeChild(errorMessage);
  });

  window.onclick = function (evt) {
    if (evt.target === errorMessage) {
      mainContainerElement.removeChild(errorMessage);
    }
  };

  window.addEventListener('keydown', function (keyEvt) {
    if (keyEvt.keyCode === window.utils.ESC_KEYCODE) {
      mainContainerElement.removeChild(errorMessage);
    }
  });
};

imgUploadFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.backend.send(new FormData(imgUploadFormElement), onSuccess, onError);
});
