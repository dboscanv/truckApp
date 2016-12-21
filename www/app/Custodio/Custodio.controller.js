(function () {
  "use strict";

  angular.module("truckApp.Custodio")
    .controller("CustodioCtrl", CustodioCtrl);

  CustodioCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup'];

  function CustodioCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal, $ionicPopup) {
    var vm = this;
    vm.custodio = {};

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

    vm.abrirModal = function (a) {
      if (a === 1) {
        vm.modal.show();
      } else {
        vm.modal2.show();
      }
    };
    vm.cerrarModal = function (a) {
      if (a === 1) {
        vm.modal.hide();
      } else {
        vm.modal2.hide()
      }
    };

    //crear custodio
    vm.registrarCustodio = function () {
      debugger;
      custodio.child(vm.custodio.idempleado).set(vm.custodio);
      vm.modal.remove();
    }

    //eliminar custodio
    vm.eliminar = function (custodio) {
      console.log(custodio);
      vm.list.$remove(custodio).then(function (s) {
        console.log(s)
      });
    };

    //editar custodio
    vm.editar = function (custodio) {
      vm.modal2.show();
      vm.custodio = custodio;
    };


    vm.guardar = function (obj) {
      vm.list.$save(obj).then(function (success) {
        vm.modal2.remove();
        vm.crearPops("ASDASD", "SSSSSS")
      })
    };

    vm.mostrarBorrar = false;
    vm.mostrarBorrarVarios = function () {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }

    //popUps
    vm.crearPops = function (titulo, texto) {
      $ionicPopup.alert({
        title: titulo,
        template: texto
      });
    }

  }
})();
