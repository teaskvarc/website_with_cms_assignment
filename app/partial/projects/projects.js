angular.module('app').controller('ProjectsCtrl',function(
    $scope,
    projectService

){


    $scope.projects = projectService.model.list;


    
});
