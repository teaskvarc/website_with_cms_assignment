angular.module('app', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ngAnimate',
    'ngFileUpload',
    'ui.tinymce',
    'ngLodash',
    'LocalForageModule',
    'ngSanitize'

]);

angular.module('app').constant('NET',{API_URL:'http://localhost:3010'});

angular.module('app').config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    // na ta state ne moremo navigirati, nima URL, top state
    $stateProvider.state('app', {
        abstract:true,
        views:{
            sidebar:{
                templateURL:'partial/sidebar/sidebar.html',
                controller:'SidebarCtrl'
            }
        }
    });

    $stateProvider.state('app.home', {
        url: '/home',
        views: {
            'main@': {
                templateUrl: 'partial/home/home.html',
                controller: 'HomeCtrl'
            }
        }
    });
    $stateProvider.state('app.projects', {
        url: '/projects',
        views:{
            'main@': {
                templateUrl: 'partial/projects/projects.html',
                controller: 'ProjectsCtrl',
                resolve: {
                    projects: function (projectService) {

                        return projectService.getList();

                    }
                }
            }
        }
    });
    $stateProvider.state('app.articles', {
        url: '/articles',
        views:{
            'main@': {
                templateUrl: 'partial/articles/articles.html',
                controller: 'ArticlesCtrl',
                resolve: {

                    articles: function (articleService) {

                        return articleService.getList();
                    }
                }
            }
        }
    });
    $stateProvider.state('app.account', {
        url: '/account',
        views: {
            'main@': {
                templateUrl: 'partial/account/account.html',
                controller: 'AccountCtrl'

            }
        }
    });
    $stateProvider.state('app.new-project', {
        url: '/new-project',
        views:{
            'main@': {
                templateUrl: 'partial/new-project/new-project.html',
                controller: 'NewProjectCtrl'
            }
        }

    });
    $stateProvider.state('app.edit-project', {
        url: '/edit-project/:id',
        views:{
            'main@': {

                templateUrl: 'partial/edit-project/edit-project.html',
                controller: 'EditProjectCtrl',
                resolve:{

                    project: function (projectService, $stateParams) {

                        return projectService.getOne($stateParams.id);
                    }
                }

            }
        }
    });
    $stateProvider.state('app.new-article', {
        url: '/new-article',
        views:{
            'main@': {

                templateUrl: 'partial/new-article/new-article.html',
                controller: 'NewArticleCtrl'
            }
        }
    });
    $stateProvider.state('app.edit-article', {
        url: '/edit-article/:id',
        views:{
            'main@': {

                templateUrl: 'partial/edit-article/edit-article.html',
                controller: 'EditArticleCtrl',
                resolve: {

                    article: function (articleService, $stateParams) {

                        return articleService.getOne($stateParams.id);
                    }
                }
            }
        }

    });

    $stateProvider.state('login', {
        url: '/login',
        views:{
            cover:{
                templateUrl:'partial/login/login.html',
                controller:'LoginCtrl'
            }
        }
    });


    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push('requestInterceptorService');

});

angular.module('app').run(function($rootScope, dataService) {

    $rootScope.hasPermission = function(path, method){

        var allow = false;

        angular.forEach(dataService.model.userPermissions, function (permission){

            if(permission.path === path && _.includes(permission.methods, method)){

                allow = true;

            }
        });

        return allow;

    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){

        console.log(toState);

        switch(toState.name){
            case 'login':
                $rootScope.isCoverView = true;
                break;
            case 'register':
                $rootScope.isCoverView = true;
                break;
            case 'confirm-registration':
                $rootScope.isCoverView = true;
                break;
            case 'forgotten':
                $rootScope.isCoverView = true;
                break;
            case 'reset':
                $rootScope.isCoverView = true;
                break;
            default:
                $rootScope.isCoverView = false;
                break;
        }

    });

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
