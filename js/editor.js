'use strict';

var bodyElement = document.querySelector('body');

var uploadFileElement = document.querySelector('#upload-file');
var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
var imgUploadCloseElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
var imgUploadFormElement = document.querySelector('.img-upload__form');
var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
var imageElement = imgUploadPreviewElement.querySelector('img');

var inputHashtagsElement = document.querySelector('.text__hashtags');
var textareaCommentElement = document.querySelector('.text__description');

var openUploadOverlay = function () {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  window.effect.reset();
  window.scale.reset();
  window.validation.reset();
};

var closeUploadOverlay = function () {
  uploadFileElement.value = '';
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

var uploadFileInputHandler = function () {
  var uploadFile = uploadFileElement.files[0];
  var reader = new FileReader();
  reader.onload = function (evt) {
    imageElement.src = evt.target.result;
  };
  reader.readAsDataURL(uploadFile);
  openUploadOverlay();
};

uploadFileElement.addEventListener('change', uploadFileInputHandler);

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

textareaCommentElement.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

var onSuccess = function () {
  closeUploadOverlay();
  window.notification.showSuccessPopup();
};

var onError = function (wrongMessage) {
  closeUploadOverlay();
  window.notification.showErrorPopup(wrongMessage, 'УПС');
};

imgUploadFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.backend.send(new FormData(imgUploadFormElement), onSuccess, onError);
});
