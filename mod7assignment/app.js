(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.filter('custom', CustomFilterFactory)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showBuyList = this;
  ShoppingListCheckOffService.addBuyItem("Chocolate Chip Cookies", "200", 2);
  ShoppingListCheckOffService.addBuyItem("Peanut Butter Cookies", "10", 10);
  ShoppingListCheckOffService.addBuyItem("Snickerdoodle Cookies", "50", 5);
  ShoppingListCheckOffService.addBuyItem("White Chip Macademia Nut Cookies", "100", 100);
  ShoppingListCheckOffService.addBuyItem("Oreo Cookies", "20", 20);

  showBuyList.items = ShoppingListCheckOffService.getBuyItems();

  showBuyList.removeBuyItem = function (itemIndex) {
    ShoppingListCheckOffService.removeBuyItem(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'customFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService, customFilter) {
var showBoughtList = this;
showBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
console.log(showBoughtList.items.length)
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var buyItems = [];

  // List of shopping items bought
  var boughtItems = [];

  service.addBuyItem = function (itemName, quantity, price_per_item) {
    var buyItem = {
      name: itemName,
      quantity: quantity,
      price_per_item: price_per_item
    };
    buyItems.push(buyItem);
  };

  service.addBoughtItem = function (itemName, quantity, price_per_item) {
    var boughtItem = {
      name: itemName,
      quantity: quantity,
      price_per_item: price_per_item
    };
    boughtItems.push(boughtItem);
  };

  service.removeBuyItem = function (itemIndex) {
    console.log(buyItems[itemIndex].name);
    console.log(buyItems[itemIndex].quantity);
    service.addBoughtItem(buyItems[itemIndex].name,
                          buyItems[itemIndex].quantity,
                          buyItems[itemIndex].price_per_item);
    buyItems.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

}

function CustomFilterFactory() {
  return function (input) {
    input = '$$$' + input;
    return input;
  }
}


})();
