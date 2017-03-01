(function () {

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray', '$ionicModal', '$rootScope', '$ionicListDelegate'];

  function RutaCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal, $rootScope, $ionicListDelegate) {
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
    vm.tiporuta = [
      {id: 1, tipo: "Urbana"},
      {id: 2, tipo: "Extra-urbana"}
    ]

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
        $ionicListDelegate.closeOptionButtons();
      }
    }

    //crear ruta
    function registrarRuta() {
      $rootScope.$broadcast('loading:show');
      if (vm.list.$getRecord(vm.ruta.idruta) != null) {
        $rootScope.$broadcast('loading:hide');
        return alert("Nro de ruta ya esta registrado")
      }
      vm.ruta.used = false;
      ruta.child(vm.ruta.idruta).set(vm.ruta);
      vm.ruta = {};
      vm.modal.hide();
      $rootScope.$broadcast('loading:hide');
    }

    //eliminar ruta
    function eliminar(ruta) {
      $rootScope.$broadcast('loading:show');
      vm.list.$remove(ruta).then(function (s) {
        console.log(s)
        $rootScope.$broadcast('loading:hide');
      });
    }

    function editar(r) {
      abrirModal(2);
      var q = ruta.child(r.idruta)
      vm.ruta2 = $firebaseObject(q);
      console.log(vm.ruta2)
    }

    function guardar(obj) {
      $rootScope.$broadcast('loading:show');

      ruta
        .child(vm.ruta2.idruta)
        .update({
          nombre: vm.ruta2.nombre,
          tipo: vm.ruta2.tipo
        })
        .then(updated)
        .catch(errUp)
    }

    function updated(s) {
      vm.modal2.hide();
      alert("Ruta editada con exito");
      $rootScope.$broadcast('loading:hide');
      $ionicListDelegate.closeOptionButtons();
    }

    function errUp(e) {
      vm.modal2.hide();
      console.log(e)
      alert("Erro al actualizar")
      $ionicListDelegate.closeOptionButtons();
    }

    vm.mostrarBorrar = false;
    function mostrarBorrarVarios() {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }
  }
})
();
