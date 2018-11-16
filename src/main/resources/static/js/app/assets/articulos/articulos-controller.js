(function(){
    angular.module('preachApp')
    .controller('articulosController',articulosController);

     articulosController.$inject = ['articulosService', '$scope'];

    function articulosController(articulosService, $scope){
       var self = this;
       	self.$scope = $scope;
        self.articulosService = articulosService;
        self.articulo={};
        self.users=[];
        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;
        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;
    }

    articulosController.prototype.submit = function() {
            console.log('Submitting');
            var self = this;
            if (self.articulo.id === undefined || self.articulo.id === null) {
                self.createUser(self.articulo);
            } else {
                updateUser(self.articulo, self.articulo.id);
            }
        }

    articulosController.prototype.createUser = function(articulo) {
            var self = this;
            self.articulosService.createUser(articulo)
                .then(
                    function (response) {
                        self.successMessage = 'Creado con Éxito';
                        self.errorMessage='';
                        self.done = true;
                        self.articulo={};
                        self.$scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        self.errorMessage = 'Error while creating User: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


    articulosController.prototype.updateUser = function(articulo, id){
            console.log('About to update articulo');
             var self = this;
            self.articulosService.updateUser(articulo, id)
                .then(
                    function (response){
                        console.log('User updated successfully');
                        self.successMessage='Actualizado con Éxito';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Error while updating User');
                        self.errorMessage='Ocurrio un error : '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


    articulosController.prototype.removeUser = function(id){
            console.log('About to remove User with id '+id);
             var self = this;
            self.articulosService.removeUser(id)
                .then(
                    function(){
                        console.log('User '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing user '+id +', Error :'+errResponse.data);
                    }
                );
        }


    articulosController.prototype.getAllUsers = function(){
         var self = this;
           return self.articulosService.getAllUsers();
        }

    articulosController.prototype.editUser = function(id) {
            var self = this;
            self.successMessage='';
            self.errorMessage='';
            self.articulosService.getUser(id).then(
                function (articulo) {
                    self.articulo = articulo;
                },
                function (errResponse) {
                    console.error('Error while removing user ' + id + ', Error :' + errResponse.data);
                }
            );
        }
    articulosController.prototype.reset = function(){
    		var self = this;
            self.successMessage='';
            self.errorMessage='';
            self.user={};
            self.$scope.myForm.$setPristine(); //reset Form
        }
})();

