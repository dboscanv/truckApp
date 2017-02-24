/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function (firebase) {

  angular
    .module('truckApp.CustodioFinal.Cliente')
    .controller('tab_cliente', clienteCtrl);

  clienteCtrl.$inject = ['$firebaseArray', '$stateParams', '$ionicModal', '$scope', '$cordovaGeolocation', '$state', '$localStorage', '$timeout', '$rootScope'];

  function clienteCtrl($firebaseArray, $stateParams, $ionicModal, $scope, $cordovaGeolocation, $state, $localStorage, $timeout, $rootScope) {
    var vm = this;
    const cliente = firebase.ref("cliente");
    vm.detalleCliente = detalleCliente;
    vm.cerrarModal = cerrarModal;
    vm.abrirModal = abrirModal;


    var q = cliente.orderByChild('ruta').equalTo($stateParams.idRuta);
    const visita = firebase.ref('visita');

    vm.clientes = $firebaseArray(q);
    console.log(vm.clientes)

    //Load modal's
    $ionicModal.fromTemplateUrl("app/tabs-custodio/custodio-cliente/modal/detalle_cliente.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal1 = modal;
    });


    function abrirModal(indice) {
      (indice == 1) ? vm.modal1.show() : cerrarModalifOpen();
    }

    function cerrarModal(indice) {
      (indice == 1) ? vm.modal1.hide() : vm.modal2.hide();
    }

    function open() {
      vm.modal1.hide();
      vm.modal2.show();
    }

    function cerrarModalifOpen() {
      vm.modal1.hide();
      vm.modal2.show();
    }

    function detalleCliente(cliente) {
      // abrirModal(1);
      $state.go('tab_cliente.detalle', {idCliente: cliente.idcliente});
      // vm.cliente = cliente;
    }
  }
})(firebase.database());
