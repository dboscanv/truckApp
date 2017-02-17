/**
 * Created by eldelasfranelas on 16/02/2017.
 */
(function (firebase) {
  'use strict';

  angular
    .module('truckApp.CustodioFinal.Cliente')
    .controller('detalle_cliente', detalle_cliente);

  detalle_cliente.$inject = ['$stateParams', '$firebaseArray', '$cordovaGeolocation', '$localStorage', '$timeout', '$ionicModal', '$scope', '$state'];

  /* @ngInject */
  function detalle_cliente($stateParams, $firebaseArray, $cordovaGeolocation, $localStorage, $timeout, $ionicModal, $scope, $state) {
    var vm = this;
    vm.title = 'detalle_cliente';
    vm.mapa = true;
    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBS0Q6D-kScENuk4-cHXrSuf-ekfV495NM";
    vm.terminarVisita = terminarVisita;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;

    const visita = firebase.ref('visita');
    const cliente = firebase.ref("cliente");

    $ionicModal.fromTemplateUrl("app/tabs-custodio/custodio-cliente/modal/visita.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal2 = modal;
    });

    function abrirModal() {
      vm.modal2.show();
    }

    function cerrarModal() {
      vm.modal2.hide();
    }


    // var q = cliente.orderByChild('idcliente').equalTo($stateParams.idCliente);
    firebase.ref("cliente/" + $stateParams.idCliente).once('value', function (snap) {
      // console.log(snap.val())
      vm.cliente = snap.val();
    });
    // console.log(q)
    // vm.cliente = $firebaseArray(q);
    // console.log(vm.cliente);

    function terminarVisita(cliente) {

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
          cliente: cliente.idcliente,
          nombre: cliente.nombre,
          direccion: cliente.direccion,
          fecha_visita: moment().format("DD-MM-YYYY HH:mm A"),
          idrecorrido: $localStorage.config.recorrido
        }).then(actualizarCliente);

        function actualizarCliente() {

          cliente.child(cliente.idcliente).update({
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
        $state.go('tab_cliente', {idRuta: config.idRuta});
        vm.modal2.hide();
      }, 2000)
    }
  }

})(firebase.database());

