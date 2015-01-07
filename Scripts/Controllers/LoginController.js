var LoginController = function ($scope, $modal) {

    $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'login.html',
          controller: 'LoginModalInstanceController',
          size: size,
          backdrop: true,
        });

        modalInstance.result.then(function () {
        });
    };
 
};

var LoginModalInstanceController = function ($scope, $modalInstance, authService, $log) {

    $scope.loginData = {
        userName: "",
        password: ""
    };
 
    $scope.message = "";
 
    $scope.login = function () {
 
        authService.login($scope.loginData).then(function (response) { 
            $log.info('Login Successful')
            $modalInstance.close();
 
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};