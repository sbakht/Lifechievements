'use strict';

/**
 * @ngdoc service
 * @name achieveYourLifeApp.Groups
 * @description
 * # Groups
 * Factory in the achieveYourLifeApp.
 */
angular.module('achieveYourLifeApp')
  .factory('GroupsFactory', function ($firebase) {
    return { 
      userGroups : function(userid) {
        var ref = new Firebase('https://glowing-torch-9570.firebaseio.com/users/' + userid + '/groups');
        return $firebase(ref).$asObject();
      },
      allGroups : function() {
        var ref = new Firebase('https://glowing-torch-9570.firebaseio.com/groups');
        return $firebase(ref).$asObject();        
      }
    }
  });
