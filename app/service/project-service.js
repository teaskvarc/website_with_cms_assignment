angular.module('app').factory('projectService',function($http) {

	var projectService = {

        model:{
            list:[]
        },

        create: function (data) {

            var promise = $http.post('http://localhost:3010/project', data);

            return promise;

        },
        getOne: function () {

        },
        getList: function () {

            var promise = $http.get('http://localhost:3010/projects');

            //tukaj napolnimo model.list
            promise.then(function (res) {

                //podatki, ki pridejo nazaj (array nasih projektov) je v res.data!!
                //karkoli posljemo iz API-ija: res.send prejmemo v APP-u kot res.data!
                projectService.model.list = res.data;
            });

            return promise;

        },
        delete: function () {

        },
        update: function () {

        }

    };

	return projectService;
});
