'use strict';

var BODY_ELEMENT = document.querySelector('body');

var bigPictureElement = document.querySelector('.big-picture');
var bigPictureImgBlockElement = bigPictureElement.querySelector('.big-picture__img');
var bigPictureImgElement = bigPictureImgBlockElement.querySelector('img');
var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
var socialCommentsElement = bigPictureElement.querySelector('.social__comments');
var likesCountElement = bigPictureElement.querySelector('.likes-count');
var commentsCountElement = bigPictureElement.querySelector('.comments-count');
var socialCaptionElement = bigPictureElement.querySelector('.social__caption');
var socialComentCountElement = bigPictureElement.querySelector('.social__comment-count');
var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

var publications = window.data.publications;

var removeComments = function () {
  var socialCommentsListElements = socialCommentsElement.querySelectorAll('.social__comment');
  for (var b = 0; b < socialCommentsListElements.length; b++) {
    socialCommentsElement.removeChild(socialCommentsListElements[b]);
  }
};

var showComments = function () {
  var fragment = document.createDocumentFragment();
  for (var a = 0; a < publications[0].comments.length; a++) {
    var newSocialCommentElement = document.createElement('li');
    newSocialCommentElement.className = 'social__comment';
    newSocialCommentElement.innerHTML = '<img class="social__picture" src=' + publications[0].comments[a].avatar + ' "alt="' + publications[0].comments[a].name + '"width="35" height="35"><p class="social__text">' + publications[0].comments[a].message + '</p>';
    fragment.appendChild(newSocialCommentElement);
  }
  removeComments();
  socialCommentsElement.appendChild(fragment);
};


bigPictureCloseElement.addEventListener('click', function () {
  bigPictureElement.classList.add('hidden');
  BODY_ELEMENT.classList.remove('modal-open');
});

(function () {
  bigPictureElement.classList.remove('hidden');
  bigPictureImgElement.src = publications[0].url;
  likesCountElement.textContent = publications[0].likes;
  commentsCountElement.textContent = publications[0].comments.length;
  socialCaptionElement.textContent = publications[0].description;

  showComments();

  socialComentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  BODY_ELEMENT.classList.add('modal-open');
})();
