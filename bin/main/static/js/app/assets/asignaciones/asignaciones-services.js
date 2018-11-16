(function(){
    angular.module('MainApp')
    .factory('AsignadoService',AsignadoService);
    
    AsignadoService.$inject = ['$localStorage', '$http', '$q', 'urls'];
    
    function AsignadoService($localStorage, $http, $q, urls) {

            var factory = {
                loadAsignaciones: loadAsignaciones,
                getAllUsers: getAllUsers,
                getUser: getUser,
                createAsignado: createAsignado,
                updateAsignacion: updateAsignacion,
                removeUser: removeUser
            };

            return factory;

            function loadAsignaciones(id) {
                console.log('Fetching all users');
                var deferred = $q.defer();
                $http.get(urls.BASE_ASIGNACION + '/find-all/' + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully all users');
                            $localStorage.users = response.data;
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
                return $localStorage.users;
            }

            function getUser(id) {
                console.log('Fetching User with id :'+id);
                var deferred = $q.defer();
                $http.get(urls.BASE_ASIGNACION +'/find-id/' + id)
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

            function createAsignado(hermano) {
                var deferred = $q.defer();
                $http.post(urls.BASE_ASIGNACION+'/create', hermano)
                    .then(
                        function (response) {
                            //loadAsignaciones();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Error while creating User : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateAsignacion(asignacion) {
          
                var deferred = $q.defer();
                $http.put(urls.BASE_ASIGNACION + '/update', asignacion)
                    .then(
                        function (response) {
                            loadAsignaciones(response.data.mes);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeUser(id) {
                console.log('Removing User with id '+id);
                var deferred = $q.defer();
                $http.delete(urls.BASE_ASIGNACION +'/remove/' + id)
                    .then(
                        function (response) {
                            loadAsignaciones();
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
