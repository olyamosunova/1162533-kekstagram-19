'use strict';

(function () {
  var HASHTAGS_LENGTH_MAX = 5;
  var HASHTAG_LENGTH_MAX = 20;
  var COMMENT_LENGTH_MAX = 140;

  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var textareaCommentElement = document.querySelector('.text__description');

  var addInvalidMarker = function (field) {
    field.style.borderColor = 'red';
  };

  var removeInvalidMarker = function (field) {
    field.style.borderColor = 'inherit';
  };

  var validateHashtagsList = function () {
    var hashtags = inputHashtagsElement.value.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');
    var errorMessage = '';
    var successMessage = '';
    var uniquHashtags = [];
    if (hashtags.length > HASHTAGS_LENGTH_MAX) {
      errorMessage = 'Нельзя указать больше пяти хэш-тегов';
      return errorMessage;
    } else if (hashtags === '') {
      errorMessage = '';
      return errorMessage;
    }

    hashtags.forEach(function (item) {
      var hashtagValue = item.substr(1, item.length - 1);
      if (item.charAt(0) !== '#') {
        errorMessage = 'Хэштег должен начинаться со знака решетки';
        return errorMessage;
      } else if (item === '#') {
        errorMessage = 'Хэштег не может состоять только из решетки';
        return errorMessage;
      } else if (!(/^[а-яА-ЯёЁa-zA-Z0-9#]+$/.test(hashtagValue))) {
        errorMessage = 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д';
        return errorMessage;
      } else if (item.length > HASHTAG_LENGTH_MAX) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов';
        return errorMessage;
      } else if (item.indexOf('#', 1) > 0) {
        errorMessage = 'Хэш-теги разделяются пробелами';
        return errorMessage;
      } else if (uniquHashtags.includes(item)) {
        errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
        return errorMessage;
      }
      uniquHashtags.push(item);
      return errorMessage;
    });

    if (errorMessage) {
      addInvalidMarker(inputHashtagsElement);
      return errorMessage;
    } else {
      removeInvalidMarker(inputHashtagsElement);
      return successMessage;
    }
  };

  inputHashtagsElement.addEventListener('input', function () {
    inputHashtagsElement.setCustomValidity(validateHashtagsList());
  });

  textareaCommentElement.addEventListener('input', function () {
    if (textareaCommentElement.value.length > COMMENT_LENGTH_MAX) {
      addInvalidMarker(textareaCommentElement);
      textareaCommentElement.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    } else {
      removeInvalidMarker(textareaCommentElement);
      textareaCommentElement.setCustomValidity('');
    }
  });

  var reset = function () {
    inputHashtagsElement.value = '';
    textareaCommentElement.value = '';
  };

  window.validation = {
    reset: reset
  };

})();
