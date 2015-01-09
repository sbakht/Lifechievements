var app = angular.module('AchieveApp', ['ui.bootstrap', 'LocalStorageModule', 'ngRoute']);

app.controller('AchievementController', AchievementController);
app.controller('CreateAchievementController', CreateAchievementController);
app.controller('ModalInstanceCtrl', ModalInstanceCtrl);
app.controller('UnlockedAchievementController', UnlockedAchievementController);
app.controller('UnlockedAchievementModalInstanceController', UnlockedAchievementModalInstanceController);
app.controller('SignupController', SignupController);
app.controller('SignupModalInstanceController', SignupModalInstanceController);
app.controller('LoginController', LoginController);
app.controller('LoginModalInstanceController', LoginModalInstanceController);
app.factory('AchievementFactory', AchievementFactory);

// app.config(['$routeProvider',
// function($routeProvider) {
//     $routeProvider.when("/",{
//         templateUrl: "home.html",
//         controller:"HomeController"
//     });    $routeProvider.when("/Account",{
//         templateUrl: "account.html",
//         // controller:"animalController"
//     });
//     $routeProvider.when("/Home",{
//         templateUrl: "home.html",
//         // controller: "birdController"
//     });     
// }]);

app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
 
    var serviceBase = 'http://localhost:51000/';
    var authServiceFactory = {};
 
    var _authentication = {
        isAuth: false,
        userName : ""
    };
 
    var _saveRegistration = function (registration) {
 
        _logOut();
 
        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });
 
    };
 
    var _login = function (loginData) {
 
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
 
        var deferred = $q.defer();
 
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
 
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
 
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
 
            deferred.resolve(response);
 
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });
 
        return deferred.promise;
 
    };
 
    var _logOut = function () {
 
        localStorageService.remove('authorizationData');
 
        _authentication.isAuth = false;
        _authentication.userName = "";
 
    };
 
    var _fillAuthData = function () {
 
        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
 
    }
 
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
 
    return authServiceFactory;
}]);

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


app.factory('ordersService', ['$http', '$q', function ($http, $q) {
 
    var serviceBase = 'http://localhost:51000/';
    var ordersServiceFactory = {};
 
    var _getOrders = function () {
        var deferred = $q.defer();

        $http.get(serviceBase + 'api/achievements').success(deferred.resolve).error(deferred.reject);

        return deferred.promise; 
    };

    // var _getOrders = function () {
 
    //     var promise = $http.get(serviceBase + 'api/achievements').then(function (response) {
    //         return response.data;
    //     });

    //     return promise; 
    // };
 
    ordersServiceFactory.getOrders = _getOrders;
 
    return ordersServiceFactory;
 
}]);

app.controller('OrdersController', ['$scope', 'ordersService', function ($scope, ordersService) {

    $scope.orders = [];

    ordersService.getOrders().then(function (results) {

        $scope.orders = results;

    }, function (error) {
        //alert(error.data.message);
    });

}]);

app.factory('SaveToDatabaseService', ['$http', '$log', function($http, $log) {
    var serviceBase = 'http://localhost:51000/';

    function save(data) {
        var res = $http.post(serviceBase + 'api/Achievements/Post', data);
        res.success(function(data, status, headers, config) {
            $log.info('Save Successful');
        });
        res.error(function(data, status, headers, config) {
            $log.info('Save Failed');
        });
    }

    return {
        save : save,
    }
}]);

app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
 
        config.headers = config.headers || {};
 
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }
 
        return config;
    }
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.controller('IndexController', ['$scope', '$location', 'AchievementFactory', 'authService', function ($scope, $location, AchievementFactory, authService) {
 
    $scope.authentication = authService.authentication;

    if($scope.authentication.isAuth) {
        $location.path('Account');
    }

    $scope.logOut = function () {
        authService.logOut();
        // $location.path(''); //send to index? MIGHT HAVE TO CHANGE
    }
 
 
}]);