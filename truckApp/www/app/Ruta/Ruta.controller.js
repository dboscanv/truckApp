(function () {
  "use strict";

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup'];

  function RutaCtrl($firebaseObject, $firebaseArray, $scope, $ionicModal) {
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

    vm.abrirModal = function () {
      vm.modal.show()
    };

    //crear ruta
    vm.registrarRuta = function () {
      ruta.child(vm.ruta.idruta).set(vm.ruta);
      vm.modal.remove();
    }
  }
})();
