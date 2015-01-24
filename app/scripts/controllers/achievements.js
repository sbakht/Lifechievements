'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:AchievementsCtrl
 * @description
 * # AchievementsCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('AchievementsCtrl', function($scope, $location, AchievementsFactory) {

    var authData;

    $scope.init = function() {
      $scope.title = 'Your Account';
      $scope.increment = 1;

      var baseUrl = 'https://glowing-torch-9570.firebaseio.com';
      var ref = new Firebase(baseUrl);
      authData = ref.getAuth();
      
      if (authData) {
        $scope.achievements = AchievementsFactory.getAchievements(authData.uid);
      } else {
        $location.path('/');
      }

      $scope.$on('newAchievementBroadcast', function(event, achievement) {
        $scope.create(achievement);
      });

      $scope.$on('deleteAchievementBroadcast', function(event, achievement) {
        $scope.remove(achievement);
      });

      $scope.$on('editAchievementBroadcast', function(event, achievement) {
        $scope.save(achievement);
      });

    };

    $scope.create = function(achievement) {
      AchievementsFactory.create($scope, authData, achievement);
    };

    $scope.add = function(achievement, increment) {
      AchievementsFactory.add($scope, authData, achievement, increment);
    };

    $scope.save = function(achievement) {
      AchievementsFactory.save($scope, authData, achievement);
    };

    $scope.remove = function(achievement) {
      AchievementsFactory.remove($scope, authData, achievement);
    };

    $scope.init();
  });