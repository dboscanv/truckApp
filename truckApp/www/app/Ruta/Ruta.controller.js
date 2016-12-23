(function () {
  "use strict";

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup'];

  function RutaCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal) {
    var vm = this;
    vm.ruta = {};
    const ruta = firebase.database().ref('ruta');
    vm.registrarRuta = registrarRuta;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrarRuta = registrarRuta;
    vm.eliminar = eliminar;
    vm.editar = editar;
    vm.guardar = guardar;
    vm.mostrarBorrarVarios = mostrarBorrarVarios;
    vm.juan = function () {
      vm.modal.hide();
    }

    //ng-repeat
    vm.list = $firebaseArray(ruta);

    //modal para crear ruta
    $ionicModal.fromTemplateUrl('ruta', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal = modal;
    });

    //modal para editar ruta
    $ionicModal.fromTemplateUrl('editarRuta', {
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
        vm.modal.show();
      } else {
        vm.modal2.show();
      }
    }

    //crear ruta
    function registrarRuta() {
      ruta.child(vm.ruta.idruta).set(vm.ruta);
      vm.modal.hide();
    }

    //eliminar ruta
    function eliminar(ruta) {
      vm.list.$remove(ruta).then(function (s) {
        console.log(s)
      });
    }

    function editar(ruta) {
      vm.modal2.show();
      vm.ruta = ruta;
    }

    function guardar(obj) {
      vm.list.$save(obj).then(function (success) {
        vm.modal2.hide();
        vm.crearPops("Actualizacion", "Ruta actualizada con exito")
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
})
();
