(function () {
  "use strict";

  angular.module("truckApp.Ruta", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
  $stateProvider
    .state("tab.ruta", {
      url:"/ruta",
      views:{
        "tab-ruta": {
          templateUrl: "app/Ruta/ruta.html",
          controller: "RutaCtrl",
          controllerAs: "vm"
        }
      }
    });
  }
})();
