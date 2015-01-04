var AchievementController = function ($rootScope, $scope, AchievementFactory) {

    $scope.achievements = AchievementFactory.getAchievementList();

    $scope.increment = 1;

    $scope.unlockedAchievementBool = false;
    $scope.unlockedAchievement = AchievementFactory.getUnlockedAchievement();

    $scope.add = function (achievement, increment) {
        achievement.Current = achievement.Current + increment;
        if(achievement.Current >= achievement.Total) {
            $scope.unlockedAchievement = achievement;
            $scope.unlockedAchievementBool = true;
            AchievementFactory.setUnlockedAchievement(achievement);
            $rootScope.$broadcast('UnlockedAchievementBroadcast');
        }else{
            $scope.unlockedAchievement = {};
            $scope.unlockedAchievementBool = false;
            AchievementFactory.setUnlockedAchievement({});
        }
    }

  };

AchievementController.$inject = ['$rootScope', '$scope', 'AchievementFactory'];