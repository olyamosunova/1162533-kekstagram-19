'use strict';

var inputHashtagsElement = document.querySelector('.text__hashtags');

var validateHashtagsList = function (hashtags) {
  var uniquHashtags = [];
  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  for (var a = 0; a < hashtags.length; a++) {
    var hashtagValue = hashtags[a].substr(1, hashtags[a].length - 1);
    if (hashtags[a].charAt(0) !== '#') {
      return 'Хэштег должен начинаться со знака решетки';
    } else if (hashtags[a].length < 2) {
      return 'Хэштег не может состоять только из решетки';
    } else if (!(/^[а-яА-ЯёЁa-zA-Z0-9#]+$/.test(hashtagValue))) {
      return 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д';
    } else if (hashtags[a].length > 20) {
      return 'Максимальная длина одного хэш-тега 20 символов';
    } else if (hashtags[a].indexOf('#', 1) > 0) {
      return 'Хэш-теги разделяются пробелами';
    } else if (uniquHashtags.includes(hashtags[a])) {
      return 'Один и тот же хэш-тег не может быть использован дважды';
    }
    uniquHashtags.push(hashtags[a]);
  }
  return '';
};

inputHashtagsElement.addEventListener('input', function () {
  var hashtagsList = inputHashtagsElement.value.replace(/\s+/g, ' ').toLowerCase().split(' ');
  inputHashtagsElement.setCustomValidity(validateHashtagsList(hashtagsList));
});
