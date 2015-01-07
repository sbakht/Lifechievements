var CreateAchievementController = function ($scope, $modal, AchievementFactory, $log, ordersService, SaveToDatabaseService) {

	// $scope.achievements = AchievementFactory.getAchievementList();

  $scope.testorder = function() {
  ordersService.getOrders().then(function (results) {

      $scope.achievements = results;
      // $log.info($scope.achievements[0].current + " + hi from CreateAchievementController");
      // AchievementFactory.setAchievementList($scope.achievements);

  }, function (error) {
      alert(error.data.message);
  });
  }


  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'createAchievement.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      // resolve: {
      //   form: function () {
      //     return $scope.form;
      //   }
      // }
    });

    modalInstance.result.then(function (form) {
      $scope.achievements = AchievementFactory.getAchievementList();
      // $log.info($scope.achievements[0].current + " + hi from result");
      $scope.achievements.push({ title : form.Title, description : form.Description, current : 0, goal : form.Goal, Points : form.Points});
      // AchievementFactory.setAchievementList($scope.achievements);
      SaveToDatabaseService.save($scope.achievements);
    });
  };
};


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance) {

    $scope.createAchievement = function (form) {
    	$modalInstance.close(form);
      // $scope.achievements.push({ Title : form.Title, Description : form.Description, Current : 0, Total : form.Total});
    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};