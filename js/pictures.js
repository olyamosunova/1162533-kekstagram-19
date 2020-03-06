'use strict';

(function () {
  var picturesContainerElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPictureElement = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var renderPictures = function (data) {
    pictures = data;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = createPictureElement(pictures[i]);

      window.preview.register(pictureElement, pictures[i]);

      fragment.appendChild(pictureElement);
    }
    picturesContainerElement.appendChild(fragment);
  };

  var onDownloadSuccess = function (data) {
    renderPictures(data);
  };

  var onDownloadError = function (errorMessage) {};

  window.pictures = {
    onDownloadSuccess: onDownloadSuccess,
    onDownloadError: onDownloadError
  };
})();
