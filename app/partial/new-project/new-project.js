angular.module('app').controller('NewProjectCtrl',function(
    $scope,
    projectService,
    $state,
    Upload,
    NET

){

    //to je objekt, ki vsebuje podatke o nasem projektu
    $scope.project = {

            coverImage:null
    };

    $scope.uploadData   = {

            progress: 0

    };

    $scope.isCreating   = false;
    $scope.isUploading  = false;



    // kot prvi parameter je v html definiran: $file, zato ga moram tukaj prejeti
    $scope.uploadFiles = function (file) {

        $scope.isUploading = true;

        Upload.upload({
            url: NET.API_URL+'/upload',
            data: {
                file: file
            }
        }).then(function (resp) {

           $scope.project.coverImage = resp.data.filename;

            $scope.isUploading = false;

        }, function (resp) {
            console.log('Error status: ' + resp.status);

        }, function (evt) {

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.uploadData.progress = progressPercentage;
        });
    };




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
