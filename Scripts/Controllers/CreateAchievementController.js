var CreateAchievementController = function ($scope, $modal, AchievementFactory) {

	$scope.achievements = AchievementFactory.getAchievementList();


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
      $scope.achievements.push({ Title : form.Title, Description : form.Description, Current : 0, Total : form.Total, Points : form.Points});
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