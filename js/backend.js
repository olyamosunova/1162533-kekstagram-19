'use strict';

(function () {
  var HTTP_SUCCESS_CODE = 200;
  var TIMEOUT_IM_MS = 10000;
  var RESPONSE_TYPE = 'json';

  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram'
  };

  var RequesMethod = {
    GET: 'GET',
    POST: 'POST'
  };

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
    xhr.responseType = RESPONSE_TYPE;

    registerCallbacks(xhr, onSuccess, onError);

    xhr.timeout = TIMEOUT_IM_MS;
    xhr.open(RequesMethod.GET, Url.GET);
    xhr.send();
  };

  var send = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    registerCallbacks(xhr, onSuccess, onError);

    xhr.timeout = TIMEOUT_IM_MS;
    xhr.open(RequesMethod.POST, Url.POST);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    send: send
  };
})();
