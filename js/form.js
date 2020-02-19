'use strict';

(function () {
  var BODY = document.querySelector('body');

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadClose = imgUploadOverlay.querySelector('.img-upload__cancel');

  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value').value;
  var effectRadios = imgUploadOverlay.querySelectorAll('.effects__radio');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var image = imgUploadPreview.querySelector('img');

  var inputHashtags = imgUploadOverlay.querySelector('.text__hashtags');
  var currentEffect;

  var effecstList = {
    chrome: {
      className: 'effects__preview--chrome',
      min: 0,
      max: 1,
      unit: '',
      getIntensity: function (percent) {
        return ('grayscale(' + percent + ')');
      }
    },
    sepia: {
      className: 'effects__preview--sepia',
      min: 0,
      max: 1,
      unit: '',
      getIntensity: function (percent) {
        return ('sepia(' + percent + ')');
      }
    },
    marvin: {
      className: 'effects__preview--marvin',
      min: 0,
      max: 100,
      unit: '%',
      getIntensity: function (percent) {
        return ('invert(' + percent + ')');
      }
    },
    phobos: {
      className: 'effects__preview--phobos',
      min: 0,
      max: 3,
      unit: 'px',
      getIntensity: function (percent) {
        return ('blur(' + percent + ')');
      }
    },
    heat: {
      className: 'effects__preview--heat',
      min: 1,
      max: 3,
      unit: '',
      getIntensity: function (percent) {
        return ('brightness(' + percent + ')');
      }
    }
  };

  var showSlider = function () {
    effectLevel.classList.remove('hidden');
  };

  var hiddenSlider = function () {
    effectLevel.classList.add('hidden');
  };

  var applyEffect = function (level) {
    image.style.filter = currentEffect.getIntensity(level);
  };

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    BODY.classList.add('modal-open');

    image.classList = 'img-upload__preview';
    image.removeAttribute('style');
    hiddenSlider();
  });

  imgUploadClose.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    BODY.classList.remove('modal-open');
  });

  document.addEventListener('keydown', function (evt) {
    if ((evt.target !== inputHashtags) && (evt.keyCode === window.util.ESC_KEYCODE)) {
      imgUploadOverlay.classList.add('hidden');
      uploadFile.value = '';
      BODY.classList.remove('modal-open');
    }
  });

  for (var i = 0; i < effectRadios.length; i++) {
    effectRadios[i].addEventListener('change', function (evt) {
      if (currentEffect) {
        image.classList.remove(currentEffect.className);
      }

      currentEffect = effecstList[evt.target.value];

      if (currentEffect) {
        image.classList.add(currentEffect.className);
        showSlider();
      } else {
        hiddenSlider();
      }
      image.removeAttribute('style');
    });
  }

  effectLevelLine.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var levelLine = effectLevelLine.getBoundingClientRect();

    var coordsClick = {
      x: evt.clientX - levelLine.left,
      y: evt.clientY - levelLine.top
    };

    var percent = (coordsClick.x / levelLine.width).toFixed(2);
    effectLevelValue = percent * (currentEffect.max - currentEffect.min) + currentEffect.min + currentEffect.unit;
    applyEffect(effectLevelValue);
  });

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

  inputHashtags.addEventListener('input', function () {
    var hashtagsList = inputHashtags.value.replace(/\s+/g, ' ').toLowerCase().split(' ');
    inputHashtags.setCustomValidity(validateHashtagsList(hashtagsList));
  });
})();
