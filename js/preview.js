'use strict';

(function () {
  var bodyElement = document.querySelector('body');

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

  var removeComments = function () {
    var socialCommentsListElements = socialCommentsElement.querySelectorAll('.social__comment');
    for (var b = 0; b < socialCommentsListElements.length; b++) {
      socialCommentsElement.removeChild(socialCommentsListElements[b]);
    }
  };

  var showComments = function (picture) {
    var fragment = document.createDocumentFragment();

    picture.comments.forEach(function (item) {
      var newSocialCommentElement = document.createElement('li');
      newSocialCommentElement.className = 'social__comment';
      newSocialCommentElement.innerHTML = '<img class="social__picture" src=' + item.avatar + ' "alt="' + item.name + '"width="35" height="35"><p class="social__text">' + item.message + '</p>';
      fragment.appendChild(newSocialCommentElement);
    });

    removeComments();
    socialCommentsElement.appendChild(fragment);
  };

  bigPictureCloseElement.addEventListener('click', function () {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  });

  var showPreview = function (picture) {
    bigPictureElement.classList.remove('hidden');
    bigPictureImgElement.src = picture.url;
    likesCountElement.textContent = picture.likes;
    commentsCountElement.textContent = picture.comments.length;
    socialCaptionElement.textContent = picture.description;

    showComments(picture);

    socialComentCountElement.classList.add('hidden');
    commentsLoaderElement.classList.add('hidden');
    bodyElement.classList.add('modal-open');
  };

  var register = function (element, picture) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      showPreview(picture);
    });
  };

  window.preview = {
    register: register
  };
})();
