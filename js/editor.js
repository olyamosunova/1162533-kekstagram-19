'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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

  var onUploadFileChange = function () {
    var uploadFile = uploadFileElement.files[0];
    var fileName = uploadFile.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        imageElement.src = evt.target.result;
      });
      reader.readAsDataURL(uploadFile);
      openUploadOverlay();
    } else {
      window.notification.showErrorPopup('Допустимые форматы для зарузки: "gif", "jpg", "jpeg", "png"');
    }
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);

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
})();
