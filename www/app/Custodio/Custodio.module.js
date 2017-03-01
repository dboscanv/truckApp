(function () {

  angular.module("truckApp.Custodio", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state("tab.custodio", {
        url: "/custodios",
        resolve: {
          'checkAuth': ['comunFactory', function (comunFactory) {
            return comunFactory.$requireSignIn();
          }]
        },
        views: {
          "tab-custodio": {
            templateUrl: "app/Custodio/custodio.html",
            controller: "CustodioCtrl",
            controllerAs: "vm"
          }
        }
      })
  }
})();
