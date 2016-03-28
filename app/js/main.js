var rhApp = angular.module('rhApp', ['ngRoute', 'ngMask']);


/*
 * ROUTERS AND CONFIG
 * -------------------------------------
 * */

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
    when('/payroll/:id', {
      templateUrl: 'payroll.html',
      controller: 'PayrollCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});

rhApp.constant('APIurl', 'http://localhost:8080/api/');

/*
 * SERVICES
 * -------------------------------------
 * */

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

rhApp.factory('Payroll', function($http, APIurl, $httpParamSerializer) {
  'use strict';

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  return {
    get: function(id) {
      return $http.get(APIurl + 'payroll/' + id).then(function(result) {
        return result.data
      })
    }
  }
});

/*
 * CONTROLLERS
 * -------------------------------------
 * */

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

rhApp.controller('PayrollCtrl', function($scope, Payroll, $routeParams) {
  'use strict';

  $scope.d = {};

  Payroll.get($routeParams.id).then(function(data) {
    $scope.d.employer = data[0];
  });


});

/*
 * DIRECTIVES
 * -------------------------------------
 * */

rhApp.directive('rhMask', function() {
  return function(scope, elm, attrs) {
    $(elm).mask(attrs.rhMask);
  }
});
