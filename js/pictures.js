'use strict';

(function () {
  var picturesContainerElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var imgFilterElement = document.querySelector('.img-filters');

  var createPictureElement = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var renderPictures = function (data) {
    var pictures = data;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = createPictureElement(pictures[i]);

      window.preview.register(pictureElement, pictures[i]);

      fragment.appendChild(pictureElement);
    }
    picturesContainerElement.appendChild(fragment);
  };

  var onDownloadSuccess = function (data) {
    window.pictures.publications = data.slice();
    renderPictures(data);
    imgFilterElement.classList.remove('img-filters--inactive');
  };

  var onDownloadError = function (errorMessage) {};

  window.pictures = {
    publications: [],
    renderPictures: renderPictures,
    onDownloadSuccess: onDownloadSuccess,
    onDownloadError: onDownloadError
  };
})();
