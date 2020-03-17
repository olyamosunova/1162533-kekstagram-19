'use strict';

(function () {
  var COMMENTS_PART_COUNT = 5;

  var bodyElement = document.querySelector('body');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgBlockElement = bigPictureElement.querySelector('.big-picture__img');
  var bigPictureImgElement = bigPictureImgBlockElement.querySelector('img');
  var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
  var socialCommemtTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
  var socialCommentsElement = bigPictureElement.querySelector('.social__comments');
  var likesCountElement = bigPictureElement.querySelector('.likes-count');
  var commentsCountElement = bigPictureElement.querySelector('.comments-count');
  var socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  var comentShowedCountElement = bigPictureElement.querySelector('.comments-showed-count');
  var comentCountElement = bigPictureElement.querySelector('.comments-count');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var newCommentElement = bigPictureElement.querySelector('.social__footer-text');
  var showedCommentsCount = 0;
  var comments;

  var removeComments = function () {
    var socialCommentsListElements = socialCommentsElement.querySelectorAll('.social__comment');
    for (var i = 0; i < socialCommentsListElements.length; i++) {
      socialCommentsElement.removeChild(socialCommentsListElements[i]);
    }
  };

  var onCommentsLoaderClick = function () {
    var freeCommentsCount = comments.length - showedCommentsCount;
    var fragment = document.createDocumentFragment();
    var newCommentsPartCount = freeCommentsCount < COMMENTS_PART_COUNT ? freeCommentsCount : COMMENTS_PART_COUNT;
    var newPartComment = comments.slice(showedCommentsCount, showedCommentsCount + newCommentsPartCount);

    newPartComment.forEach(function (item) {
      var newComment = renderComments(item);
      fragment.appendChild(newComment);
    });
    socialCommentsElement.appendChild(fragment);

    if (showedCommentsCount === 0) {
      commentsLoaderElement.classList.remove('hidden');
      commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
    }

    showedCommentsCount += newCommentsPartCount;
    comentShowedCountElement.textContent = showedCommentsCount;

    if (showedCommentsCount === comments.length) {
      commentsLoaderElement.classList.add('hidden');
      commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
    }
  };

  var renderComments = function (item) {
    var newSocialCommentElement = socialCommemtTemplate.cloneNode(true);
    newSocialCommentElement.querySelector('.social__picture').src = item.avatar;
    newSocialCommentElement.querySelector('.social__picture').alt = item.name;
    newSocialCommentElement.querySelector('p').textContent = item.message;

    return newSocialCommentElement;
  };

  var closeBigPicture = function () {
    showedCommentsCount = 0;
    commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  };

  bigPictureCloseElement.addEventListener('click', function () {
    closeBigPicture();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  });

  var showPreview = function (picture) {
    removeComments();
    bigPictureElement.classList.remove('hidden');
    newCommentElement.focus();

    bigPictureImgElement.src = picture.url;
    likesCountElement.textContent = picture.likes;
    commentsCountElement.textContent = picture.comments.length;
    socialCaptionElement.textContent = picture.description;

    if (picture.comments.length > 0) {
      commentsLoaderElement.focus();
      comentCountElement.textContent = picture.comments.length;
      comments = picture.comments;
      onCommentsLoaderClick();
    }

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
