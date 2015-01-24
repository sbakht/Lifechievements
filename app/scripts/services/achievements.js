'use strict';

/**
 * @ngdoc service
 * @name achieveYourLifeApp.Achievements
 * @description
 * # Achievements
 * Factory in the achieveYourLifeApp.
 */
angular.module('achieveYourLifeApp')
  .factory('AchievementsFactory', function ($firebase) {

  	function create($scope, authData, achievement) {
      if(authData) {
        $scope.achievements.$add(achievement);
      }else{
      	$scope.achievements.push(achievement);
      }
  	};

  	function add($scope, authData, achievement, increment) {
      achievement.current = achievement.current + increment;
      if(achievement.current > 10000000) {
        achievement.current = 10000000;
      }
      if (achievement.current >= achievement.goal) {
        $scope.$broadcast('unlockedBroadcast', achievement);
      }

      save($scope, authData, achievement);
  	};

  	function save($scope, authData, achievement) {
      if (authData) {
        $scope.achievements.$save(achievement);
      }
  	};

  	function remove($scope, authData, achievement) {
      if (authData) {
        $scope.achievements.$remove(achievement);
      }else{
      	$scope.achievements = $scope.achievements.filter(function (el) {
        	return el != achievement;
      	});
      }
  	};

  	function getAchievements(userid) {
  	  var ref = new Firebase('https://glowing-torch-9570.firebaseio.com/users/' + userid + '/achievements');
  	  return $firebase(ref).$asArray();  		
  	};

    return  {
      getAchievements : getAchievements,
      create : create,
      add : add,
      save : save,
      remove : remove,
    };

  });