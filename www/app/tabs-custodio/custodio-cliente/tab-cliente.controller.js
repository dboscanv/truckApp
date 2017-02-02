/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function (firebase) {
  'use strict';

  angular
    .module('truckApp.CustodioFinal.Cliente')
    .controller('tab_cliente', clienteCtrl);

  clienteCtrl.$inject = ['$firebaseArray', '$stateParams', '$ionicModal', '$scope', '$cordovaGeolocation'];

  function clienteCtrl($firebaseArray, $stateParams, $ionicModal, $scope, $cordovaGeolocation) {
    var vm = this;
    const cliente = firebase.ref("cliente");
    vm.detalleCliente = detalleCliente;
    vm.cerrarModal = cerrarModal;
    vm.terminarVisita = terminarVisita;
    vm.open = open;

    var q = cliente.orderByChild('ruta').equalTo($stateParams.idRuta);
    const visita = firebase.ref('visita');

    vm.clientes = $firebaseArray(q);

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

      visita.push({
        cantidad: vm.cantidad,
        observacion: vm.observacion,
        tipo: vm.tipo,
        cliente: idcliente,
        fecha_visita: moment().format("DD-MM-YYYY HH:mm A")
      });

      cliente.child(idcliente).update({
        visitado: true
      });

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          console.log(position)
        }, function (err) {
          console.log(err)
        });
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
      vm.cliente = cliente;
    }

    vm.mapa = true;

  }
})(firebase.database());
