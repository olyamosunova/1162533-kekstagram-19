'use strict';

var STEP = 25;
var MAX_SCALE = 100;
var MIN_SCALE = 25;

var scaleBiggerElement = document.querySelector('.scale__control--bigger');
var scaleSmallerElement = document.querySelector('.scale__control--smaller');
var scaleValueElement = document.querySelector('.scale__control--value');
var imgPreviewElement = document.querySelector('.img-upload__preview');
var imageElement = imgPreviewElement.querySelector('img');
var currentScale;

scaleBiggerElement.addEventListener('click', function () {
  currentScale = Number(scaleValueElement.value.substr(0, scaleValueElement.value.length - 1));
  if (currentScale + STEP <= MAX_SCALE) {
    currentScale += STEP;
    scaleValueElement.value = currentScale + '%';
  }
  imageElement.style.transform = 'scale(' + currentScale / 100 + ')';
});

scaleSmallerElement.addEventListener('click', function () {
  currentScale = Number(scaleValueElement.value.substr(0, scaleValueElement.value.length - 1));
  if (currentScale - STEP >= MIN_SCALE) {
    currentScale -= STEP;
    scaleValueElement.value = currentScale + '%';
  }
  imageElement.style.transform = 'scale(' + currentScale / 100 + ')';
});

var applyDefaultSize = function () {
  scaleValueElement.value = '100%';
  imageElement.style.transform = 'scale(1)';
};

window.scale = {
  applyDefaultSize: applyDefaultSize
};
