(function () {
  "use strict";

  angular.module("truckApp.Dashboard", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'app/Dashboard/dashboard.html',
            controller: 'dashboardCtrl',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
