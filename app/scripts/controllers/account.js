'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('AccountCtrl', function ($scope, $modal, $location) {

    var ref;

    $scope.init = function() {
      ref = new Firebase('https://glowing-torch-9570.firebaseio.com');
      ref.onAuth($scope.onAuthChanged);
    };

    $scope.login = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'views/login.html',
        controller: 'LoginModalInstanceCtrl',
        size: size,
        backdrop: true,
        resolve: {
          alertMsg: function () {
            return $scope.alertMsg;
          }
        }
      });

      modalInstance.result.then(function (error) {
        if(error) {
          $scope.alertMsg = error + ''; //need the "" to make error show as string output
          $scope.login();
        }else{
          $location.path('/account');
        }
      }, function () {
        $scope.alertMsg = '';
      });
    };

    $scope.signup = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'views/signup.html',
        controller: 'SignupModalInstanceCtrl',
        size: size,
        backdrop: true,
        resolve: {
          alertMsg: function () {
            return $scope.alertMsg;
          }
        }
      });

      modalInstance.result.then(function (error) {
        if(error) {
          $scope.alertMsg = error + '';
          $scope.signup();
        }else {
          // $scope.alertMsg = 'Account Successfully Created. You may now login.';
          // $scope.login();
          console.log('pls work');
          $location.path('/account');
        }
      }, function () {
        $scope.alertMsg = '';
      });
    };

    //runs when account state changes (logs in or logs out)
    $scope.onAuthChanged = function(authData) {
      $scope.isLoggedIn = authData != null ? true : false;
    };

    $scope.logout = function() {
      ref.unauth();
      $location.path('/');
    };

    $scope.init();

  });

angular.module('achieveYourLifeApp')
  .controller('LoginModalInstanceCtrl', function ($scope, $modalInstance, alertMsg) {

    $scope.loginData = {
        userName: '',
        password: ''
    };
 
    $scope.message = alertMsg;
 
    $scope.login = function () {
        var ref = new Firebase('https://glowing-torch-9570.firebaseio.com');

        ref.authWithPassword({
          email    : $scope.loginData.userName,
          password : $scope.loginData.password
        }, function(error, authData) {
          if (error) {
            $modalInstance.close(error);
          } else {
            $modalInstance.close();
          }
        });

    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('achieveYourLifeApp')
  .controller('SignupModalInstanceCtrl', function ($scope, $modalInstance, alertMsg, $location) {
 
    $scope.registration = {
        userName: '',
        password: '',
        confirmPassword: ''
    };

    $scope.message = alertMsg;
 
    $scope.signUp = function () {

        var ref = new Firebase("https://glowing-torch-9570.firebaseio.com");
        ref.createUser({
          email    : $scope.registration.userName,
          password : $scope.registration.password
        }, function(error) {
          if (error) {
            $modalInstance.close(error);
          } else {
            // $modalInstance.dismiss();
            ref.authWithPassword({
              email    : $scope.registration.userName,
              password : $scope.registration.password
            }, function(error, authData) {
              if (error) {
                $modalInstance.close(error);
              } else {
                console.log('no error');
                $modalInstance.close();
              }
            });

                console.log('before close');
                // $modalInstance.close();
          }
        });
    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});