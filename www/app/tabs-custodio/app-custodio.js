/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function () {
  angular.module('truckApp.CustodioFinal',
    ['truckApp.CustodioFinal.Ruta',
      'truckApp.CustodioFinal.Cliente',
      'ngMap'
    ])
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab-custodio', {
        url: '/tab-custodio',
        abstract: true,
        templateUrl: 'app/tabs-custodio/tab-custodio.html'
      });
    $urlRouterProvider.otherwise('/tab-custodio');

  }
})();
