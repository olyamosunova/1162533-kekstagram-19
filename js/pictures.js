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

  var renderPublications = function (data) {
    var pictures = data;
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (item) {
      var pictureElement = createPictureElement(item);
      window.preview.register(pictureElement, item);
      fragment.appendChild(pictureElement);
    });

    picturesContainerElement.appendChild(fragment);
  };

  var onDownloadSuccess = function (data) {
    window.pictures.publications = data.slice();
    renderPublications(data);
    imgFilterElement.classList.remove('img-filters--inactive');
  };

  var onDownloadError = function (errorMessage) {
    window.notification.showErrorPopup(errorMessage, 'УПС');
  };

  window.pictures = {
    publications: [],
    renderPublications: renderPublications,
    onDownloadSuccess: onDownloadSuccess,
    onDownloadError: onDownloadError
  };
})();
