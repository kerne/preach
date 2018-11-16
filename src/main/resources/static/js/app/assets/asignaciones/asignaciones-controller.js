(function() {
	angular.module('preachApp').controller('asignacionesController',
			asignacionesController);

	asignacionesController.$inject = [ 'UserService', 'articulosService',
			'AsignadoService', '$scope' ];

	function asignacionesController(UserService, articulosService,
			AsignadoService, $scope) {
		var self = this;
		self.$scope = $scope;
		self.today = moment();
		self.UserService = UserService;
		self.AsignadoService = AsignadoService;
		articulosService.loadAll().then(function(response) {
			self.articulos = response.data;
		});
		self.hermano = {};
		self.users = [];
		self.successMessage = '';
		self.errorMessage = '';
		self.done = false;
		self.UserService.loadAllUsers().then(function(response) {
			self.hermanos = response.data;
		});
		self.asignados = [];
		self.currentMonth = moment(self.today).format('MMYYYY');
		self.AsignadoService.loadAsignaciones(self.currentMonth).then(
				function(response) {
					if (response.status === 200) {
						self.asignados = response.data;
					}
				});

		self.listTurnos = [ {
			'id' : 1,
			'rango' : '08:00-10:00',
			'selected' : false
		}, {
			'id' : 2,
			'rango' : '10:00-12:00',
			'selected' : false
		}, {
			'id' : 3,
			'rango' : '12:00-14:00',
			'selected' : false
		} ];
	}

	asignacionesController.prototype.monthChanged = function(newMonth, oldMonth) {
		var self = this;
		self.$parent.ctrl.asignados = null;
		self.$parent.ctrl.currentMonth = moment(newMonth).format('MMYYYY');
		self.$parent.ctrl.AsignadoService.loadAsignaciones(
				self.$parent.ctrl.currentMonth).then(function(response) {
			if (response.status === 200 && response.data.asignaciones.length) {
				self.$parent.ctrl.asignados = response.data;
			}else{
				self.$parent.ctrl.asignados = { 'asignaciones':[]};
			}
		});
	}

	asignacionesController.prototype.add = function() {
		var self = this;
		self.asignados.asignaciones.push(self.hermano);
		self.hermano = {};
		self.hermano.fechas = [];
	}
	asignacionesController.prototype.checkSelected = function(turno, check) {
		turno.selected = check;
	}

	asignacionesController.prototype.grabar = function() {
		var self = this;
		var data = {
			'asignaciones' : self.asignados.asignaciones,
			'mes' : self.currentMonth
		};
		self.asignados.asignaciones = [];
		self.AsignadoService.createAsignado(data).then(function(response) {
			self.asignados = response;
		});
	}
	asignacionesController.prototype.actualizar = function() {
		var self = this;
		var data = {
			'asignaciones' : self.asignados.asignaciones,
			'mes' : self.asignados.mes,
			'idAsignacion' : 	self.asignados.idAsignacion
		};
		self.asignados.asignaciones = [];
		self.AsignadoService.updateAsignacion(data).then(function(response) {
			self.asignados = response;
		});
	}

	asignacionesController.prototype.changeFormat = function(date) {
		return moment(date).format('DD/MM/YYYY');
	}

	asignacionesController.prototype.createUser = function(hermano) {
		var self = this;
		self.UserService.createUser(hermano).then(
				function(response) {
					self.successMessage = 'Creado con Éxito';
					self.errorMessage = '';
					self.done = true;
					self.hermano = {};
					self.$scope.myForm.$setPristine();
				},
				function(errResponse) {
					console.error('Error while creating User');
					self.errorMessage = 'Error while creating User: '
							+ errResponse.data.errorMessage;
					self.successMessage = '';
				});
	}

	asignacionesController.prototype.updateUser = function(hermano, id) {
		console.log('About to update hermano');
		var self = this;
		self.UserService.updateUser(hermano, id).then(function(response) {
			console.log('User updated successfully');
			self.successMessage = 'Actualizado con Éxito';
			self.errorMessage = '';
			self.done = true;
			$scope.myForm.$setPristine();
		}, function(errResponse) {
			console.error('Error while updating User');
			self.errorMessage = 'Ocurrio un error : ' + errResponse.data;
			self.successMessage = '';
		});
	}

	asignacionesController.prototype.removeUser = function(id) {
		console.log('About to remove User with id ' + id);
		var self = this;
		self.UserService.removeUser(id).then(
				function() {
					console.log('User ' + id + ' removed successfully');
				},
				function(errResponse) {
					console.error('Error while removing user ' + id
							+ ', Error :' + errResponse.data);
				});
	}

	asignacionesController.prototype.getAllUsers = function() {
		var self = this;
		return self.UserService.getAllUsers();
	}

	asignacionesController.prototype.editUser = function(id) {
		var self = this;
		self.successMessage = '';
		self.errorMessage = '';
		self.UserService.getUser(id).then(
				function(hermano) {
					self.hermano = hermano.datos;
				},
				function(errResponse) {
					console.error('Error while removing user ' + id
							+ ', Error :' + errResponse.data);
				});
	}
	asignacionesController.prototype.reset = function() {
		var self = this;
		self.successMessage = '';
		self.errorMessage = '';
		self.user = {};
		self.$scope.myForm.$setPristine(); // reset Form
	}
})();
