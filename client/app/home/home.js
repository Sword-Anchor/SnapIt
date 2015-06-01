'use strict';

angular.module('snapItApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl'
  });
}]);