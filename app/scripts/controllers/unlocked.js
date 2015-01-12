'use strict';

/**
 * @ngdoc function
 * @name achieveYourLifeApp.controller:UnlockedCtrl
 * @description
 * # UnlockedCtrl
 * Controller of the achieveYourLifeApp
 */
angular.module('achieveYourLifeApp')
  .controller('UnlockedCtrl', function ($scope, $modal) {
    $scope.$on('unlockedBroadcast', function (event, achievement) {
      var modalInstance = $modal.open({
        templateUrl: 'views/unlocked.html',
        controller: 'UnlockedModalInstanceCtrl',
          resolve: {
          achievement: function () {
            return achievement;
          }
        }
      });

    });
  });

angular.module('achieveYourLifeApp')
  .controller('UnlockedModalInstanceCtrl', function ($scope, $modalInstance, achievement) {

    $scope.achievement = achievement;

    $scope.close = function () {
        $modalInstance.close();
    };
});