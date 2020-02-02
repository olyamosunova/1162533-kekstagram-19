'use strict';

var COUNT_PICTURES = 25;

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;

var BODY = document.querySelector('body');

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Хорошая погодка!', 'У меня все супер! А у вас?', 'Чем занимаетесь в такой прекрасный день?'];
var names = ['Элизабет', 'Реймонд', 'Дембе', 'Гарольд', 'Мистер Каплан', 'Катерина', 'Том', 'Дональд', 'Арам', 'Самар'];

var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImgBlock = bigPicture.querySelector('.big-picture__img');
var bigPictureImg = bigPictureImgBlock.querySelector('img');
var socialCaption = bigPicture.querySelector('.social__caption');
var likesCount = bigPicture.querySelector('.likes-count');
var commentsCount = bigPicture.querySelector('.comments-count');
var socialComments = bigPicture.querySelector('.social__comments');
var socialCommentsList = socialComments.querySelectorAll('.social__comment');
var socialComentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (dataList) {
  return dataList[Math.floor(Math.random() * dataList.length)];
};

var createPublications = function () {
  var publications = [];
  for (var i = 1; i <= COUNT_PICTURES; i++) {

    var generateComments = function () {
      var comments = [];
      var countComments = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
      for (var j = 0; j < countComments; j++) {
        var comment = {
          avatar: 'img/avatar-' + getRandomInteger(AVATAR_MIN, AVATAR_MAX) + '.svg',
          message: getRandomItem(messages),
          name: getRandomItem(names)
        };
        comments.push(comment);
      }
      return comments;
    };

    var publication = {
      url: 'photos/' + i + '.jpg',
      description: getRandomItem(descriptions),
      likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
      comments: generateComments()
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
  for (var i = 0; i < publications.length; i++) {
    fragment.appendChild(createPictureElement(publications[i]));
  }
  pictures.appendChild(fragment);
};

var showComments = function () {
  var fragment = document.createDocumentFragment();
  for (var a = 0; a < publications[0].comments.length; a++) {
    var newSocialComment = document.createElement('li');
    newSocialComment.className = 'social__comment';
    newSocialComment.innerHTML = '<img class="social__picture" src=' + publications[0].comments[a].avatar + ' "alt="' + publications[0].comments[a].name + '"width="35" height="35"><p class="social__text">' + publications[0].comments[a].message + '</p>';
    fragment.appendChild(newSocialComment);
  }
  for (var b = 0; b < socialCommentsList.length; b++) {
    socialComments.removeChild(socialCommentsList[b]);
  }
  socialComments.appendChild(fragment);
};

var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = publications[0].url;
  likesCount.textContent = publications[0].likes;
  commentsCount.textContent = publications[0].comments.length;
  socialCaption.textContent = publications[0].description;

  showComments();

  socialComentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  BODY.classList.add('modal-open');
};

var publications = createPublications();
renderPictures();
showBigPicture();
