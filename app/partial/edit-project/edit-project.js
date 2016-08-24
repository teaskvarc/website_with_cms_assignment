angular.module('app').controller('EditProjectCtrl',function(
    $scope,
    projectService,
    $state
){

    // tukaj item, ki smo ga napolnili v project-service pripnemo na $scope
    // ta $scope drzi vse podatke o projektu

    $scope.project = projectService.model.item;

    $scope.SaveClick = function () {

        // kot prvi parameter smo v service dolocili, da posljemo ID
      projectService.update($scope.project._id, $scope.project)
        .then(function (res) {

            $state.go('projects');

        });

    };

});
