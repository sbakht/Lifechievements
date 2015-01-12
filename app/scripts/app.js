'use strict';

/**
 * @ngdoc overview
 * @name achieveYourLifeApp
 * @description
 * # achieveYourLifeApp
 *
 * Main module of the application.
 */
angular
  .module('achieveYourLifeApp', [
    'ngRoute', 'ui.bootstrap', 'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
      })
      .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AchievementsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('locked', function () {
    return function(achievements) {
      var filtered = [];
      for(var i = 0; i < achievements.length; i++) {
        if(achievements[i].current < achievements[i].goal) {
          filtered.push(achievements[i]);
        }
      }
      return filtered;
    };
  })
  .filter('unlocked', function () {
    return function(achievements) {
      var filtered = [];
      for(var i = 0; i < achievements.length; i++) {
        if(achievements[i].current >= achievements[i].goal) {
          filtered.push(achievements[i]);
        }
      }
      return filtered;
    };
  });
