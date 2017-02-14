/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function (firebase) {
  'use strict';

  angular
    .module('truckApp.CustodioFinal.Cliente')
    .controller('tab_cliente', clienteCtrl);

  clienteCtrl.$inject = ['$firebaseArray', '$stateParams', '$ionicModal', '$scope', '$cordovaGeolocation', '$state', '$localStorage', '$timeout'];

  function clienteCtrl($firebaseArray, $stateParams, $ionicModal, $scope, $cordovaGeolocation, $state, $localStorage, $timeout) {
    var vm = this;
    const cliente = firebase.ref("cliente");
    vm.detalleCliente = detalleCliente;
    vm.cerrarModal = cerrarModal;
    vm.terminarVisita = terminarVisita;
    vm.open = open;
    vm.mapa = true;
    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBS0Q6D-kScENuk4-cHXrSuf-ekfV495NM";

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

    $ionicModal.fromTemplateUrl("app/tabs-custodio/custodio-cliente/modal/visita.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal2 = modal;
    });

    function terminarVisita(idcliente) {

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(success, error);

      function success(position) {
        console.log(position);

        visita.push({
          cantidad: vm.cantidad,
          observacion: vm.observacion,
          tipo: vm.tipo,
          cliente: idcliente,
          fecha_visita: moment().format("DD-MM-YYYY HH:mm A")
        }).then(actualizarCliente);

        function actualizarCliente() {

          cliente.child(idcliente).update({
            visitado: true,
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          });
        }
      }

      function error(err) {
        console.log(err)
      }

      $timeout(function () {
        var config = $localStorage.config;
        console.log(config)
        $state.go('tab_cliente', {idRuta: config.idRuta});
        vm.modal2.hide();
      }, 2000)
    }

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
      abrirModal(1);
      // $state.go('detalleCliente', {idCliente: cliente.idcliente});
      vm.cliente = cliente;
    }
  }
})(firebase.database());
