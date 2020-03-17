'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';
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
    xhr.responseType = 'json';

    registerCallbacks(xhr, onSuccess, onError);

    xhr.timeout = TIMEOUT_IM_MS;
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  var send = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    registerCallbacks(xhr, onSuccess, onError);

    xhr.timeout = TIMEOUT_IM_MS;
    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    send: send
  };
})();
