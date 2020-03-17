'use strict';

(function () {
  var HASHTAGS_LENGTH_MAX = 5;
  var HASHTAG_LENGTH_MAX = 20;
  var COMMENT_LENGTH_MAX = 140;

  var Message = {
    HASHTAGS_MAX_LENGTH: 'Нельзя указать больше пяти хэш-тегов',
    HASHTAG_START: 'Хэштег должен начинаться со знака решетки',
    HASHTAG_MIN_LENGTH: 'Хэштег не может состоять только из решетки',
    HASHTAG_ONLY_TEXT: 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д',
    HASHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов',
    HASHTAG_SEPARATION: 'Хэш-теги разделяются пробелами',
    HASHTAG_UNIQUE: 'Один и тот же хэш-тег не может быть использован дважды',
    COMMENT_LENGTH: 'Длина комментария не может составлять больше 140 символов'
  };

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
    var uniqueHashtags = [];
    if (hashtags.length > HASHTAGS_LENGTH_MAX) {
      errorMessage = Message.HASHTAGS_MAX_LENGTH;
      return errorMessage;
    } else if (hashtags === '') {
      errorMessage = '';
      return errorMessage;
    }

    hashtags.forEach(function (item) {
      var hashtagValue = item.substr(1, item.length - 1);
      if (item.charAt(0) !== '#') {
        errorMessage = Message.HASHTAG_START;
        return errorMessage;
      } else if (item === '#') {
        errorMessage = Message.HASHTAG_MIN_LENGTH;
        return errorMessage;
      } else if (!(/^[а-яА-ЯёЁa-zA-Z0-9#]+$/.test(hashtagValue))) {
        errorMessage = Message.HASHTAG_ONLY_TEXT;
        return errorMessage;
      } else if (item.length > HASHTAG_LENGTH_MAX) {
        errorMessage = Message.HASHTAG_MAX_LENGTH;
        return errorMessage;
      } else if (item.indexOf('#', 1) > 0) {
        errorMessage = Message.HASHTAG_SEPARATION;
        return errorMessage;
      } else if (uniqueHashtags.includes(item)) {
        errorMessage = Message.HASHTAG_UNIQUE;
        return errorMessage;
      }
      uniqueHashtags.push(item);
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
      textareaCommentElement.setCustomValidity(Message.COMMENT_LENGTH);
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
