'use strict';

var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');

var createPictureElement = function (user) {
  var pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = user.url;
  pictureElement.querySelector('.picture__likes').textContent = user.likes;
  pictureElement.querySelector('.picture__comments').textContent = user.comments.length;

  return pictureElement;
};

var succesHandler = function (images) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < images.length; i++) {
    fragment.appendChild(createPictureElement(images[i]));
  }
  pictures.appendChild(fragment);
};

window.load(succesHandler);
