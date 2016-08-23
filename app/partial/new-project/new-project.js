angular.module('app').controller('NewProjectCtrl',function($scope, projectService){

    //to je objekt, ki vsebuje podatke o nasem projektu
    $scope.project = {

    };

    $scope.onCreateClick = function () {

        // .then lahko naredimo, ker smo v service dali: return promise
        projectService.create($scope.project)
            .then( function (res){
                console.log(res);

            });

    };

});
