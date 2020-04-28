(function () {
'use strict';

angular.module('Data').service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  // List of shopping items
  var allCategories = [];

  var items = [];

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/categories.json")
      })
      .then(function (result) {
          var categories = [];
          categories = result.data;
          allCategories = categories;
          return allCategories;

      });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
      })
      .then(function (result) {
          var foundItems = [];
          foundItems = result.data.menu_items;
          items = foundItems;
          console.log(items);
          return items;
      });
  };
}
})();
