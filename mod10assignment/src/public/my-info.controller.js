(function () {
"use strict";
angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'ApiBasePath'];
function MyInfoController(MenuService, ApiBasePath) {
  var $ctrl = this;
  $ctrl.basePath = ApiBasePath;
  $ctrl.user = MenuService.getUser();
  $ctrl.completed = MenuService.getCompleted();
}
})();
