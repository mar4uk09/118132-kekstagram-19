'use strict';

(function () {
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

  var generateMessage = function (min, max, messageArray) {
    var messageArr = [];
    var numberOfSentences = window.util.getRandomInt(min, max);

    for (var i = 0; i < numberOfSentences; i++) {
      messageArr.push(messageArray[window.util.getRandomInt(0, messageArray.length - 1)]);
    }

    var messageString = messageArr.join(' ');

    return messageString;
  };

  var generateComment = function (messageArray, nameArray) {
    var comment = {};

    comment.avatar = 'img/avatar-' + window.util.getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
    comment.message = generateMessage(MIN_NUMBER_OF_SENTENCES, MAX_NUMBER_OF_SENTENCES, MESSAGE_VARIANTS);
    comment.name = nameArray[window.util.getRandomInt(0, nameArray.length - 1)];
    return comment;
  };

  var generatePictureDescription = function (num) {
    var pictureDescription = {};

    pictureDescription.url = 'photos/' + num + '.jpg';
    pictureDescription.description = DESCRIPTION;
    pictureDescription.likes = window.util.getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
    pictureDescription.comments = [];

    for (var i = 0; i < window.util.getRandomInt(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER); i++) {
      pictureDescription.comments.push(generateComment(MESSAGE_VARIANTS, NAMES_VARIANTS));
    }

    return pictureDescription;
  };

  window.data = {
    generate: generatePictureDescription
  };
})();
