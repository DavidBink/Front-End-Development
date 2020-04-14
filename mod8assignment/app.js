(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
    // controller: FoundItemsDirectiveController,
    // controllerAs: 'found',
    // bindToController: true
  };

  return ddo;
}

// function FoundItemsDirectiveController() {
//   // var foundItems = this;
// }

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var foundItems = this;
  foundItems.searchTerm = "";
  foundItems.found = [];
  // foundItems.found = MenuSearchService.getMatchedMenuItems(foundItems.searchTerm);

  // promise.then(function (response) {
  //   // menu.categories = response.data;
  // })
  // .catch(function (error) {
  //   // console.log("Something went terribly wrong.");
  // });

  foundItems.getMatchedMenuItems = function () {
    MenuSearchService.getMatchedMenuItems(foundItems.searchTerm)
  .then(function (result) {
    console.log(result);
    foundItems.found = result;
    console.log(foundItems.found);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  })
  };

  foundItems.removeItem = function (itemIndex) {
    console.log("Did the function get called inside the controller?");
  // MenuSearchService.removeItem(itemIndex);
    foundItems.found.splice(itemIndex, 1);
};

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) { return $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json")
  })
  .then(function (result) {
      var foundItems = [];
      if (searchTerm === '' || searchTerm === ' ') {
      } else{
        for (var i = 0; i < result.data.menu_items.length; i++) {
          if (result.data.menu_items[i].description.includes(searchTerm)) {
            foundItems.push(result.data.menu_items[i]);
          }
        }
      }
      console.log(foundItems);
      return foundItems;

  });
};

// service.removeItem = function (itemIndex) {
//   console.log("Did we get to the service remove item function?");
//   foundItems.found.splice(itemIndex, 1);
// };

}
})();
