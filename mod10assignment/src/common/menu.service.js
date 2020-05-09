(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiBasePath'];
function MenuService($http, ApiBasePath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiBasePath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiBasePath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(favoriteItem) {
    return $http.get(ApiBasePath + '/menu_items/' + favoriteItem + '.json').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  service.saveUser = function(user) {
    service.user = user;
  };
  service.getUser = function() {
    return service.user;
  };
  service.setCompleted = function(completed) {
    service.completed = completed;
  };
  service.getCompleted = function() {
    return service.completed;
  };

}



})();
