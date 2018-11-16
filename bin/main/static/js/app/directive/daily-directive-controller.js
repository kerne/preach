(function() {
	angular.module('preachApp').controller('dailyController', dailyController);

	dailyController.$inject = [ '$scope' ];

	function dailyController($scope) {
		var vm = this;
		vm.$scope = $scope;
		vm.asignaciones = vm.$scope.asignados;
		vm.articulos = vm.$scope.articulos;
		vm.moment = moment();
		vm.moment.locale('es');
		vm.schedule = vm.getDaysArrayByMonth();
		vm.listTurnos = [ {
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
		
		vm.groupBrother(vm.asignaciones);
	}

	dailyController.prototype.groupBrother = function(asignaciones) {
		var vm = this;
		vm.programa = {
			'fecha' : {}
		};

		_.map(asignaciones, 'fechas').forEach(function(fecha) {
			fecha.forEach(function(d) {
				if (!vm.programa.fecha[vm.changeFormat(d)]) {
					vm.programa.fecha[vm.changeFormat(d)] = {
						'turno' : {}
					};
				}
			});
		});
		var fechasPrograma = _
				.chain(asignaciones)
				.groupBy("fechas")
				.toPairsIn()
				.map(
						function(currentItem) {
							var items = [ _.split(currentItem[0], ','),
									currentItem[1] ];
							return _.zipObject([ "fechas", "hermanos" ], items);
						}).value();

		fechasPrograma.forEach(function(data) {
			data.fechas.forEach(function(fecha) {
				var p = vm.programa.fecha[vm.changeFormat(fecha)];
				if (p) {
					data.hermanos.forEach(function(h) {
						h.turnosSelected.forEach(function(t) {
							if (!p.turno[t.rango]) {
								p.turno[t.rango] = {
									'hermano' : []
								};
								p.turno[t.rango].hermano.push(h.asignado);
							} else {
								p.turno[t.rango].hermano.push(h.asignado);
							}
						});
					});
				}
			});
		});
		
		vm.listTurnos.forEach(function(turno){
			vm.schedule.forEach(function(fecha){
				if(vm.programa.fecha[fecha] && vm.programa.fecha[fecha].turno[turno.rango]){
					var h = vm.programa.fecha[fecha].turno[turno.rango];
					h.parejas = {};
					h.parejas = vm.randList(h.hermano);
					
				}
			});
		});
		console.log(vm.programa);
	}
	
	dailyController.prototype.randList = function(data){
		var vm = this;
		let largo = data.length;
	    let randomListM = [];
	    let randomListF = [];
	      while(largo--){
	      let persona = [Math.floor(Math.random()* (largo + 1))];
	      	if(data[persona].sexo === 'M' && !_.some(randomListM,data[persona])){
	           randomListM.push(data[persona]);
	        }else if(data[persona].sexo === 'F' && !_.some(randomListF,data[persona])){
	           randomListF.push(data[persona]);
	        }
	      
	        data.splice(persona,1);
	      }
	      var listFinal = [];
	      
	      return [..._.chunk(randomListM,2),..._.chunk(randomListF,2)];
	}

	dailyController.prototype.getFechas = function(fechas) {
		var vm = this;
		return _.filter(fechas, function(fecha) {
			return fecha;
		});
	}

	dailyController.prototype.changeFormat = function(date) {
		var vm = this;
		return moment(date).format('DD/MM/YYYY');
	}

	dailyController.prototype.getDaysArrayByMonth = function() {
		var vm = this;
		var daysInMonth = vm.moment.daysInMonth();
		var arrDays = [];

		while (daysInMonth) {
			var current = vm.moment.date(daysInMonth).format("DD/MM/YYYY");
			arrDays.push(current);
			daysInMonth--;
		}

		return _.reverse(arrDays);
	}

})();