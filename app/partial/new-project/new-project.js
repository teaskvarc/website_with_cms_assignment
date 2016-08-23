angular.module('app').controller('NewProjectCtrl',function(
    $scope,
    projectService,
    $state
){

    //to je objekt, ki vsebuje podatke o nasem projektu
    $scope.project = {};

    $scope.isCreating = false;

    $scope.onCreateClick = function () {

        $scope.isCreating = true;

        // .then lahko naredimo, ker smo v service dali: return promise
        projectService.create($scope.project)
            .then(function (res){
                console.log(res);

                $scope.isCreating = false;
                $state.go('projects');
            });

    };

});
