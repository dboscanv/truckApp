/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function () {
  angular.module('truckApp.CustodioFinal.Cliente', [])
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tab_cliente', {
        url: '/tab-cliente/:idRuta',
        parent: 'tab-custodio',
        views: {
          'tab_cliente': {
            templateUrl: 'app/tabs-custodio/custodio-cliente/tab-cliente.html',
            controller: 'tab_cliente',
            controllerAs: 'vm'
          }
        }
      })
      .state('tab_cliente.detalle', {
        url: '/detalle/:idCliente',
        parent: 'tab-custodio',
        views: {
          'tab_cliente': {
            templateUrl: 'app/tabs-custodio/custodio-cliente/modal/detalle_cliente.html',
            controller: 'detalle_cliente',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
