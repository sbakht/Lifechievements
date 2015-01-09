var AchievementController = function ($rootScope, $scope, ordersService, AchievementFactory, $log, SaveToDatabaseService, authService) {

    $scope.achievements = AchievementFactory.getAchievementList();
    $log.info("hi from achievementcontroller");

    // $scope.achievements = [];

      // $scope.$watch(function () {
      //   return AchievementFactory.getAchievementList();
      //   }, function (value)
      // {
      //   $log.info('WATCH');
      //   $scope.achievements = value;
      //   $log.info(value);
      //   $log.info($scope.achievements);
      // })


    if(authService.authentication.isAuth) {
        ordersService.getOrders().then(function (results) {

            $scope.achievements = results;
            $log.info($scope.achievements + " + hi from AchievementController");
            $log.info(AchievementFactory.getAchievementList() + " + AchievementController getAchievementList before setting");
            AchievementFactory.setAchievementList($scope.achievements);
            $log.info(AchievementFactory.getAchievementList() + " + AchievementController getAchievementList after setting");

        }, function (error) {
            alert(error.data.message);
        });
    }

    $scope.increment = 1;

    $scope.add = function (achievement, increment) {
        achievement.current = achievement.current + increment;
        if(achievement.current >= achievement.goal) {
            AchievementFactory.setUnlockedAchievement(achievement);
        }

        if(authService.authentication.isAuth) {
            SaveToDatabaseService.save(achievement);
        }
    }

  };

AchievementController.$inject = ['$rootScope', '$scope', 'ordersService','AchievementFactory', '$log', 'SaveToDatabaseService','authService'];