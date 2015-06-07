'use strict';

angular.module('snapItApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('invite', {
        url: '/invite',
        templateUrl: 'app/invite/invite.html',
        controller: 'InviteCtrl'
      });
  });