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
    	$scope.increment = 1;
	    $scope.achievements = [{ title : 'My First Achievement', description : 'Click thumbs up 5 times to unlock this achievement!', current : 0, goal : 5, points : 1}];

    	$scope.$on('newAchievementBroadcast', function(event, newAchievement) {
      	$scope.achievements.push(newAchievement);
    	});
  	}

    $scope.add = function (achievement, increment) {
        achievement.current = achievement.current + increment;
        if(achievement.current >= achievement.goal) {
          $scope.$broadcast('unlockedBroadcast', achievement);
        }
    }

    $scope.init();

  });
