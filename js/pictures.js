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

  var filtersPicture = function (publications) {
    var imgFilterElement = document.querySelector('.img-filters');
    var imgFilterButtonElements = imgFilterElement.querySelectorAll('.img-filters__button');
    var imgFiltersDefaultElement = imgFilterElement.querySelector('#filter-default');
    var imgFiltersRandomElement = imgFilterElement.querySelector('#filter-random');
    var imgFiltersDiscussedElement = imgFilterElement.querySelector('#filter-discussed');

    imgFilterElement.classList.remove('img-filters--inactive');

    for (var b = 0; b < imgFilterButtonElements.length; b++) {
      imgFilterButtonElements[b].addEventListener('click', function (evt) {

        imgFilterButtonElements.forEach(function (item) {
          if (item.classList.contains('img-filters__button--active')) {
            item.classList.remove('img-filters__button--active');
          }
        });

        switch (evt.target) {
          case imgFiltersDefaultElement:
            imgFiltersDefaultElement.classList.add('img-filters__button--active');
            window.filters.getDefaultPicture(publications);
            break;
          case imgFiltersRandomElement:
            imgFiltersRandomElement.classList.add('img-filters__button--active');
            window.filters.getRandomPicture(publications);
            break;
          case imgFiltersDiscussedElement:
            imgFiltersDiscussedElement.classList.add('img-filters__button--active');
            window.filters.getDiscussedPicture(publications);
            break;
          default:
            break;
        }
      });
    }
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
    filtersPicture(pictures);
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
