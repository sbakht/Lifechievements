var app = angular.module('AchieveApp', ['ui.bootstrap']);

app.controller('AchievementController', AchievementController);
app.controller('CreateAchievementController', CreateAchievementController);
app.controller('ModalInstanceCtrl', ModalInstanceCtrl);
app.controller('UnlockedAchievementController', UnlockedAchievementController);
app.controller('UnlockedAchievementModalInstanceController', UnlockedAchievementModalInstanceController);
app.factory('AchievementFactory', AchievementFactory);