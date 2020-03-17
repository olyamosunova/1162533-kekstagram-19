'use strict';

(function () {
  var COUNT_PICTURES = 10;

  var imgFilterElement = document.querySelector('.img-filters');
  var imgFilterButtonElements = imgFilterElement.querySelectorAll('.img-filters__button');
  var imgFilterDefaultElement = imgFilterElement.querySelector('#filter-default');
  var imgFilterRandomElement = imgFilterElement.querySelector('#filter-random');
  var imgFilterDiscussedElement = imgFilterElement.querySelector('#filter-discussed');

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
    for (var i = 0; i < COUNT_PICTURES; i++) {
      var numberIndex = window.utils.getRandomInteger(1, data.length);

      if (randomPictures.includes(data[numberIndex - 1])) {
        i -= 1;
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

  var onFilterDefaultClick = function (evt) {
    removePictures();
    removeActiveFilter();
    window.utils.debounce(window.pictures.renderPublications(getDefaultPicture(window.pictures.publications)));
    evt.target.classList.add('img-filters__button--active');
  };

  var onFilterRandomClick = function (evt) {
    removePictures();
    removeActiveFilter();
    window.utils.debounce(window.pictures.renderPublications(getRandomPicture(window.pictures.publications)));
    evt.target.classList.add('img-filters__button--active');
  };

  var onFilterDiscussedClick = function (evt) {
    removePictures();
    removeActiveFilter();
    window.utils.debounce(window.pictures.renderPublications(getDiscussedPicture(window.pictures.publications)));
    evt.target.classList.add('img-filters__button--active');
  };

  imgFilterDefaultElement.addEventListener('click', onFilterDefaultClick);
  imgFilterRandomElement.addEventListener('click', onFilterRandomClick);
  imgFilterDiscussedElement.addEventListener('click', onFilterDiscussedClick);
})();
