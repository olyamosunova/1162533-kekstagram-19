'use strict';

var effectRadiosElements = document.querySelectorAll('.effects__radio');
var effectLevelElement = document.querySelector('.effect-level');
var effectLevelLineElement = effectLevelElement.querySelector('.effect-level__line');
var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value').value;
var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
var imageElement = imgUploadPreviewElement.querySelector('img');

var showSlider = function () {
  effectLevelElement.classList.remove('hidden');
};

var hideSlider = function () {
  effectLevelElement.classList.add('hidden');
};

window.effect = function () {
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

  imageElement.classList = 'img-upload__preview';
  imageElement.style.filter = '';
  hideSlider();

  var applyEffect = function (level) {
    imageElement.style.filter = currentEffect.getIntensity(level);
  };

  for (var i = 0; i < effectRadiosElements.length; i++) {
    effectRadiosElements[i].addEventListener('change', function (evt) {
      if (currentEffect) {
        imageElement.classList.remove(currentEffect.className);
      }

      currentEffect = effecstList[evt.target.value];

      if (currentEffect) {
        imageElement.classList.add(currentEffect.className);
        showSlider();
      } else {
        hideSlider();
      }

      imageElement.style.filter = '';
    });
  }

  effectLevelLineElement.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var levelLine = effectLevelLineElement.getBoundingClientRect();

    var coordsClick = {
      x: evt.clientX - levelLine.left,
      y: evt.clientY - levelLine.top
    };

    var percent = (coordsClick.x / levelLine.width).toFixed(2);
    effectLevelValueElement = percent * (currentEffect.max - currentEffect.min) + currentEffect.min + currentEffect.unit;
    applyEffect(effectLevelValueElement);
  });
};
