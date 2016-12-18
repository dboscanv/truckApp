(function () {
  "use strict";

  angular.module("truckApp.Clientes", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state("tab.clientes", {
        url:"/clientes",
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
