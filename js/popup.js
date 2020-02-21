'use strict';

var ESC_KEY = 'Escape';

var uploadFileElement = document.querySelector('#upload-file');
var uploadOverlayElement = document.querySelector('.img-upload__overlay');
var uploadCancelButton = uploadOverlayElement.querySelector('#upload-cancel');
var hashtagsInput = uploadOverlayElement.querySelector('.text__hashtags');
var pageBody = document.querySelector('body');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && hashtagsInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  pageBody.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  pageBody.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  uploadFileElement.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadFileElement.addEventListener('change', openPopup);

uploadCancelButton.addEventListener('click', closePopup);
