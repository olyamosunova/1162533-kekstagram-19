'use strict';

(function () {
  var ScaleValue = {
    STEP: 25,
    MAX_VALUE: 100,
    MIN_VALUE: 25,
    DEFAULT_VALUE: 100
  };

  var scaleBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleValueElement = document.querySelector('.scale__control--value');
  var imgPreviewElement = document.querySelector('.img-upload__preview');

  var getNumericScaleValue = function () {
    return parseInt(scaleValueElement.value, 10);
  };

  var setNumericScaleValue = function (value) {
    scaleValueElement.value = value + '%';
  };

  var scaleImage = function (value) {
    imgPreviewElement.style.transform = 'scale(' + value / 100 + ')';
  };

  var applyChanges = function (value) {
    setNumericScaleValue(value);
    scaleImage(value);
  };

  scaleBiggerElement.addEventListener('click', function () {
    var value = getNumericScaleValue();
    if (value + ScaleValue.STEP <= ScaleValue.MAX_VALUE) {
      value += ScaleValue.STEP;
      applyChanges(value);

    }
  });

  scaleSmallerElement.addEventListener('click', function () {
    var value = getNumericScaleValue();
    if (value - ScaleValue.STEP >= ScaleValue.MIN_VALUE) {
      value -= ScaleValue.STEP;
      applyChanges(value);
    }
  });

  var reset = function () {
    setNumericScaleValue(ScaleValue.DEFAULT_VALUE);
    scaleImage(ScaleValue.DEFAULT_VALUE);
  };

  window.scale = {
    reset: reset
  };

})();
