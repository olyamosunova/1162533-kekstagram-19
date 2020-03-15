'use strict';

var STEP = 25;
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var DEFAULT_SCALE = 100;

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
  if (value + STEP <= MAX_SCALE) {
    value += STEP;
    applyChanges(value);

  }
});

scaleSmallerElement.addEventListener('click', function () {
  var value = getNumericScaleValue();
  if (value - STEP >= MIN_SCALE) {
    value -= STEP;
    applyChanges(value);
  }
});

var reset = function () {
  setNumericScaleValue(DEFAULT_SCALE);
  scaleImage(DEFAULT_SCALE);
};

window.scale = {
  reset: reset
};
