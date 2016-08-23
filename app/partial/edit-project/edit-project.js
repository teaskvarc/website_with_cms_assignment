angular.module('app').controller('EditProjectCtrl',function(
    $scope,
    projectService
){

    // tukaj item, ki smo ga napolnili v project-service pripnemo na $scope
    $scope.project = projectService.model.item;

});
