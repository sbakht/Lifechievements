'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
