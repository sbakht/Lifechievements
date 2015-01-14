'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('EditCtrl', function ($scope, $modal) {

	$scope.editAchievement = function (achievement) {

	    var modalInstance = $modal.open({
	      templateUrl: 'views/edit.html',
	      controller: 'EditModalInstanceCtrl',
          resolve: {
            achievement: function() {
              return achievement;
            }
          }
	    });
  	};
  });

angular.module('achieveYourLifeApp')
  .controller('EditModalInstanceCtrl', function ($rootScope, $scope, $modalInstance, achievement) {

  	$scope.achievement = achievement;
  	$scope.form = angular.copy(achievement);

    $scope.editAchievement = function (form) {
  		$scope.achievement.title = form.title;
  		$scope.achievement.description = form.description;
  		$scope.achievement.goal = form.goal;
  		$rootScope.$broadcast("editAchievementBroadcast", $scope.achievement);
    	$modalInstance.close(form);
    };

	$scope.delete = function() {
		$rootScope.$broadcast("deleteAchievementBroadcast", $scope.achievement);
		$modalInstance.dismiss('cancel');
	}

	$scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});