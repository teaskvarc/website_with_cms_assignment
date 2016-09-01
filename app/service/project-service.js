angular.module('app').factory('projectService',function(
    $http,
    NET

) {

	var projectService = {

        model:{
            list:[],
            item:null
        },

        create: function (data) {

            var promise = $http.post(NET.API_URL+'/api/project', data);

            return promise;

        },
        getOne: function (id) {

            var promise = $http.get(NET.API_URL+'/api/project/'+id);

            //to pride nazaj iz streznika
            promise.then(function (res) {

                console.log(res);
                //gremo po en projekt in ta en projekt spravimo noter v: item
                projectService.model.item = res.data;

            });

            return promise;

        },
        getList: function () {

            var promise = $http.get(NET.API_URL+'/api/projects');

            //tukaj napolnimo model.list
            promise.then(function (res) {

                //podatki, ki pridejo nazaj (array nasih projektov) je v res.data!!
                //karkoli posljemo iz API-ija: res.send prejmemo v APP-u kot res.data!
                projectService.model.list = res.data;
            });

            return promise;

        },
        delete: function (id) {

            var promise = $http.delete(NET.API_URL+'/api/project/'+id);

            promise.then(function (res) {

                //tako iz array-a vzamemo vrednost ven
                angular.forEach(projectService.model.list, function (project, i) {

                    if(project._id === id){
                        projectService.model.list.splice(i, 1);
                    }
                });
                console.log(res);
            });

            return promise;
        },

        update: function (id, data) {

            var promise = $http.put(NET.API_URL+'/api/project/'+id, data);

            promise.then(function (res) {

                console.log(res);

            });

                return promise;
        }

    };

	return projectService;
});
