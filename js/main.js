'use strict';

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

var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (dataList) {
  return dataList[Math.floor(Math.random() * dataList.length)];
};

var createPublications = function () {
  var publications = [];
  for (var i = 1; i <= COUNT_PICTURES; i++) {
    var countComments = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
    var comments = [];
    for (var k = 0; k < countComments; k++) {
      var comment = {
        avatar: 'img/avatar-' + getRandomInteger(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: getRandomItem(messages),
        name: getRandomItem(names)
      };
      comments.push(comment);
    }

    var publication = {
      url: 'photos/' + i + '.jpg',
      description: getRandomItem(descriptions),
      likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
      comments: comments
    };
    publications.push(publication);
  }
  return publications;
};

var createPictureElement = function (user) {
  var pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = user.url;
  pictureElement.querySelector('.picture__likes').textContent = user.likes;
  pictureElement.querySelector('.picture__comments').textContent = user.comments.length;

  return pictureElement;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  var dataPicture = createPublications();
  for (var i = 0; i < dataPicture.length; i++) {
    fragment.appendChild(createPictureElement(dataPicture[i]));
  }
  pictures.appendChild(fragment);
};

renderPictures();
