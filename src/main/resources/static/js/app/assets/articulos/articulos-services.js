(function(){
    angular.module('MainApp')
    .factory('articulosService',articulosService);
    
    articulosService.$inject = ['$localStorage', '$http', '$q' ,'urls'];
    
    function articulosService($localStorage, $http, $q, urls) {

            var factory = {
            	loadAll: loadAll,
                getAllUsers: getAllUsers,
                getUser: getUser,
                createUser: createUser,
                updateUser: updateUser,
                removeUser: removeUser
            };

            return factory;

            function loadAll() {
                console.log('Fetching all users');
                var deferred = $q.defer();
                $http.get(urls.BASE_ARTICULOS + '/find-all')
                    .then(
                        function (response) {
                            console.log('Fetched successfully all users');
                            $localStorage.articulos = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading users');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllUsers(){
                return $localStorage.articulos;
            }

            function getUser(id) {
                console.log('Fetching User with id :'+id);
                var deferred = $q.defer();
                $http.get(urls.BASE_ARTICULOS +'/find-id/' + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully User with id :'+id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading user with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createUser(hermano) {
                console.log('Creating User');
                var deferred = $q.defer();
                $http.post(urls.BASE_ARTICULOS+'/create', hermano)
                    .then(
                        function (response) {
                        	loadAll();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Error while creating User : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateUser(user, id) {
                console.log('Updating User with id '+id);
                var deferred = $q.defer();
                $http.put(urls.BASE_ARTICULOS + id, user)
                    .then(
                        function (response) {
                        	loadAll();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating User with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeUser(id) {
                console.log('Removing User with id '+id);
                var deferred = $q.defer();
                $http.delete(urls.BASE_ARTICULOS +'/remove/' + id)
                    .then(
                        function (response) {
                        	loadAll();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing User with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
})();
