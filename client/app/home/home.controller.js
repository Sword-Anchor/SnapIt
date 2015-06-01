'use strict';

angular.module('snapItApp')
.controller('HomeCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.title = 'HomePage';

  if (Auth.isLoggedIn()){
    $location.path('/main');
  }

}]);