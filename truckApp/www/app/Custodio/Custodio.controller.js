(function () {
  "use strict";

  angular.module("truckApp.Custodio")
    .controller("CustodioCtrl", CustodioCtrl);

  CustodioCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup'];

  function CustodioCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal, $ionicPopup) {
    var vm = this;
    vm.custodio = {};

    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrarCustodio = registrarCustodio;
    vm.eliminar = eliminar;
    vm.editar = editar;
    vm.guardar = guardar;
    vm.mostrarBorrarVarios = mostrarBorrarVarios;
    vm.crearPops = crearPops;

    //referencia a la coleccion custodio
    const custodio = firebase.database().ref('custodio');

    //ng-repeat
    vm.list = $firebaseArray(custodio);

    //modal para crear custodio
    $ionicModal.fromTemplateUrl('custodioModal.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal = modal;
    });

    //modal para editar custodio
    $ionicModal.fromTemplateUrl('abcd', {
      id: 2,
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal2 = modal;
    });

    function abrirModal(a) {
      if (a === 1) {
        vm.modal.show();
      } else {
        vm.modal2.show();
      }
    }

    function cerrarModal(a) {
      if (a === 1) {
        vm.modal.hide();
      } else {
        vm.modal2.hide()
      }
    }

    //crear custodio
    function registrarCustodio() {
      custodio.child(vm.custodio.idempleado).set(vm.custodio);
      vm.modal.hide();
    }

    //eliminar custodio
    function eliminar(custodio) {
      console.log(custodio);
      vm.list.$remove(custodio).then(function (s) {
        console.log(s)
      });
    }

    //editar custodio
    function editar(custodio) {
      vm.modal2.show();
      vm.custodio = custodio;
    }

    function guardar(obj) {
      vm.list.$save(obj).then(function (success) {
        vm.modal2.remove();
        vm.crearPops("Actualizacion", "Custodio actualizado con exito")
      })
    }

    vm.mostrarBorrar = false;
    function mostrarBorrarVarios() {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }

    //popUps
    function crearPops(titulo, texto) {
      $ionicPopup.alert({
        title: titulo,
        template: texto
      });
    }

  }
})();
