'use strict';

/**
 * @ngdoc service
 * @name achieveYourLifeApp.Achievements
 * @description
 * # Achievements
 * Factory in the achieveYourLifeApp.
 */
angular.module('achieveYourLifeApp')
  .factory('AchievementsFactory', function ($firebase) {
    return function(userid) {
      var ref = new Firebase('https://glowing-torch-9570.firebaseio.com/users/' + userid + '/achievements');
      return $firebase(ref).$asArray();
    };
  });
