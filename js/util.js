'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getIntFromArray = function (array) {
    return parseInt(array.match(/\d+/), 10);
  };

  var appendFragment = function (array, renderFunction, container) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderFunction(array[i]));
    }

    container.appendChild(fragment);
  };

  var cleanContainer = function (container) {
    var children = container.children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];

      child.parentElement.removeChild(child);
    }
  };

  window.util = {
    getRandomInt: getRandomInt,
    getIntFromArray: getIntFromArray,
    appendFragment: appendFragment,
    cleanContainer: cleanContainer
  };
})();
