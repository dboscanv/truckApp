(function () {
  "use strict";

  angular.module("truckApp.Camion", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state("tab.Camion", {
        url: "/camion",
        resolve: {
          'checkAuth': ['comunFactory', function (comunFactory) {
            return comunFactory.$requireSignIn();
          }]
        },
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
