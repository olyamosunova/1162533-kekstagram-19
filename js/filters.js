'use strict';

(function () {
  var COUNT_PICTURES = 10;

  var imgFilterElement = document.querySelector('.img-filters');
  var imgFilterButtonElements = imgFilterElement.querySelectorAll('.img-filters__button');
  var imgFiltersDefaultElement = imgFilterElement.querySelector('#filter-default');
  var imgFiltersRandomElement = imgFilterElement.querySelector('#filter-random');
  var imgFiltersDiscussedElement = imgFilterElement.querySelector('#filter-discussed');

  var removePictures = function () {
    var picturesContainerElement = document.querySelector('.pictures');
    var pictureElements = picturesContainerElement.querySelectorAll('.picture');

    pictureElements.forEach(function (item) {
      picturesContainerElement.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    imgFilterButtonElements.forEach(function (item) {
      if (item.classList.contains('img-filters__button--active')) {
        item.classList.remove('img-filters__button--active');
      }
    });
  };

  var getDefaultPicture = function (data) {
    return data;
  };

  var getRandomPicture = function (data) {
    var randomPictures = [];
    for (var a = 0; a < COUNT_PICTURES; a++) {
      var numberIndex = window.utils.getRandomInteger(1, data.length);

      if (randomPictures.includes(data[numberIndex - 1])) {
        a -= 1;
      } else {
        randomPictures.push(data[numberIndex - 1]);
      }
    }
    return randomPictures;
  };

  var getDiscussedPicture = function (data) {
    var discussedPictures = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return discussedPictures;
  };

  var showDefaultPicture = function (evt) {
    removePictures();
    removeActiveFilter();
    window.debounce(window.pictures.renderPictures(getDefaultPicture(window.pictures.publications)));
    evt.target.classList.add('img-filters__button--active');
  };

  var showRandomPicture = function (evt) {
    removePictures();
    removeActiveFilter();
    window.debounce(window.pictures.renderPictures(getRandomPicture(window.pictures.publications)));
    evt.target.classList.add('img-filters__button--active');
  };

  var showDiscussedPicture = function (evt) {
    removePictures();
    removeActiveFilter();
    window.debounce(window.pictures.renderPictures(getDiscussedPicture(window.pictures.publications)));
    evt.target.classList.add('img-filters__button--active');
  };

  imgFiltersDefaultElement.addEventListener('click', showDefaultPicture);
  imgFiltersRandomElement.addEventListener('click', showRandomPicture);
  imgFiltersDiscussedElement.addEventListener('click', showDiscussedPicture);
})();
