var AchievementController = function ($rootScope, $scope, ordersService, AchievementFactory, $log, SaveToDatabaseService) {

    // $scope.achievements = AchievementFactory.getAchievementList();
    $log.info("hi from achievementcontroller");
    // $scope.achievements = [];

    ordersService.getOrders().then(function (results) {

        $scope.achievements = results;
        $log.info($scope.achievements + " + hi from AchievementController");
        $log.info(AchievementFactory.getAchievementList() + " + AchievementController getAchievementList before setting");
        AchievementFactory.setAchievementList($scope.achievements);
        $log.info(AchievementFactory.getAchievementList() + " + AchievementController getAchievementList after setting");

    }, function (error) {
        alert(error.data.message);
    });


    $scope.increment = 1;

    $scope.unlockedAchievementBool = false;
    $scope.unlockedAchievement = AchievementFactory.getUnlockedAchievement();

    $scope.add = function (achievement, increment) {
        achievement.current = achievement.current + increment;
        if(achievement.current >= achievement.goal) {
            $scope.unlockedAchievement = achievement;
            $scope.unlockedAchievementBool = true;
            AchievementFactory.setUnlockedAchievement(achievement);
            $rootScope.$broadcast('UnlockedAchievementBroadcast');
            SaveToDatabaseService.save($scope.achievements);
        }else{
            $scope.unlockedAchievement = {};
            $scope.unlockedAchievementBool = false;
            AchievementFactory.setUnlockedAchievement({});
        }
    }

  };

AchievementController.$inject = ['$rootScope', '$scope', 'ordersService','AchievementFactory', '$log', 'SaveToDatabaseService'];