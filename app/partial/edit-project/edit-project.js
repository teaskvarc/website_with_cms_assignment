angular.module('app').controller('EditProjectCtrl',function(
    $scope,
    projectService,
    $state,
    Upload,
    NET

){

    $scope.isCreating   = false;
    $scope.isUploading  = false;

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

    $scope.uploadData = {

    };

    $scope.uploadFiles = function (file) {

        $scope.isUploading = true;

        Upload.upload({

            url: NET.API_URL+'/api/upload',
            data: {
                file: file
            }
        }).then(function (resp) {

            $scope.project.coverImage = resp.data.filename;

            $scope.isUploading = false;

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100 * evt.loaded / evt.total);
            $scope.uploadData.progress = progressPercentage;

        });

    };

});
