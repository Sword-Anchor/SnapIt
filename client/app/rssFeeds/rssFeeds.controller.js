'use strict';

angular.module('snapItApp')
  .controller("FeedCtrl", ['$scope','FeedService', 'BlogList', function ($scope,FeedService,BlogList){
    $scope.feedUrls = [];
    $scope.ObjectUrls = {};

    $scope.jsonConcat = function(o1, o2) {
       for (var key in o2) {
        o1[key] = o2[key];
       }
       return o1;
    }

    debugger;
    $scope.addUrls = function(url) {
      $(".feeds").empty();
      var found = false;
      for (var i = 0; i < $scope.feedUrls.length; i++) {
        if (url === $scope.feedUrls[i]){
          found = true;
      }
    }
    if (!found){
      $scope.feedUrls.push(url);
     }
    };

    $scope.updateFeed =  function (){
    debugger;
      BlogList.get($scope.feedUrls)
        .then (function (data) {
        
          //var object = $scope.jsonConcat($scope.ObjectUrls, data);
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

  .service('FeedList', ['$rootScope', 'FeedService', '$q', 
    function ($rootScope, FeedService, $q) {
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
