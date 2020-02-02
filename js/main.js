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
  pictureDescription.description = '';
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

var fragment = document.createDocumentFragment();
var mockPictures = generatePicturesArray(PICTURES_QUANTITY);

for (var i = 0; i < mockPictures.length; i++) {
  fragment.appendChild(renderPicture(mockPictures[i]));
}

picturesContainer.appendChild(fragment);
