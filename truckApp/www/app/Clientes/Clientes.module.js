(function () {
  "use strict";

  angular.module("truckApp.Clientes", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state("tab.clientes", {
        url:"/clientes",
        resolve: {
          'checkAuth': ['comunFactory', function (comunFactory) {
            return comunFactory.$requireSignIn();
          }]
        },
        views: {
          "tab-clientes":{
            templateUrl:"app/Clientes/clientes.html",
            controller: "ClientesCtrl",
            controllerAs: "vm"
          }
        }
      })

  }
})();
