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

var smallPictureElements = document.querySelectorAll('.picture');

var publications = window.data.publications;

var removeComments = function () {
  var socialCommentsListElements = socialCommentsElement.querySelectorAll('.social__comment');
  for (var b = 0; b < socialCommentsListElements.length; b++) {
    socialCommentsElement.removeChild(socialCommentsListElements[b]);
  }
};

var showComments = function (i) {
  var fragment = document.createDocumentFragment();
  for (var a = 0; a < publications[i].comments.length; a++) {
    var newSocialCommentElement = document.createElement('li');
    newSocialCommentElement.className = 'social__comment';
    newSocialCommentElement.innerHTML = '<img class="social__picture" src=' + publications[i].comments[a].avatar + ' "alt="' + publications[i].comments[a].name + '"width="35" height="35"><p class="social__text">' + publications[i].comments[a].message + '</p>';
    fragment.appendChild(newSocialCommentElement);
  }
  removeComments();
  socialCommentsElement.appendChild(fragment);
};


bigPictureCloseElement.addEventListener('click', function () {
  bigPictureElement.classList.add('hidden');
  BODY_ELEMENT.classList.remove('modal-open');
});

var showPreview = function (i) {
  bigPictureElement.classList.remove('hidden');
  bigPictureImgElement.src = publications[i].url;
  likesCountElement.textContent = publications[i].likes;
  commentsCountElement.textContent = publications[i].comments.length;
  socialCaptionElement.textContent = publications[i].description;

  showComments(i);

  socialComentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  BODY_ELEMENT.classList.add('modal-open');
};

var addClickListener = function (element, i) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    showPreview(i);
  });
};

for (var c = 0; c < smallPictureElements.length; c++) {
  var pictureElement = smallPictureElements[c];
  addClickListener(pictureElement, c);
}
