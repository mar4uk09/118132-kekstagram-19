'use strict';

(function () {
  var imgPreview = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var effectsInputs = effectsList.querySelectorAll('input[type=radio]');
  var effectValue = document.querySelector('.effect-level__value').value;

  var removeAllEffects = function () {
    effectsInputs.forEach(function (item) {
      imgPreview.classList.remove('effects__preview--' + item.value);
      imgPreview.style.filter = 'none';
    });
  };

  var addEffect = function (evt) {
    imgPreview.classList.add('effects__preview--' + evt.target.value);
  };

  var changeFilter = function (evt) {
    switch (evt.target.value) {
      case 'chrome':
        imgPreview.style.filter = 'grayscale(' + effectValue / 100 + ')';
        break;
      case 'sepia':
        imgPreview.style.filter = 'sepia(' + effectValue / 100 + ')';
        break;
      case 'marvin':
        imgPreview.style.filter = 'invert(' + effectValue + '%)';
        break;
      case 'phobos':
        imgPreview.style.filter = 'blur(' + 3 * effectValue / 100 + 'px)';
        break;
      case 'heat':
        imgPreview.style.filter = 'brightness(' + (2 * effectValue / 100 + 1) + ')';
        break;
      default:
        imgPreview.style.filter = 'none';
    }
  };

  var filterChangeHandler = function (evt) {
    removeAllEffects();

    if (evt.target.matches('input[type=radio]') && evt.target.value !== 'none') {
      addEffect(evt);
    }

    changeFilter(evt);
  };

  effectsList.addEventListener('change', filterChangeHandler);
})();
