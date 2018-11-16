(function(){
    angular.module('preachApp')
    .controller('HermanosController',HermanosController);

     HermanosController.$inject = ['UserService', '$scope'];

    function HermanosController(UserService, $scope){
       var self = this;
       	self.$scope = $scope;
        self.UserService = UserService;
        self.hermano = {};
        self.users=[];
        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;
       
    }

    HermanosController.prototype.submit = function() {
            console.log('Submitting');
            var self = this;
            if (self.hermano.idHermano === undefined || self.hermano.idHermano === null) {
                self.createUser(self.hermano);
            } else {
                self.updateUser(self.hermano, self.hermano);
            }
        }

    HermanosController.prototype.createUser = function(hermano) {
            var self = this;
            self.UserService.createUser(hermano)
                .then(
                    function (response) {
                        self.successMessage = 'Creado con Éxito';
                        self.errorMessage='';
                        self.done = true;
                        self.hermano={};
                        self.$scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        self.errorMessage = 'Error while creating User: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


    HermanosController.prototype.updateUser = function(hermano){
            console.log('About to update hermano');
             var self = this;
            self.UserService.updateUser(hermano)
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


    HermanosController.prototype.removeUser = function(id){
            console.log('About to remove User with id '+id);
             var self = this;
            self.UserService.removeUser(id)
                .then(
                    function(){
                        console.log('User '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing user '+id +', Error :'+errResponse.data);
                    }
                );
        }


    HermanosController.prototype.getAllUsers = function(){
         var self = this;
           return self.UserService.getAllUsers();
        }

    HermanosController.prototype.editUser = function(id) {
            var self = this;
            self.successMessage='';
            self.errorMessage='';
            self.UserService.getUser(id).then(
                function (hermano) {
                    self.hermano = hermano.datos;
                },
                function (errResponse) {
                    console.error('Error while removing user ' + id + ', Error :' + errResponse.data);
                }
            );
        }
    HermanosController.prototype.reset = function(){
    		var self = this;
            self.successMessage='';
            self.errorMessage='';
            self.user={};
            self.$scope.myForm.$setPristine(); //reset Form
        }
})();

