(function () {
"use strict";
angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var $ctrl = this;
  $ctrl.valid = true;
  $ctrl.completed = false;
  // $ctrl.menuItems = menuItems;
  // reg.submit = function () {
  //   reg.completed = true;
  // };
  $ctrl.submit = function () {
    $ctrl.checkItem($ctrl.shortName)
    .then(function(favoriteItem){
      if ($ctrl.valid) {
        var user = {};
        user.firstName    = $ctrl.firstName;
        user.lastName     = $ctrl.lastName;
        user.email        = $ctrl.email;
        user.phone        = $ctrl.phone;
        user.favoriteItem = favoriteItem;

        MenuService.saveUser(user);
        MenuService.setCompleted(true);
        $ctrl.completed = true;
      }

    });
  };
  $ctrl.checkItem = function (favoriteItem) {
    return MenuService.getMenuItem(favoriteItem)
    .then(function(favoriteItem){
      $ctrl.valid = true;
      $ctrl.completed = true;
      return favoriteItem;
    })
    .catch(function(errorResponse){
      $ctrl.valid = false;
    });
  };

  $ctrl.validateItem = function (item) {
    return MenuService.getMenuItem(item)
    .then(function(favoriteItem){
      $ctrl.valid = true;
      return true;
    })
    .catch(function(errorResponse){
      $ctrl.valid = false;
      return false;
    });
  };

}
})();
