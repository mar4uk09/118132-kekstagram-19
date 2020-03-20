'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsContainer = bigPictureElement.querySelector('.social__comments');
  var commentTemplate = commentsContainer.querySelector('.social__comment');
  var socialCommentCountBlock = bigPictureElement.querySelector('.social__comment-count');
  var commentsLoaderBlock = bigPictureElement.querySelector('.comments-loader');
  var pageBody = document.querySelector('body');

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  };

  socialCommentCountBlock.classList.add('hidden');
  commentsLoaderBlock.classList.add('hidden');
  pageBody.classList.add('modal-open');

  renderBigPicture(window.gallery.pictures[0]);

  window.util.cleanContainer(commentsContainer);

  window.util.appendFragment(window.gallery.pictures[0].comments, renderComment, commentsContainer);
})();
