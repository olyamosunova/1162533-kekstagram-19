'use strict';

/*window.data = (function () {
  var COUNT_PICTURES = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var COMMENTS_MIN = 0;
  var COMMENTS_MAX = 10;

  var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var descriptions = ['Хорошая погодка!', 'У меня все супер! А у вас?', 'Чем занимаетесь в такой прекрасный день?'];
  var names = ['Элизабет', 'Реймонд', 'Дембе', 'Гарольд', 'Мистер Каплан', 'Катерина', 'Том', 'Дональд', 'Арам', 'Самар'];

  var createPublications = function () {
    var publications = [];
    for (var i = 1; i <= COUNT_PICTURES; i++) {

      var generateComments = function () {
        var comments = [];
        var countComments = window.utils.getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
        for (var j = 0; j < countComments; j++) {
          var comment = {
            avatar: 'img/avatar-' + window.utils.getRandomInteger(AVATAR_MIN, AVATAR_MAX) + '.svg',
            message: window.utils.getRandomItem(messages),
            name: window.utils.getRandomItem(names)
          };
          comments.push(comment);
        }
        return comments;
      };

      var publication = {
        url: 'photos/' + i + '.jpg',
        description: window.utils.getRandomItem(descriptions),
        likes: window.utils.getRandomInteger(LIKES_MIN, LIKES_MAX),
        comments: generateComments()
      };
      publications.push(publication);
    }
    return publications;
  };

  return {
    publications: createPublications()
  };
})();*/

var URL = 'https://js.dump.academy/kekstagram/data';
window.data = function  () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL, false);
    xhr.send();

    var data = JSON.parse(xhr.responseText);
    return data;
};
