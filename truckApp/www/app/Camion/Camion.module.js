(function () {
  "use strict";

  angular.module("truckApp.Camion", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state("tab.Camion", {
      url: "/camion",
      views: {
        "tab-camion": {
          templateUrl: "app/Camion/camion.html",
          controller: "CamionCtrl",
          controllerAs: "vm"
        }
      }
    });
  }
})();
