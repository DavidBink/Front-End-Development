describe('menucategories', function () {

  var menucategories;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
//From Stack Overflow: https://stackoverflow.com/questions/30580897/injecting-custom-factory-in-jasmine-test
// module('mod', function($provide) {
//      $provide.factory('factoryA', function () { return "fake value"; });
//  });
    module(function ($provide) {
      $provide.factory('loadingHttpInterceptor', function () {
        return {request: "", response: "", responseError: ""};
      });
    });
    module('common');

    inject(function ($injector) {
      menucategories = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should return favorite item', function() {
// I had to pick my actual, real life favorite Chinese food item to run this
// test obviously!!
    var favoriteItem = 'C2';
    $httpBackend.whenGET(ApiBasePath + '/menu_items/' + favoriteItem + '.json')
    .respond([{
            id: 37,
            short_name: "C2",
            name: "General Tso's Chicken",
            description: "chunks of chicken, breaded and deep-fried with sau…by request: for pint $1 extra, for large $2 extra",
            price_small: 10.95,
            price_large: 14.95,
            small_portion_name: "pint",
            large_portion_name: "large",
            created_at: "2020-05-07T00:48:34.176Z",
            updated_at: "2020-05-07T00:48:34.176Z",
            category_short_name: "C",
            image_present: true
          }]);
    menucategories.getMenuItem(favoriteItem).then(function(response) {
      expect(response)
      .toEqual([{
              id: 37,
              short_name: "C2",
              name: "General Tso's Chicken",
              description: "chunks of chicken, breaded and deep-fried with sau…by request: for pint $1 extra, for large $2 extra",
              price_small: 10.95,
              price_large: 14.95,
              small_portion_name: "pint",
              large_portion_name: "large",
              created_at: "2020-05-07T00:48:34.176Z",
              updated_at: "2020-05-07T00:48:34.176Z",
              category_short_name: "C",
              image_present: true
      }]);
    });
    $httpBackend.flush();
  });

});
