'use strict';

var bodyElement = document.querySelector('body');

var uploadFileElement = document.querySelector('#upload-file');
var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
var imgUploadCloseElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
var imgUploadFormElement = document.querySelector('.img-upload__form');

var inputHashtagsElement = document.querySelector('.text__hashtags');

uploadFileElement.addEventListener('change', function () {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  window.effect.reset();
  window.scale.reset();
});

imgUploadCloseElement.addEventListener('click', function () {
  imgUploadOverlayElement.classList.add('hidden');
  uploadFileElement.value = '';
  bodyElement.classList.remove('modal-open');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.utils.ESC_KEYCODE) {
    imgUploadOverlayElement.classList.add('hidden');
    uploadFileElement.value = '';
    bodyElement.classList.remove('modal-open');
  }
});

inputHashtagsElement.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

imgUploadFormElement.addEventListener('submit', function (evt) {
  window.upload(new FormData(imgUploadFormElement), function (response) {
    imgUploadOverlayElement.classList.add('hidden');
  });

  evt.preventDefault();
});
