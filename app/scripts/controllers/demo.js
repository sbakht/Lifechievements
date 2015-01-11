'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:DemoCtrl
 * @description
 * # DemoCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('DemoCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
