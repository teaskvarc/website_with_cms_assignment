angular.module('app').controller('EditProjectCtrl',function(
    $scope,
    projectService,
    $state,
    Upload

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

    // kot prvi parameter je v html definiran: $file, zato ga moram tukaj prejeti
    $scope.upload = function (file) {

          Upload.upload({
              url: 'http://localhost:3010/upload',
              data: {file:file}
          }).then(function (resp) {
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
    };

});
