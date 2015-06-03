'use strict';

angular.module('snapItApp')
  .controller("RssCtrl", ['$scope','FeedService', 'FeedList', '$http', '$cookieStore', 'User', 'Auth',
    function ($scope, FeedService, FeedList, $http, $cookieStore, User, Auth){
    $scope.feedUrls = [];
    $scope.ObjectUrls = {};
    debugger;
    $scope.userEmail = Auth.getUserEmail();


    /*
     when user clicks on the loadUrl button, the users urls are fetched, and the enw url is
     compared to the urls returned from the server. If there is a new url, then it is 
     passed to updateFeed so that a list of feed entries can be populated in the database
    */
    $scope.addUrls = function(url) {
      debugger;

      $(".feeds").empty();
      var currentUrl = url;
      
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
          debugger;
          $scope.updateFeed(url, $scope.userEmail);     
         }
         
      });
      };

    $scope.updateFeed =  function (url, email){

      FeedList.get($scope.feedUrls, email)
        .then (function (data) {
          debugger;
          $scope.feeds = data;
        });
    };
   
  }])

  .service('FeedService',['$http', "$q",function($http, $q){  
     return { 
        parseFeed: function (url) { 
           return $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=' + url +
           '&callback=JSON_CALLBACK');
         }
      }

  }])

  .service('FeedList', ['$rootScope', 'FeedService', '$q', '$http',
     function ($rootScope, FeedService, $q, $http) {
    var feedVar;
    var feeds = [];
    var deferred = $q.defer();
    console.log("loading feeds...");


    this.get = function(urls, email) {
    //var feeds = [];
    for (var i=0; i<urls.length; i++) {
      var url = urls[i];
      var thisUrl = url;
      FeedService.parseFeed(url)
        .then(function(res){
          
          debugger;
          
        $http.post('api/users/addUrl', {url: url, email:email}).
          success(function(data, status, headers, config) {
            debugger;
            
          }).
           error(function(data, status, headers, config) {
            debugger;
          
           });

        

          debugger;
          feedVar = res.data.responseData.feed;
          feeds.push(feedVar);
          console.log(feedVar);
          deferred.resolve(feeds); 

        })
        // .error(function(response){
        //   console.log("Invalid Url");
        // })                   
      }
        debugger;
        return deferred.promise;
    };
}]);
