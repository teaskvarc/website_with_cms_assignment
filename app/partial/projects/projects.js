angular.module('app').controller('ProjectsCtrl',function(
    $scope,
    projectService

){

    $scope.projects = projectService.model.list;


    $scope.deleteClick = function (id) {

        projectService.delete(id);

    };

    $scope.editClick = function (id) {

        projectService.update(id);
    };

});
