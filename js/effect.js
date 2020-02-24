'use strict';

var effectRadiosElements = document.querySelectorAll('.effects__radio');
var effectLevelElement = document.querySelector('.effect-level');
var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value').value;
var effectLevelPinElement = effectLevelElement.querySelector('.effect-level__pin');
var effectLevelDepthElement = effectLevelElement.querySelector('.effect-level__depth');
var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
var imageElement = imgUploadPreviewElement.querySelector('img');

var showSlider = function () {
  effectLevelElement.classList.remove('hidden');
};

var hideSlider = function () {
  effectLevelElement.classList.add('hidden');
};

var currentEffect;
var effectLevelPinPosition;

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

var pinCoordsX = {
  MIN: 0,
  MAX: 453
};

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
    effectLevelPinElement.style.left = pinCoordsX.MAX + 'px';
    effectLevelDepthElement.style.width = pinCoordsX.MAX + 'px';
  });
}

effectLevelPinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;

    startCoords = moveEvt.clientX;

    effectLevelPinPosition = effectLevelPinElement.offsetLeft - shift;

    if (effectLevelPinPosition <= pinCoordsX.MIN) {
      effectLevelPinPosition = pinCoordsX.MIN;
    } else if (effectLevelPinPosition > pinCoordsX.MAX) {
      effectLevelPinPosition = pinCoordsX.MAX;
    }

    effectLevelPinElement.style.left = effectLevelPinPosition + 'px';
    effectLevelDepthElement.style.width = effectLevelPinPosition + 'px';

    var percent = (effectLevelPinPosition / pinCoordsX.MAX).toFixed(2);

    effectLevelValueElement = percent * (currentEffect.max - currentEffect.min) + currentEffect.min + currentEffect.unit;
    applyEffect(effectLevelValueElement);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var applyDefaultEffect = function () {

  if (currentEffect) {
    imageElement.classList.remove(currentEffect.className);
  }
  imageElement.style.filter = '';
  effectLevelPinElement.style.left = pinCoordsX.MAX + 'px';
  effectLevelDepthElement.style.width = pinCoordsX.MAX + 'px';
  hideSlider();
};

window.effect = {
  applyDefaultEffect: applyDefaultEffect
};
