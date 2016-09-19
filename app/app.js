angular.module('app', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ngAnimate',
    'ngFileUpload',
    'ui.tinymce'
]);

angular.module('app').constant('NET',{API_URL:'http://localhost:3010'});

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login',{
       'cover@':{
           url:'/login',
           templateUrl:'partial/login/login.html',
           controller:'LoginCtrl'
       }
    });

    $stateProvider.state('app', {
        abstract:true,
        resolve:{
            auth:function(){
                return true;
            }
        }
    });

    $stateProvider.state('app.home', {
        url: '/home',
        'main@': {
            templateUrl: 'partial/home/home.html',
            controller: 'HomeCtrl'
        }
    });
    $stateProvider.state('app.projects', {
        url: '/projects',
        'main@': {
            templateUrl: 'partial/projects/projects.html',
            controller: 'ProjectsCtrl',
            resolve: {
                projects: function (projectService) {

                    return projectService.getList();

                }
            }
        }
    });
    $stateProvider.state('app.articles', {
        url: '/articles',
        'main@': {
            templateUrl: 'partial/articles/articles.html',
            controller: 'ArticlesCtrl',
            resolve: {

                articles: function (articleService) {

                    return articleService.getList();
                }
            }
        }

    });
    $stateProvider.state('app.account', {
        url: '/account',
        'main@': {

            templateUrl: 'partial/account/account.html',
            controller: 'AccountCtrl'

        }

    });
    $stateProvider.state('app.new-project', {
        url: '/new-project',
        'main@': {
            templateUrl: 'partial/new-project/new-project.html',
            controller: 'NewProjectCtrl'

        }
    });
    $stateProvider.state('app.edit-project', {
        url: '/edit-project/:id',
        'main@': {


            templateUrl: 'partial/edit-project/edit-project.html',
            controller: 'EditProjectCtrl',
            resolve:{

                project: function (projectService, $stateParams) {

                    return projectService.getOne($stateParams.id);
                }
            }

        }

    });
    $stateProvider.state('app.new-article', {
        url: '/new-article',
        'main@': {

            templateUrl: 'partial/new-article/new-article.html',
            controller: 'NewArticleCtrl'
        }
    });
    $stateProvider.state('app.edit-article', {
        url: '/edit-article/:id',
        'main@': {

            templateUrl: 'partial/edit-article/edit-article.html',
            controller: 'EditArticleCtrl',
            resolve: {

                article: function (articleService, $stateParams) {

                    return articleService.getOne($stateParams.id);
                }
            }

        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
