(function(){
	 angular.module('preachApp')
	 .directive('daily', daily);

	 function daily(){

	 	return {
	 		restrict: 'EA',
	 		scope :{
	 			asignados : '=',
	 			articulos : '='
	 		},
	 		templateUrl: 'partials/daily.html',
	 		controller: 'dailyController',
	 		controllerAs: 'vm'
	 	}

	 }
})();
