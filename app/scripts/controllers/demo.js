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
	    $scope.achievements = [{ title : 'My First Achievement', description : 'Click add 5 times to unlock this achievement!', current : 0, goal : 5, points : 1}];

    	$scope.hasALocked();

    	$scope.$on('newAchievementBroadcast', function(event, newAchievement) {
      	$scope.achievements.push(newAchievement);
      	$scope.hasALocked();
    	});
  	}

    $scope.add = function (achievement, increment) {
        achievement.current = achievement.current + increment;
        if(achievement.current >= achievement.goal) {
          $scope.$broadcast('unlockedBroadcast', achievement);
          $scope.hasALocked();
        }
    }

    $scope.hasALocked = function() {
    	for(var i = 0; i < $scope.achievements.length; ++i) {
    		if($scope.achievements[i].current < $scope.achievements[i].goal) {
    			$scope.isLocked = true;
    			return;
    		}
    	}
    	$scope.isLocked = false;
    };

    $scope.init();

  });
