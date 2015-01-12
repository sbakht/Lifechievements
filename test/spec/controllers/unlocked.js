'use strict';

describe('Controller: UnlockedCtrl', function () {

  // load the controller's module
  beforeEach(module('achieveYourLifeApp'));

  var UnlockedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnlockedCtrl = $controller('UnlockedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
