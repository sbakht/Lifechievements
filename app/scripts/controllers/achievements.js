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
        $scope.achievements = AchievementsFactory(authData.uid);
      } else {
        $location.path('/');
      }

      $scope.$on('newAchievementBroadcast', function(event, newAchievement) {
        $scope.achievements.$add(newAchievement);
      });

      $scope.$on('deleteAchievementBroadcast', function(event, achievement) {
        $scope.remove(achievement);
      });

      $scope.$on('editAchievementBroadcast', function(event, achievement) {
        $scope.save(achievement);
      });

    };

    $scope.add = function(achievement, increment) {
      achievement.current = achievement.current + increment;
      if(achievement.current > 10000000) {
        achievement.current = 10000000;
      }
      if (achievement.current >= achievement.goal) {
        $scope.$broadcast('unlockedBroadcast', achievement);
      }

      $scope.save(achievement);
    };

    $scope.save = function(achievement) {
      if (authData) {
        $scope.achievements.$save(achievement);
      }
    };

    $scope.remove = function(achievement) {
      if (authData) {
        $scope.achievements.$remove(achievement);
      }
    };

    $scope.init();
  });