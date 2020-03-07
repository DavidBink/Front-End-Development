(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.name = "";
  $scope.message = "";
  $scope.checkTooMuch = function () {
    var messageValue = countItems($scope.name.toString());
    console.log(messageValue);
    if (messageValue == 0) {
      $scope.message = "Please enter data first.";
    }
    else if (messageValue < 4) {
      $scope.message = "Enjoy!";
    }
    else if (messageValue > 3) {
      $scope.message = "Too much!";
    }
  };


  function countItems(string) {
    var totalItemsValue = 0;
    const words = string.split(',');
    for (var i = 0; i < words.length; i++) {
      if (words[i].toString().replace(/\s/g,"") == "") {
      }
      else {
        totalItemsValue += 1;
      }
    }
    return totalItemsValue;
  }

};


})();
