'use strict';

angular.module('snapItApp')
  .controller('UploadController',['$scope' ,'$http', function($scope,$http) {
  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;
  $scope.accesskey = '';
  $scope.secretkey = '';
  $scope.bucket = '';
  $scope.region ='';

  $scope.upload = function() {

    $http.get('/getAwsKeys').success(function(res){
      var config = res;
      $scope.accesskey = config['access'];
      $scope.secretkey = config['secret'];
      $scope.bucket = config['bucket'];
      $scope.region = config['region'];
      console.log($scope.accesskey);
      console.log($scope.secretkey);
      console.log($scope.bucket);
      console.log($scope.region);

      console.log(res);
      AWS.config.update({ accessKeyId: $scope.accesskey, secretAccessKey: $scope.secretkey });
      AWS.config.region = $scope.region;
      var bucket = new AWS.S3({ params: { Bucket: $scope.bucket } });
      if($scope.file) {
        //  File Size Check First and Error message
        // improvement over that is send file chunkd irrespective of the selected size
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
          return false;
        }
        // Prepend Unique String To Prevent Overwrites
        var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
        console.log($scope.file.name);
        bucket.putObject(params, function(err, data) {
          if(err) {
            toastr.error(err.message,err.code);
            return false;
          }
          else {
            // Upload Successfully Finished
            toastr.success('File Uploaded Successfully', 'Done');

            // Reset The Progress Bar
            setTimeout(function() {
              $scope.uploadProgress = 0;
              $scope.$digest();
            }, 4000);
          }
        })
          .on('httpUploadProgress',function(progress) {
            $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
            $scope.$digest();
          });
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    });
  }
  $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

}])
  .directive('file', function() {
    return {
      restrict: 'AE',
      scope: {
        file: '@'
      },
      link: function(scope, el, attrs){
        el.bind('change', function(event){
          var files = event.target.files;
          var file = files[0];
          scope.file = file;
          scope.$parent.file = file;
          scope.$apply();
        });
      }
    };
  });