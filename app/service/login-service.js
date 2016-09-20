angular.module('app').factory('loginService',function(

    $timeout,
    $rootScope,
    $http,
    dataService,
    $localForage,
    $state,
    NET

) {

	var loginService = {

        isLoggedIn: function () {

            return loginService.getToken()
                .then(function () {
                    return $http.post(NET.API_URL + '/api/account/checkLogin')
                        .then(function (res) {
                            console.log('checklogin');

                            dataService.model.loggedIn = true;
                            dataService.model.userPermissions = res.data;
                            $rootScope.isLoggedIn = true;
                            return res.data;
                        })
                        .catch(function (err) {
                            console.log('Error: ',err);
                            $state.go('login', null, {reload:true});
                        });
                });

        },

        login: function (userData) {

            return $http.post(NET.API_URL + '/api/account/login', userData)
                .then(function (res) {

                    $rootscope.isLoggedIn = true;
                    return loginService.setToken(res.data);

                })
                .catch(function (err) {

                    console.log(err);
                    return err;
                });
        },

        setToken: function (userData) {

            return $localForage.setItem('user', userData)
                .then(function (userData) {

                    dataService.model.user = userData;
                    return userData;
                });
        },

        getToken: function () {

            return $localForage.getItem('user')
                .then(function (userData) {
                    if(userData){
                        dataService.model.user = userData;
                        return userData;
                    }else{
                        return null;
                    }
                });
        },

        logout: function () {

            return $http.get(NET.API_URL + '/api/account/logout')
                .then(function () {
                    return $localForage.clear();
                });


        },

        forgotten: function (email) {

            return $http.post(NET.API_URL + '/api/account/forgotten', {email:email})
                .then(function (res) {

                    return res.data;
                });


        },

        confirmReset: function (key, password) {

            return $http.post(NET.API_URL + '/api/account/reset-password', {key:key, password:password})
                .then(function (res) {
                    return res.data;

                });

        }
    };

	return loginService;
});
