'use strict';

angular.module('snapItApp')
  .controller('InviteCtrl', function ($scope, $http) {
    $scope.errors = {};

    $scope.invite = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $http.post('http://localhost:9000/invite/?inviteeEmail='+$scope.inviteeEmail+'&username' + $scope.user.name)
        .then( function() {
          $scope.message = 'Invite Sent.';
        })
        // .catch( function() {
        //   form.password.$setValidity('mongoose', false);
        //   $scope.errors.other = 'Incorrect password';
        //   $scope.message = '';
        // });
      }
		};
  });