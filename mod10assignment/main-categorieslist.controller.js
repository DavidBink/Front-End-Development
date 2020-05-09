(function () {
'use strict';

angular.module('Data')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['items'];
function CategoriesListController(items) {
  var categoriesList = this;
  categoriesList.items = items;
  console.log("Categories controller");
  console.log(categoriesList.items);
}

})();
