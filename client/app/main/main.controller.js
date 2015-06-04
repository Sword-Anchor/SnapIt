'use strict';

angular.module('snapItApp')
  .controller('MainCtrl', ['$scope', 'Auth', '$http', 'socket', '$location', function ($scope, Auth, $http, socket, $location) {
    // if (!Auth.isLoggedIn()){
    //   $location.path('/login');
    // }

    //$scope.awesomeThings = [];
    $scope.pics = [];
    $scope.searchTxt = '';
    $scope.searchDate = true;
    $scope.isCollapsed = false;

    $http.get('/api/things/getItems').success(function(pics) {
      $scope.pics = pics;
      socket.syncUpdates('thing', $scope.pics);
      $scope.pics.forEach(function(item){
        item.mediaType = item.mediaType;
        item.media = item.media;
        item.url = item.url;
        item.title = item.title;
        item.description = item.description;
        item.email = item.email;
        item.createDate = item.createDate;

      });

      //sort in ascending order
      $scope.searchDate = false;
      $scope.sortByTime();
    });

    $scope.showImage = function(mediaType) {
      if (mediaType === 'image') {
        return true;
      }
      return false;
    };

    $scope.isSelection = function(mediaType) {
      if (mediaType === 'selection') {
        return true;
      }
      return false;
    };

    $scope.isPage = function(mediaType) {
      if (mediaType === 'page') {
        return true;
      }
      return false;
    };

    $scope.isLink = function(mediaType) {
      if (mediaType === 'links') {
        return true;
      }
      return false;
    };

    $scope.$watch('searchTxt',function(val){
      if (val === '') {
        $http.get('/api/things/getItems').success(function(pics) {
          $scope.pics = pics;
          socket.syncUpdates('thing', $scope.pics);
          $scope.pics.forEach(function(item){
            item.mediaType = item.mediaType;
            item.media = item.media;
            item.url = item.url;
            item.title = item.title;
            item.description = item.description;
            item.email = item.email;
            item.createDate = item.createDate;

          });

          //sort in ascending order
          $scope.searchDate = false;
          $scope.sortByTime();
        });
      } else {
        $scope.pics = $scope.pics.filter(function(obj){
          return obj.title.toLowerCase().indexOf(val) !== -1;
        });
      }
      
    });

    $scope.sortByLikes = function(){
      $scope.pics.sort(function(a,b){
         return b.likes - a.likes;
      });
    };
    
    $scope.sortByTime = function(){
      if ($scope.searchDate) { //sort in recent first
        $scope.pics.sort(function(a,b){
          return a.createTime - b.createTime; 
        });
      } else { // sort in ascending order
        $scope.pics.sort(function(a,b){
          return b.createTime - a.createTime; 
        });
      }

      $scope.searchDate = !$scope.searchDate;
    };

    $scope.deleteSnapit = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.upVote = function(thing) {
      thing.upVotes++;
    };
    
  }]);
