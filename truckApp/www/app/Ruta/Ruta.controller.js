(function () {
  "use strict";

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup'];

  function RutaCtrl($firebaseObject,$scope, $firebaseArray, $ionicModal) {
    var vm = this;
    vm.ruta = {};
    const ruta = firebase.database().ref('ruta');

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
    // $ionicModal.fromTemplateUrl('editarRuta', {
    //   id: 2,
    //   scope: $scope,
    //   animation: 'slide-in-up',
    //   backdropClickToClose: true,
    //   hardwareBackButtonClose: true
    // }).then(function (modal) {
    //   vm.modal2 = modal;
    // });


    vm.abrirModal = function (a) {
      if (a === 1) {
        vm.modal.show();
      } else {
        vm.modal2.show();
      }
    };

    //crear ruta
    vm.registrarRuta = function () {
      ruta.child(vm.ruta.idruta).set(vm.ruta);
      vm.modal.hide();
    }


  }
})();
