'use strict';

angular.module('snapItApp')
  .controller('RssCtrl', ['$scope','FeedService', 'FeedList', '$http', '$cookieStore', 'User', 'Auth',
    function ($scope, FeedService, FeedList, $http, $cookieStore, User, Auth){
    $scope.ObjectUrls = {};
    $scope.userEmail = Auth.getUserEmail();
    $scope.errorMessage = {};
    $scope.successMessage = {};

    $scope.addFeedToDatabase = function(feedArray) {
      $http.post('api/things/addFeeds', {feedArray: feedArray, email: $scope.userEmail}).
          success(function(data) {
            $scope.successMessage = 'Sucess : RSS Feed has been added';
          }).
          error(function(data) {
            console.log(data);
           });
    };
    /*
     when user clicks on the loadUrl button, the users urls are fetched, and the enw url is
     compared to the urls returned from the server. If there is a new url, then it is 
     passed to updateFeed so that a list of feed entries can be populated in the database
    */
    $scope.addUrls = function(url) {
      $scope.successMessage = {};
      $scope.feedUrl = ''; 
      $('.feeds').empty();
      
      $http.get('/api/users/me').success(function(user) {
          $scope.returnedUrls = user.rssUrls;
          var found = false;
            for (var i = 0; i < $scope.returnedUrls.length; i++) {
              if (url === $scope.returnedUrls[i]){
                found = true;
                break;
               }
              }
         if (!found){
          $scope.updateFeed(url, $scope.userEmail);     
         } else {
           $scope.successMessage = 'You already follow this feed';
         }
         
       });
    };

    $scope.updateFeed =  function (url, email){

      FeedList.get(url, email)
        .then (function (data) {
             $scope.addFeedToDatabase(data.entries);   
        }, function (result){
            $scope.successMessage = result.message;
        });
    };
   
  }])

    .service('FeedService',['$http',function($http){  
     return { 
        parseFeed: function (url) { 
           return $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=' + url +
           '&callback=JSON_CALLBACK');
         }
      };

  }])

    .service('FeedList', ['$rootScope', 'FeedService', '$q', '$http',
     function ($rootScope, FeedService, $q, $http) {
     
     this.get = function(url, email) {
      var deferred = $q.defer();
      
      FeedService.parseFeed(url)
        .then(function(res){
        if (res.data.responseData){
          $http.post('api/users/addUrl', {url: url, email:email}).
             success(function(data) {
               console.log(data);
             }).
             error(function(data) {
               console.log(data);
             });

          var feed = res.data.responseData.feed;
          deferred.resolve(feed);
        } else {
           deferred.reject({message : 'Invalid Url. Make sure to enter a valid RSS url'});
        } 
        });              
        return deferred.promise;
    };
}]);
