'use strict';

describe('Controller: DemoCtrl', function () {

  // load the controller's module
  beforeEach(module('achieveYourLifeApp'));

  var DemoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DemoCtrl = $controller('DemoCtrl', {
      $scope: scope
    });
  }));

  it('should increment achievement over the goal requirement', function () {
    scope.add(scope.achievements[0], 6);
    expect(scope.achievements[0].current).toBe(6);
  });

  it('should cap at 10 million', function () {
    scope.add(scope.achievements[0], 999999999999);
    expect(scope.achievements[0].current).toBe(10000000);
  });
});
