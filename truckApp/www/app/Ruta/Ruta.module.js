(function () {
  "use strict";

  angular.module("truckApp.Ruta", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state("tab.ruta", {
        url: "/ruta",
        name:"ruta",
        login: true,
        views: {
          "tab-ruta": {
            templateUrl: "app/Ruta/ruta.html",
            controller: "RutaCtrl",
            controllerAs: "vm"
          }
        }
      });
  }
})();
