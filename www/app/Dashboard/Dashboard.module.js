(function () {

  angular.module("truckApp.Dashboard", [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tab.dash', {
        url: '/dash',
        resolve: {
          'checkAuth': ['comunFactory', function (comunFactory) {
            return comunFactory.$requireSignIn();
          }]
        },
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
