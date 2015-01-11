'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:AchievementsCtrl
 * @description
 * # AchievementsCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('AchievementsCtrl', function ($scope, $location, $firebase) {

    var ref;
    var authData;

    $scope.init = function() {
      ref = new Firebase("https://glowing-torch-9570.firebaseio.com");
      authData = ref.getAuth();
      if(authData) {
        var achref = new Firebase("https://glowing-torch-9570.firebaseio.com/users/" + authData.uid  + "/achievements");
        var sync = $firebase(achref);

        $scope.achievements = sync.$asArray();
      }else{
        $location.path("/");
      }

      $scope.$on('newAchievementBroadcast', function(event, newAchievement) {
        $scope.achievements.$add(newAchievement);
      });

    }

    $scope.increment = 1;

    $scope.add = function (achievement, increment) {
        achievement.current = achievement.current + increment;
        if(achievement.current >= achievement.goal) {
            // AchievementFactory.setUnlockedAchievement(achievement);
        }

        if(authData) {
          $scope.achievements.$save(achievement);
        };
    }

    $scope.init();
  });