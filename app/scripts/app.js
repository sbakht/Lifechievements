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
        templateUrl: 'views/main.html',
        // controller: 'MainCtrl'
      })
      .when('/demo', {
        templateUrl: 'views/demo.html',
        // controller: 'AboutCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AchievementsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AccountCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
