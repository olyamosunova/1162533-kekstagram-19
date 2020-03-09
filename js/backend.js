'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var HTTP_SUCCESS_CODE = 200;
  var TIMEOUT_IM_MS = 10000;

  var registerCallbacks = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('При загрузке данных произошла ошибка ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    registerCallbacks(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IM_MS;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    download: download
  };
})();
