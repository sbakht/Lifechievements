'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:DemoCtrl
 * @description
 * # DemoCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('DemoCtrl', function ($scope, AchievementsFactory) {

    $scope.init = function() {
      $scope.title = 'Demo';
      $scope.increment = 1;
      $scope.achievements = [{ title : 'My First Achievement', description : 'Click thumbs up 5 times to unlock this achievement!', current : 0, goal : 5, points : 1}];

      $scope.$on('newAchievementBroadcast', function(event, achievement) {
        $scope.create(achievement)
      });

      $scope.$on('deleteAchievementBroadcast', function(event, achievement) {
        $scope.remove(achievement);
      });
    };


    $scope.create = function(achievement) {
      AchievementsFactory.create($scope, null, achievement);
    };

    $scope.add = function (achievement, increment) {
      AchievementsFactory.add($scope, null, achievement, increment);
    };

    $scope.remove = function(achievement) {
      AchievementsFactory.remove($scope, null, achievement);
    };

    $scope.init();

  });
