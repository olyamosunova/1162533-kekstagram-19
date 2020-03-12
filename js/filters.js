'use strict';

(function () {
  var COUNT_PICTURES = 10;

  var getDefaultPicture = function (data) {
    // return data;
    console.log(data);
  };

  var getRandomPicture = function (data) {
    var randomPictures = [];
    for (var a = 0; a < COUNT_PICTURES; a++) {
      var numberIndex = window.utils.getRandomInteger(1, data.length);
      randomPictures.push(data[numberIndex - 1]);
    }
    // return randomPictures;
    console.log(randomPictures);
  };

  var getDiscussedPicture = function (data) {
    var discussedPictures = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    // return discussedPictures;
    console.log(discussedPictures);
  };

  window.filters = {
    getDefaultPicture: getDefaultPicture,
    getDiscussedPicture: getDiscussedPicture,
    getRandomPicture: getRandomPicture
  };
})();
