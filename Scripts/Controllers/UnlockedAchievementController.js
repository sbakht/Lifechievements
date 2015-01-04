var UnlockedAchievementController = function ($scope, $modal) {

  $scope.$on('UnlockedAchievementBroadcast', function () {
    var modalInstance = $modal.open({
      templateUrl: 'unlockedAchievement.html',
      controller: 'UnlockedAchievementModalInstanceController',
    });

    modalInstance.result.then(function () {
      $scope.achievement = {};
    });
  });
};


var UnlockedAchievementModalInstanceController = function ($scope, $modalInstance, AchievementFactory) {

    $scope.achievement = AchievementFactory.getUnlockedAchievement();

    $scope.close = function () {
    	$modalInstance.close();
    };
};