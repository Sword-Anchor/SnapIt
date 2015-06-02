'use strict';

angular.module('snapItApp')
  .controller("RssCtrl", ['$scope','FeedService', 'FeedList', '$http', 
    function ($scope,FeedService,FeedList,$http){
    $scope.feedUrls = [];
    $scope.ObjectUrls = {};

    /*
     when user clicks on the loadUrl button, the users urls are fetched, and the enw url is
     compared to the urls returned from the server. If there is a new url, then it is 
     passed to updateFeed so that a list of feed entries can be populated in the database
    */

   

    $scope.addUrls = function(url) {
      $(".feeds").empty();
      $http.get('/api/users/me').success(function(user) {
          debugger;
          $scope.returnedUrls = user.rssUrls;
          var found = false;
            for (var i = 0; i < $scope.returnedUrls.length; i++) {
              if (url === $scope.returnedUrls[i]){
                found = true;
               }
              }
         if (!found){
           $scope.feedUrls.push(url);
         }
         $scope.updateFeed();
      });
      };

    $scope.updateFeed =  function (){
      FeedList.get($scope.feedUrls)
        .then (function (data) {
          debugger;
          $scope.feeds = data;
        });
    };
   
  }])

  .service('FeedService',['$http', "$q",function($http, $q){  
     return { 
        parseFeed: function (url) { 
           return $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1&q=' + url +
           '&callback=JSON_CALLBACK');
         }
      }

  }])

  .service('FeedList', ['$rootScope', 'FeedService', '$q', function ($rootScope, FeedService, $q) {
    var feedVar;
    var feeds = [];
    var deferred = $q.defer();
    console.log("loading feeds...");

    this.get = function(urls) {
    //var feeds = [];
    for (var i=0; i<urls.length; i++) {
      var url = urls[i];
      FeedService.parseFeed(url)
        .then(function(res){
          debugger;
          feedVar = res.data.responseData.feed;
          feeds.push(feedVar);
          console.log(feedVar);
          deferred.resolve(feeds);    
        })                    
      }
        debugger;
        return deferred.promise;
    };
}]);
