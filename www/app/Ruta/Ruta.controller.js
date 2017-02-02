(function () {
  "use strict";

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup', 'checkAuth'];

  function RutaCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal, checkAuth) {
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
      vm.modal2.show();
    }

    //ng-repeat
    vm.list = $firebaseArray(ruta);

    //modal para crear ruta
    $ionicModal.fromTemplateUrl('app/Ruta/modales/crearRuta.html', function ($ionicModal) {
      id: 1,
        vm.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    });

    //modal para editar ruta
    $ionicModal.fromTemplateUrl('app/Ruta/modales/editarRuta.html', function ($ionicModal) {
      id:2,
        vm.modal2 = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
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
        vm.modal2.hide();
      }
    }

    //crear ruta
    function registrarRuta() {
      if (vm.list.$getRecord(vm.ruta.idruta) != null) {
        return console.log("Nro de ruta ya esta registrado")
      }
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
      abrirModal(2);
      vm.ruta = ruta;
    }

    function guardar(obj) {
      vm.list.$save(obj).then(function (success) {
        vm.modal2.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Info',
          template: 'Custodio Actualizado con exito.'
        });

        alertPopup.then(function (res) {
          $ionicListDelegate.$getByHandle("rutaHandle").closeOptionButtons();
        });
      })
    }

    vm.mostrarBorrar = false;
    function mostrarBorrarVarios() {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }
  }
})
();
