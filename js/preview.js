'use strict';

(function () {
  var BODY = document.querySelector('body');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImgBlock = bigPicture.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureImgBlock.querySelector('img');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var socialComments = bigPicture.querySelector('.social__comments');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var socialComentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var publications = window.data.publications;

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


  bigPictureClose.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    BODY.classList.remove('modal-open');
  });

  (function () {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = publications[0].url;
    likesCount.textContent = publications[0].likes;
    commentsCount.textContent = publications[0].comments.length;
    socialCaption.textContent = publications[0].description;

    showComments();

    socialComentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    BODY.classList.add('modal-open');
  })();
})();
