'use strict';

var COUNT_OBJECTS = 25;

var LIKES_MIN = 15;
var LIKES_MAX = 200 + 1;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6 + 1;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10 + 1;

var commentsTemplate = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Хорошая погодка!', 'У меня все супер! А у вас?', 'Чем занимаетесь в такой прекрасный день?'];
var names = ['Элизабет', 'Реймонд', 'Дембе', 'Гарольд', 'Мистер Каплан', 'Катерина', 'Том', 'Дональд', 'Арам', 'Самар'];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var gerRandomItem = function (dataList) {
  return dataList[Math.floor(Math.random() * dataList.length)];
};

var createData = function () {
  var data = [];
  for (var i = 1; i <= COUNT_OBJECTS; i++) {
    var url = 'photos/' + i + '.jpg';
    var description = gerRandomItem(descriptions);
    var likes = getRndInteger(LIKES_MIN, LIKES_MAX);
    var countComments = getRndInteger(COMMENTS_MIN, COMMENTS_MAX);

    var comments = [];
    for (var k = 0; k < countComments; k++) {
      var comment = {
        avatar: 'img/avatar-' + getRndInteger(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: gerRandomItem(commentsTemplate),
        name: gerRandomItem(names)
      };
      comments.push(comment);
    }

    var users = {
      url: url,
      description: description,
      likes: likes,
      comments: comments
    };
    data.push(users);
  }
  return data;
};

var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');

var createPicture = function (user) {
  var pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = user.url;
  pictureElement.querySelector('.picture__likes').textContent = user.likes;
  pictureElement.querySelector('.picture__comments').textContent = user.comments.length;

  return pictureElement;
};

var renderPicture = function () {
  var fragment = document.createDocumentFragment();
  var dataPicture = createData();
  for (var i = 0; i < dataPicture.length; i++) {
    fragment.appendChild(createPicture(dataPicture[i]));
  }
  pictures.appendChild(fragment);
};

renderPicture();
