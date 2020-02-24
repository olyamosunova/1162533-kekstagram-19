'use strict';

var BODY = document.querySelector('body');

var uploadFileElement = document.querySelector('#upload-file');
var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
var imgUploadCloseElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');

var inputHashtagsElement = document.querySelector('.text__hashtags');

uploadFileElement.addEventListener('change', function () {
  imgUploadOverlayElement.classList.remove('hidden');
  BODY.classList.add('modal-open');
  window.effect();
  window.scale();
});

imgUploadCloseElement.addEventListener('click', function () {
  imgUploadOverlayElement.classList.add('hidden');
  uploadFileElement.value = '';
  BODY.classList.remove('modal-open');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.utils.ESC_KEYCODE) {
    imgUploadOverlayElement.classList.add('hidden');
    uploadFileElement.value = '';
    BODY.classList.remove('modal-open');
  }
});

inputHashtagsElement.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});
