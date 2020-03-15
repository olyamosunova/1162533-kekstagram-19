'use strict';

var inputHashtagsElement = document.querySelector('.text__hashtags');

var validateHashtagsList = function (hashtags) {
  var uniquHashtags = [];
  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }

  hashtags.forEach(function (item) {
    var hashtagValue = item.substr(1, item.length - 1);
    if (item.charAt(0) !== '#') {
      return 'Хэштег должен начинаться со знака решетки';
    } else if (item.length < 2) {
      return 'Хэштег не может состоять только из решетки';
    } else if (!(/^[а-яА-ЯёЁa-zA-Z0-9#]+$/.test(hashtagValue))) {
      return 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д';
    } else if (item.length > 20) {
      return 'Максимальная длина одного хэш-тега 20 символов';
    } else if (item.indexOf('#', 1) > 0) {
      return 'Хэш-теги разделяются пробелами';
    } else if (uniquHashtags.includes(item)) {
      return 'Один и тот же хэш-тег не может быть использован дважды';
    } else if (item.length === 0) {
      return '';
    }
    uniquHashtags.push(item);
    return '';
  });
  return '';
};

inputHashtagsElement.addEventListener('input', function () {
  var hashtagsList = inputHashtagsElement.value.replace(/\s+/g, ' ').toLowerCase().split(' ');
  inputHashtagsElement.setCustomValidity(validateHashtagsList(hashtagsList));
});

var reset = function () {
  inputHashtagsElement.value = '';
};

window.hashtags = {
  reset: reset
};
