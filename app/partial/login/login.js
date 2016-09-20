angular.module('app').controller('LoginCtrl',function(
    $scope,
    loginService,
    $state,
    NET
){

    $scope.NET = NET;
    
    $scope.user = {

        email:null,
        password:null

    };

    $scope.loginClick = function () {

      loginService.login($scope.user)
          .then(function () {
              $state.go('app.projects');
          });
    };
});
