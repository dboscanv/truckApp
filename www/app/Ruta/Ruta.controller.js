(function () {

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$ionicPopup', 'checkAuth', '$rootScope'];

  function RutaCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal, checkAuth, $rootScope) {
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
        vm.ruta = {};

      } else {
        vm.modal2.hide();
        vm.ruta = {};

      }
    }

    //crear ruta
    function registrarRuta() {
      $rootScope.$broadcast('loading:show');
      if (vm.list.$getRecord(vm.ruta.idruta) != null) {
        $rootScope.$broadcast('loading:hide');
        return alert("Nro de ruta ya esta registrado")
      }
      ruta.child(vm.ruta.idruta).set(vm.ruta);
      vm.modal.hide();
    }

    //eliminar ruta
    function eliminar(ruta) {
      $rootScope.$broadcast('loading:show');
      vm.list.$remove(ruta).then(function (s) {
        console.log(s)
        $rootScope.$broadcast('loading:hide');
      });
    }

    function editar(ruta) {
      abrirModal(2);
      vm.ruta = ruta;
    }

    function guardar(obj) {
      $rootScope.$broadcast('loading:show');
      vm.list.$save(obj).then(function (success) {
        vm.modal2.hide();
        alert("Ruta editada con exito");
        $rootScope.$broadcast('loading:hide');
      })
    }

    vm.mostrarBorrar = false;
    function mostrarBorrarVarios() {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }
  }
})
();
