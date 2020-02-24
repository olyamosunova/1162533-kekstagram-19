'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;

  return {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomItem: function (dataList) {
      return dataList[Math.floor(Math.random() * dataList.length)];
    }

  };
})();
