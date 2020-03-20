'use strict';

(function () {
  var PICTURES_QUANTITY = 25;
  var picturesContainer = document.querySelector('.pictures');

  var generatePicturesArray = function (number) {
    var array = [];

    for (var i = 0; i < number; i++) {
      array.push(window.data.generate(i + 1));
    }

    return array;
  };

  var mockPictures = generatePicturesArray(PICTURES_QUANTITY);

  window.util.appendFragment(mockPictures, window.picture.render, picturesContainer);

  window.gallery = {
    pictures: mockPictures
  };
})();
