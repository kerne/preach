(function(){
    angular.module('preachApp',
        ['ui.router'
        ,'ngStorage'
        ,'ui.select'
        ,'checklist-model'
        ,'ngSanitize']);

})();

(function(){
    angular.module('preachApp').
    constant(
        'urls', {
            BASE_HERMANOS:  'http://localhost:9090/preach/hermanos',
            BASE_ARTICULOS: 'http://localhost:9090/preach/articulos',
            BASE_ASIGNACION: 'http://localhost:9090/preach/asignacion'
        });
})();


(function(){
    angular.module('preachApp')
    .config(configuracion);
    
    function configuracion($stateProvider, $urlRouterProvider){
	        $stateProvider
    	            .state('hermanos', {
    	                url: '/hermanos',
    	                data : { title: 'Home' },
    	                views :{
    	                	'menu' :{
    	            			
    	    	            	templateUrl : 'partials/menu'
    	            		},
    	                	'main' :{
    	                		templateUrl: 'partials/hermanos',
    	    	                controller:'HermanosController',
    	    	                controllerAs:'ctrl',
                                resolve: {
                                        hermanos: function ($q, UserService) {
                                            var deferred = $q.defer();
                                            UserService.loadAllUsers().then(deferred.resolve, deferred.resolve);
                                            return deferred.promise;
                                        }
                                    }
    	                	}
    	                }
    	              
    	           
    	            })
    	            .state('articulos', {
    	                views :{
    	                	'menu' :{
    	    	                templateUrl: 'partials/menu'
    	                	},
    	                	'main' :{
    	    	                templateUrl: 'partials/articulos',
    	                	    controller:  'articulosController',
    	    	                controllerAs:'ctrl',
    	    	                resolve: {
                                    articulo: function ($q, articulosService) {
                                        var deferred = $q.defer();
                                        articulosService.loadAll().then(deferred.resolve, deferred.resolve);
                                        return deferred.promise;
                                    }
                                }
    	                	}
    	                }
    	            }).state('lugares', {
    	                views :{
    	                	'menu' :{
    	    	                templateUrl: 'partials/menu'
    	                	},
    	                	'main' :{
    	    	                templateUrl: 'partials/lugares'
    	                	}
    	                }
    	            }).state('asignaciones', {
                        views :{
                            'menu' :{
                                templateUrl: 'partials/menu'
                            },
                            'main' :{
                                templateUrl: 'partials/asignaciones',
                                controller : 'asignacionesController',
                                controllerAs : 'ctrl'
                    }
                        }
                    });
            $urlRouterProvider.otherwise('/');
    }
})();

(function(){
    angular.module('preachApp').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
    
})();
