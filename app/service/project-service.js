angular.module('app').factory('projectService',function($http) {

	var projectService = {

        create: function (data) {

            var promise = $http.post('http://localhost:3010/project', data);

            return promise;

        },
        getOne: function () {

        },
        getList: function () {

        },
        delete: function () {

        },
        update: function () {

        }

    };

	return projectService;
});
