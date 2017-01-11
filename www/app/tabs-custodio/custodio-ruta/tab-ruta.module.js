/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function () {
  angular.module('truckApp.CustodioFinal.Ruta', [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tab_ruta', {
        url: '/tab-ruta',
        parent: 'tab-custodio',
        templateUrl: 'app/tabs-custodio/custodio-ruta/tab-ruta.html',
        controller: 'tab_ruta',
        controllerAs: 'vm'
      });
  }
})();
