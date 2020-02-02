'use strict';

var PICTURES_QUANTITY = 25;
var MAX_LIKES_COUNT = 200;
var MIN_LIKES_COUNT = 15;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MIN_COMMENTS_NUMBER = 1;
var MAX_COMMENTS_NUMBER = 5;
var MIN_NUMBER_OF_SENTENCES = 1;
var MAX_NUMBER_OF_SENTENCES = 2;
var DESCRIPTION = 'Описание фотографии';
var MESSAGE_VARIANTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES_VARIANTS = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var bigPictureElement = document.querySelector('.big-picture');
var commentsContainer = bigPictureElement.querySelector('.social__comments');
var commentTemplate = commentsContainer.querySelector('.social__comment');
var socialCommentCountBlock = bigPictureElement.querySelector('.social__comment-count');
var commentsLoaderBlock = bigPictureElement.querySelector('.comments-loader');
var pageBody = document.querySelector('body');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateMessage = function (min, max, messageArray) {
  var messageArr = [];
  var numberOfSentences = getRandomInt(min, max);

  for (var i = 0; i < numberOfSentences; i++) {
    messageArr.push(messageArray[getRandomInt(0, messageArray.length - 1)]);
  }

  var messageString = messageArr.join(' ');

  return messageString;
};

var generateComment = function (messageArray, nameArray) {
  var comment = {};

  comment.avatar = 'img/avatar-' + getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  comment.message = generateMessage(MIN_NUMBER_OF_SENTENCES, MAX_NUMBER_OF_SENTENCES, MESSAGE_VARIANTS);
  comment.name = nameArray[getRandomInt(0, nameArray.length - 1)];
  return comment;
};

var generatePictureDescription = function (num) {
  var pictureDescription = {};

  pictureDescription.url = 'photos/' + num + '.jpg';
  pictureDescription.description = DESCRIPTION;
  pictureDescription.likes = getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  pictureDescription.comments = [];

  for (var i = 0; i < getRandomInt(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER); i++) {
    pictureDescription.comments.push(generateComment(MESSAGE_VARIANTS, NAMES_VARIANTS));
  }

  return pictureDescription;
};

var generatePicturesArray = function (number) {
  var array = [];

  for (var i = 0; i < number; i++) {
    array.push(generatePictureDescription(i + 1));
  }

  return array;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var appendFragment = function (array, renderFunction, container) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderFunction(array[i]));
  }

  container.appendChild(fragment);
};

var renderBigPicture = function (picture) {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

var renderComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var cleanContainer = function (container) {
  var children = container.children;

  for (var i = children.length - 1; i >= 0; i--) {
    var child = children[i];

    child.parentElement.removeChild(child);
  }
};

bigPictureElement.classList.remove('hidden');
socialCommentCountBlock.classList.add('hidden');
commentsLoaderBlock.classList.add('hidden');
pageBody.classList.add('modal-open');

var mockPictures = generatePicturesArray(PICTURES_QUANTITY);

appendFragment(mockPictures, renderPicture, picturesContainer);

renderBigPicture(mockPictures[0]);

cleanContainer(commentsContainer);

appendFragment(mockPictures[0].comments, renderComment, commentsContainer);
