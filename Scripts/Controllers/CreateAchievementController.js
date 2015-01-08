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
      var newAchievement = { title : form.Title, description : form.Description, current : 0, goal : form.Goal, Points : form.Points};
      $scope.achievements.push(newAchievement);
      // AchievementFactory.setAchievementList($scope.achievements);
      SaveToDatabaseService.save(newAchievement);

      ordersService.getOrders().then(function (results) {

          $scope.achievements = results;
          $log.info("hi from modalinstance result")
          // $log.info($scope.achievements + " + hi from AchievementController");
          // $log.info(AchievementFactory.getAchievementList() + " + AchievementController getAchievementList before setting");
          // AchievementFactory.setAchievementList($scope.achievements);
          // $log.info(AchievementFactory.getAchievementList() + " + AchievementController getAchievementList after setting");

      }, function (error) {
          alert(error.data.message);
      });


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