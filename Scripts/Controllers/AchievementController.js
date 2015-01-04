var AchievementController = function ($scope, AchievementFactory) {

    $scope.achievements = AchievementFactory.getAchievementList();

    $scope.increment = 1;

  };

AchievementController.$inject = ['$scope', 'AchievementFactory'];