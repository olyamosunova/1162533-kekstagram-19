'use strict';

var STEP = 0.25;
var MAX_SCALE = 1;
var MIN_SCALE = 0.25;

var scaleBiggerElement = document.querySelector('.scale__control--bigger');
var scaleSmallerElement = document.querySelector('.scale__control--smaller');
var scaleValueElement = document.querySelector('.scale__control--value');
var imgPreviewElement = document.querySelector('.img-upload__preview');
var imageElement = imgPreviewElement.querySelector('img');
var currentScale;

scaleBiggerElement.addEventListener('click', function () {
  currentScale = Number(scaleValueElement.value.substr(0, scaleValueElement.value.length - 1)) / 100;
  if (currentScale + STEP <= MAX_SCALE) {
    currentScale += STEP;
    scaleValueElement.value = currentScale * 100 + '%';
  }
  imageElement.style.transform = 'scale(' + currentScale + ')';
});

scaleSmallerElement.addEventListener('click', function () {
  currentScale = Number(scaleValueElement.value.substr(0, scaleValueElement.value.length - 1)) / 100;
  if (currentScale - STEP >= MIN_SCALE) {
    currentScale -= STEP;
    scaleValueElement.value = currentScale * 100 + '%';
  }
  imageElement.style.transform = 'scale(' + currentScale + ')';
});

var applyDefaultScale = function () {
  scaleValueElement.value = '100%';
  imageElement.style.transform = 'scale(1)';
};

window.scale = {
  applyDefaultScale: applyDefaultScale
};
