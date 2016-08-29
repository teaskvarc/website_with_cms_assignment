angular.module('app').controller('ArticlesCtrl',function(
    $scope,
    articleService

){

    $scope.articles = articleService.model.list;

    $scope.deleteClick = function (id) {

        articleService.delete(id);
    };
    

});
