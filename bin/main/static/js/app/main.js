(function(){
	 angular.module('MainApp',
        ['ui.router'
        ,'ngStorage'
        ,'preachApp'
        ,'multipleDatePicker'
        ]);
})();


(function(){
    angular.module('MainApp')
    .config(configuracion);
    
    function configuracion($stateProvider, $urlRouterProvider){
	        $stateProvider
    	            .state('root', {
    	            	url : '/',
    	            	views : {
    	            		'menu' :{
    	            			
    	    	            	templateUrl : 'partials/menu'
    	            		}
    	            	}
    	            });
            $urlRouterProvider.otherwise('/');
    }
})();
