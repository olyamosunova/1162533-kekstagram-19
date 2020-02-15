'use strict';

var COUNT_PICTURES = 25;

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;

var BODY = document.querySelector('body');

var ESC_KEYCODE = 27;

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Хорошая погодка!', 'У меня все супер! А у вас?', 'Чем занимаетесь в такой прекрасный день?'];
var names = ['Элизабет', 'Реймонд', 'Дембе', 'Гарольд', 'Мистер Каплан', 'Катерина', 'Том', 'Дональд', 'Арам', 'Самар'];

var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var bigPictureImgBlock = bigPicture.querySelector('.big-picture__img');
var bigPictureImg = bigPictureImgBlock.querySelector('img');
var socialCaption = bigPicture.querySelector('.social__caption');
var likesCount = bigPicture.querySelector('.likes-count');
var commentsCount = bigPicture.querySelector('.comments-count');
var socialComments = bigPicture.querySelector('.social__comments');
var socialComentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadClose = imgUploadOverlay.querySelector('.img-upload__cancel');
var effectLevel = imgUploadOverlay.querySelector('.effect-level');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelValue = effectLevel.querySelector('.effect-level__value').value;
var effectRadios = imgUploadOverlay.querySelectorAll('.effects__radio');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var image = imgUploadPreview.querySelector('img');

var inputHashtags = imgUploadOverlay.querySelector('.text__hashtags');
var submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
var currentEffect;


var effecstList = {
  chrome: {
    className: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    unit: '',
    getIntensity: function (percent) {
      return ('grayscale(' + percent + ')');
    }
  },
  sepia: {
    className: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    unit: '',
    getIntensity: function (percent) {
      return ('sepia(' + percent + ')');
    }
  },
  marvin: {
    className: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    unit: '%',
    getIntensity: function (percent) {
      return ('invert(' + percent + ')');
    }
  },
  phobos: {
    className: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    unit: 'px',
    getIntensity: function (percent) {
      return ('blur(' + percent + ')');
    }
  },
  heat: {
    className: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    unit: '',
    getIntensity: function (percent) {
      return ('brightness(' + percent + ')');
    }
  }
};

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

var removeComments = function () {
  var socialCommentsList = socialComments.querySelectorAll('.social__comment');
  for (var b = 0; b < socialCommentsList.length; b++) {
    socialComments.removeChild(socialCommentsList[b]);
  }
};

var showComments = function () {
  var fragment = document.createDocumentFragment();
  for (var a = 0; a < publications[0].comments.length; a++) {
    var newSocialComment = document.createElement('li');
    newSocialComment.className = 'social__comment';
    newSocialComment.innerHTML = '<img class="social__picture" src=' + publications[0].comments[a].avatar + ' "alt="' + publications[0].comments[a].name + '"width="35" height="35"><p class="social__text">' + publications[0].comments[a].message + '</p>';
    fragment.appendChild(newSocialComment);
  }
  removeComments();
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

var sliderShowOrHidden = function (elem) {
  return elem.value !== 'none' ? effectLevel.classList.remove('hidden') : effectLevel.classList.add('hidden');
};

var applyEffect = function (effect, level) {
  image.style.filter = effect.getIntensity(level);
};

bigPictureClose.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
  BODY.classList.remove('modal-open');
});

uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  BODY.classList.add('modal-open');

  image.classList = 'img-upload__preview';
  image.removeAttribute('style');
  effectLevel.classList.add('hidden');
});

imgUploadClose.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  BODY.classList.remove('modal-open');
});

document.addEventListener('keydown', function (evt) {
  if ((evt.target !== inputHashtags) && (evt.keyCode === ESC_KEYCODE)) {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    BODY.classList.remove('modal-open');
  }
});

for (var i = 0; i < effectRadios.length; i++) {
  effectRadios[i].addEventListener('change', function (evt) {
    if (currentEffect) {
      image.classList.remove(currentEffect.className);
    }

    currentEffect = effecstList[evt.target.value];

    if (currentEffect) {
      image.classList.add(currentEffect.className);
    }
    image.removeAttribute('style');
    sliderShowOrHidden(evt.target);
  });
}

effectLevelLine.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  var levelLine = effectLevelLine.getBoundingClientRect();

  var coordsClick = {
    x: evt.clientX - levelLine.left,
    y: evt.clientY - levelLine.top
  };

  var percent = (coordsClick.x / levelLine.width).toFixed(2);
  effectLevelValue = percent * (currentEffect.max - currentEffect.min) + currentEffect.min + currentEffect.unit;
  applyEffect(currentEffect, effectLevelValue);
});

var isHashtagDoubled = function (hashtags) {
  var uniquHashtags = [];
  for (var tag = 0; tag < hashtags.length; tag++) {
    if (uniquHashtags.includes(hashtags[tag])) {
      return true;
    }
    uniquHashtags.push(hashtags[tag]);
  }
  return false;
};

var validateHashtag = function (hashtag, hashtags) {
  var hashtagValue = hashtag.substr(1, hashtag.length - 1);
  if (hashtag.charAt(0) !== '#') {
    inputHashtags.setCustomValidity('Хэштег должен начинаться со знака решетки');
    return false;
  } else if (!(/^[а-яА-ЯёЁa-zA-Z0-9#]+$/.test(hashtagValue))) {
    inputHashtags.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д');
    return false;
  } else if (hashtag.length < 2) {
    inputHashtags.setCustomValidity('Хэштег не может состоять только из решетки');
    return false;
  } else if (hashtag.length > 20) {
    inputHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
    return false;
  } else if (hashtag.indexOf('#', 1) > 0) {
    inputHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
    return false;
  } else if (isHashtagDoubled(hashtags)) {
    inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    return false;
  }
  return true;
};

var validateHashtagsList = function (hashtags) {
  if (hashtags.length > 5) {
    inputHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }
};

submitButton.addEventListener('click', function () {
  var hashtagsList = inputHashtags.value.replace(/\s+/g, ' ').toLowerCase().split(' ');
  for (var a = 0; a < hashtagsList.length; a++) {
    var isHashtagValid = validateHashtag(hashtagsList[a], hashtagsList);
    if (!isHashtagValid) {
      break;
    }
  }
  validateHashtagsList(hashtagsList);
});

inputHashtags.addEventListener('input', function () {
  inputHashtags.setCustomValidity('');
});

var publications = createPublications();
renderPictures();
showBigPicture();

bigPicture.classList.add('hidden');
