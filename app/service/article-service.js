angular.module('app').factory('articleService',function($http) {

	var articleService = {

        model: {
            list: [],
            item: null
        },

        create: function (data) {

            var promise = $http.post('http://localhost:3010/article', data);

            return promise;

        },

        getOne: function (id) {

            var promise = $http.get('http://localhost:3010/article/'+id);

            promise.then(function (res) {

                console.log(res);

                //gremo po en article in ta article spravimo noter v: item
                articleService.model.list = res.data;

            });

            return promise;

        },

        getList: function () {

            var promise = $http.get('http://localhost:3010/articles');

            promise.then(function(res){

                articleService.model.list = res.data;

            });

            return promise;

        },

        delete: function (id) {

            var promise = $http.delete('http://localhost:3010/article/'+id);

            promise.then(function(res){

                angular.forEach(articleService.model.list, function(article, i){

                    if(article._id === id){
                        articleService.model.list.splice(i,1);
                    }
                });

                console.log(res);
            });

            return promise;
        },

        update: function (id, data) {

            var promise = $http.put('http://localhost:3010/article/'+id, data);

            promise.then(function(res){

               console.log(res);

            });

            return promise;


        }

    };

	return articleService;
});
