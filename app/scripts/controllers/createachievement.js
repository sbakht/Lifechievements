'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:CreateachievementCtrl
 * @description
 * # CreateachievementCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('CreateachievementCtrl', function ($rootScope, $scope, $modal) {

	$scope.createAchievement = function (size) {

	    var modalInstance = $modal.open({
	      templateUrl: 'views/create.html',
	      controller: 'CreateModalInstanceCtrl',
	      size: size,
	    });

	    modalInstance.result.then(function (form) {
	      var newAchievement = { title : form.Title, description : form.Description, current : 0, goal : form.Goal, points : 0};
	      $rootScope.$broadcast("newAchievementBroadcast", newAchievement);
	    });
  	};
  });

angular.module('achieveYourLifeApp')
  .controller('CreateModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.createAchievement = function (form) {
    	$modalInstance.close(form);
    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});