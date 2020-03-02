'use strict';

(function () {
  var picturesContainerElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPictureElement = function (user) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = user.url;
    pictureElement.querySelector('.picture__likes').textContent = user.likes;
    pictureElement.querySelector('.picture__comments').textContent = user.comments.length;

    return pictureElement;
  };

  var renderPictureElement = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createPictureElement(data[i]));
    }
    picturesContainerElement.appendChild(fragment);
  };

  var onDownloadSuccess = function (data) {
    renderPictureElement(data);
  };

  var onDownloadError = function (errorMessage) {};

  window.pictures = {
    onDownloadSuccess: onDownloadSuccess,
    onDownloadError: onDownloadError
  };
})();
