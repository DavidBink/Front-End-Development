(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsDetailController', ItemsDetailController);


ItemsDetailController.$inject = ['items'];
function ItemsDetailController(items) {
  var itemsDetailCtrl = this;
  itemsDetailCtrl.items = items;
  console.log("Did we make it into the ItemsDetailController?");
  console.log(itemsDetailCtrl.items);
}

})();
