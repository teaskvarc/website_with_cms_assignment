angular.module('app').controller('EditArticleCtrl',function(
    $scope,
    articleService,
    $state

){

    // tukaj item, ki smo ga napolnili v article-service pripnemo na $scope
    // ta $scope drzi vse podatke o artiklu

    $scope.article = articleService.model.list;

    $scope.SaveClick = function () {

        articleService.update($scope.article._id, $scope.article)
            .then(function (res) {

                $state.go('app.articles');
            });
    };

});
