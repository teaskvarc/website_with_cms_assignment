angular.module('app').controller('NewArticleCtrl',function(
    $scope, 
    articleService, 
    $state

){

    $scope.article = {};

    $scope.onCreateClick = function () {

        articleService.create($scope.article)
            .then(function (res) {
                console.log(res);

                $state.go('app.articles');

            });

    };

});
