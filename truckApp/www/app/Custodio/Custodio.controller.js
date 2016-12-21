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
      custodio.child(vm.custodio.idempleado).set(vm.custodio);
      vm.modal.remove();
    }

    //eliminar custodio
    vm.eliminar = function (custodio) {
      console.log(custodio);
      vm.list.splice(vm.list.indexOf(custodio), 1);
    };

    //editar custodio
    vm.editar = function (custodio) {
      vm.modal2.show();
      vm.custodio = custodio;
    };


    vm.guardar = function (a) {
      vm.list.$save(a).then(function (s) {
        $ionicPopup.alert({
          title: "Actualizacion",
          template: "Custodio actualizado con exito"
        }).then(function (res) {
          console.log(res)
        });
        vm.modal2.hide();
      })
    };

    vm.mostrarBorrar = false;
    vm.mostrarBorrarVarios = function () {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }


  }
})();
