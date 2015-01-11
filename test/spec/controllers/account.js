'use strict';

describe('Controller: AccountCtrl', function () {

  // load the controller's module
  beforeEach(module('achieveYourLifeApp'));

  var AccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountCtrl = $controller('AccountCtrl', {
      $scope: scope
    });
  }));

  it('should be logged out', function () {
    scope.logout();
    expect(scope.isLoggedIn).toBe(false);
  });

});
