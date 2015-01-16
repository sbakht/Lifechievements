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

    $scope.init = function() {
      $scope.title = "Demo";
      $scope.increment = 1;
      $scope.achievements = [{ title : 'My First Achievement', description : 'Click thumbs up 5 times to unlock this achievement!', current : 0, goal : 5, points : 1}];

      $scope.$on('newAchievementBroadcast', function(event, newAchievement) {
        $scope.achievements.push(newAchievement);
      });

      $scope.$on('deleteAchievementBroadcast', function(event, achievement) {
        $scope.remove(achievement);
      });
    };

    $scope.add = function (achievement, increment) {
        achievement.current = achievement.current + increment;
        if(achievement.current > 10000000) {
          achievement.current = 10000000;
        }
        if(achievement.current >= achievement.goal) {
          $scope.$broadcast('unlockedBroadcast', achievement);
        }
    };

    $scope.remove = function(achievement) {
      $scope.achievements = $scope.achievements.filter(function (el) {
        return el != achievement;
      });
    };

    $scope.init();

  });
