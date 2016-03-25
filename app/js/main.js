var rhApp = angular.module('rhApp', ['ngRoute', 'ngMask']);

rhApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    }).
    when('/register', {
      templateUrl: 'register.html',
      controller: 'RegisterCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});

rhApp.constant('APIurl', 'http://localhost:8080/api/');

rhApp.factory('Employer', function($http, APIurl, $httpParamSerializer) {
  'use strict';

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  return {
    get: function() {
      return $http.get(APIurl + 'employees').then(function(result) {
        return result.data
      })
    },
    register: function(employer) {
      return $http.post(APIurl + 'employees', $httpParamSerializer(employer))
      .then(function(result) {
        return result.data
      })
    }
  }
});

rhApp.controller('HomeCtrl', function($scope, Employer) {
  'use strict';

  $scope.d = {};

  Employer.get().then(function(data) {
    $scope.d.employees = data;
  });
});

rhApp.controller('RegisterCtrl', function($scope, Employer, $location) {
  'use strict';

  $scope.employer = {};

  $scope.register = function() {
    Employer.register($scope.employer).then(function(data) {
      $location.path('/')
    }, function() {
      alert('Ocorreu algum erro! Tente novamente')
    })
  }
});

rhApp.directive('rhMask', function() {
  return function(scope, elm, attrs) {
    $(elm).mask(attrs.rhMask);
  }
});
