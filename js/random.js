'use strict';

window.random = (function () {
  return {
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomItem: function (dataList) {
      return dataList[Math.floor(Math.random() * dataList.length)];
    }
  };
})();
