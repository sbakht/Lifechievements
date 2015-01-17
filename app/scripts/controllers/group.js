'use strict';

angular.module('achieveYourLifeApp')
  .controller('GroupCtrl', function ($scope, $location, $firebase, GroupsFactory) {

    var authData;

    $scope.init = function() {
      var ref = new Firebase('https://glowing-torch-9570.firebaseio.com');
      authData = ref.getAuth();
      if (authData) {
        $scope.mygroups = GroupsFactory.userGroups(authData.uid);
        var achref = new Firebase('https://glowing-torch-9570.firebaseio.com/users/' + authData.uid);
        var sync = $firebase(achref);
        $scope.user = sync.$asObject();
      } else {
        $location.path('/');
      }

      $scope.getGroups();
    };


    $scope.getGroups = function() {
        $scope.groups = GroupsFactory.allGroups();
    };

    $scope.createGroup = function() {
      var group = {};
      group[$scope.newGroupName] = { name : $scope.newGroupName};
      $scope.groups[$scope.newGroupName] = { name : $scope.newGroupName};
      $scope.groups.$save();
    };

    $scope.join = function(groupName) {
      $scope.mygroups[groupName] = true;
      if(!$scope.groups[groupName].members) {
        $scope.groups[groupName].members = {};
      }
      $scope.groups[groupName].members[$scope.user.username] = true;
      $scope.mygroups.$save();
      $scope.groups.$save();
    };

    $scope.leave = function(groupName) {
      delete $scope.groups[groupName].members[$scope.user.username];
      delete $scope.mygroups[groupName];
      $scope.mygroups.$save();
      $scope.groups.$save();
    };

    $scope.init();

  });
