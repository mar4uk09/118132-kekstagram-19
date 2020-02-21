'use strict';

var SCALE_MIN = 25;
var SCALE_MAX = 100;
var SCALE_DIFFERENCE = 25;

var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var controlValue = document.querySelector('.scale__control--value');
var imgPreview = document.querySelector('.img-upload__preview img');

var getIntFromArray = function (array) {
  return parseInt(array.match(/\d+/), 10);
};

var reduceValue = function () {
  var valueInt = getIntFromArray(controlValue.value);

  if (valueInt >= SCALE_MIN + SCALE_DIFFERENCE) {
    valueInt -= SCALE_DIFFERENCE;
    controlValue.value = valueInt + '%';
  }

  imgPreview.style.transform = 'scale(' + valueInt / 100 + ')';
};

var raiseValue = function () {
  var valueInt = getIntFromArray(controlValue.value);

  if (valueInt <= SCALE_MAX - SCALE_DIFFERENCE) {
    valueInt += SCALE_DIFFERENCE;
    controlValue.value = valueInt + '%';
  }

  imgPreview.style.transform = 'scale(' + valueInt / 100 + ')';
};

controlSmaller.addEventListener('click', reduceValue);
controlBigger.addEventListener('click', raiseValue);
