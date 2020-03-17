'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var lastTimeout = 0;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (dataList) {
    return dataList[Math.floor(Math.random() * dataList.length)];
  };

  window.utils = {
    ESC_KEYCODE: KeyCode.ESC,
    ENTER_KEYCODE: KeyCode.ENTER,
    debounce: debounce,
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem
  };
})();
