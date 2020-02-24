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

(function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.publications.length; i++) {
    fragment.appendChild(createPictureElement(window.data.publications[i]));
  }
  pictures.appendChild(fragment);
})();
