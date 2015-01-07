var SignupController = function ($scope, $modal) {
 
    // var startTimer = function () {
    //     var timer = $timeout(function () {
    //         $timeout.cancel(timer);
    //         $location.path('/login');
    //     }, 2000);
    // }

    $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'signup.html',
          controller: 'SignupModalInstanceController',
          size: size,
          backdrop: true,
        });

        modalInstance.result.then(function () {
        });
    };
 
};

var SignupModalInstanceController = function ($scope, $modalInstance, authService, $log) {

 $scope.savedSuccessfully = false;
    $scope.message = "";
 
    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };
 
    $scope.signUp = function () {
    $log.info('in signup');
        authService.saveRegistration($scope.registration).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "Account successfully created";
            $scope.accountCreated = true;

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $log.info(errors.join(' '))
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};