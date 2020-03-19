'use strict';

var ESC_KEY = 'Escape';

var uploadFileElement = document.querySelector('#upload-file');
var uploadOverlayElement = document.querySelector('.img-upload__overlay');
var uploadCancelButton = uploadOverlayElement.querySelector('#upload-cancel');
var hashtagsInput = uploadOverlayElement.querySelector('.text__hashtags');
var textarea = uploadOverlayElement.querySelector('.text__description');
var pageBody = document.querySelector('body');
var imgPreview = document.querySelector('.img-upload__preview img');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && hashtagsInput !== document.activeElement && textarea !== document.activeElement) {
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
  imgPreview.style.transform = 'scale(1.0)';
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadFileElement.addEventListener('change', openPopup);

uploadCancelButton.addEventListener('click', closePopup);
