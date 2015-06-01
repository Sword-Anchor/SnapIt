'use strict';

angular.module('snapItApp')
  .controller('CreateCtrl', ['$scope', function ($scope) {
    $scope.title='create';
    console.log('*** create controller ***');
  }]);