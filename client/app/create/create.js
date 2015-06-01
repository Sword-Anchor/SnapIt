'use strict';

angular.module('snapItApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('create', {
      url: '/create',
      templateUrl: 'app/create/create.html',
      controller: 'CreateCtrl'
  });
}]);