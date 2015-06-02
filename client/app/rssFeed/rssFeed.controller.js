'use strict';

angular.module('snapItApp')
  .controller("RssCtrl", ['$scope','FeedService', 'FeedList', '$http', 
    function ($scope,FeedService,FeedList,$http){
    $scope.feedUrls = [];
    $scope.ObjectUrls = {};
    debugger;

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
          $scope.updateFeed(url);     
         }
         
      });
      };

    $scope.updateFeed =  function (url){
      debugger;
      
      debugger;
      $http.post('api/users/addUrl', {url: url}).
        success(function(data, status, headers, config) {
          debugger;
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          debugger;
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });



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


    this.get = function(urls) {
    //var feeds = [];
    for (var i=0; i<urls.length; i++) {
      var url = urls[i];
      var thisUrl = url;
      FeedService.parseFeed(url)
        .then(function(res){
          
          debugger;
          
          // make a post request to save the url
          // $http.post('/api/users/addUrl', {
          //   url: thisUrl
          // })
          //   .success(function(data) {
          //     debugger;
          //    console.log("Succesgully added the url");
          
          //   })
          //   .error(function(data) {
          //     debugger;
          //     defer.reject("failed to do a post request");
          //     console.log(data);
          
          //   });
        

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
