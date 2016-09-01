angular.module('app').factory('articleService',function(
    $http,
    NET
) {

	var articleService = {

        model: {
            list: [],
            item: null
        },

        create: function (data) {

            var promise = $http.post(NET.API_URL+'/api/article', data);

            return promise;

        },

        getOne: function (id) {

            var promise = $http.get(NET.API_URL+'/api/article/'+id);

            promise.then(function (res) {

                console.log(res);

                //gremo po en article in ta article spravimo noter v: item
                articleService.model.list = res.data;

            });

            return promise;

        },

        getList: function () {

            var promise = $http.get(NET.API_URL+'/api/articles');

            promise.then(function(res){

                articleService.model.list = res.data;

            });

            return promise;

        },

        delete: function (id) {

            var promise = $http.delete(NET.API_URL+'/api/article/'+id);

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

            var promise = $http.put(NET.API_URL+'/api/article/'+id, data);

            promise.then(function(res){

               console.log(res);

            });

            return promise;
        }

    };

	return articleService;
});
