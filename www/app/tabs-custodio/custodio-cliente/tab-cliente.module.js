/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function () {
  angular.module('truckApp.CustodioFinal.Cliente', [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tab_cliente', {
        url: '/tab-cliente',
        parent: 'tab-custodio',
        templateUrl: 'app/tabs-custodio/custodio-cliente/tab-cliente.html',
        controller: 'tab_cliente',
        controllerAs: 'vm'
      });
  }
})();
