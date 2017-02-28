(function () {

  angular.module("truckApp.Custodio")
    .controller("CustodioCtrl", CustodioCtrl);

  CustodioCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray',
    '$ionicModal', '$ionicPopup', '$ionicListDelegate', 'checkAuth', '$rootScope'];

  function CustodioCtrl($firebaseObject, $scope, $firebaseArray, $ionicModal,
                        $ionicPopup, $ionicListDelegate, checkAuth, $rootScope) {
    var vm = this;
    vm.custodio = {};

    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrarCustodio = registrarCustodio;
    vm.eliminar = eliminar;
    vm.editar = editar;
    vm.guardar = guardar;
    vm.mostrarBorrarVarios = mostrarBorrarVarios;

    //referencia a la coleccion custodio
    const custodio = firebase.database().ref('custodio');

    //ng-repeat
    vm.list = $firebaseArray(custodio);

    //modal para crear custodio
    $ionicModal.fromTemplateUrl('app/Custodio/modales/crearCustodio.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal = modal;
    });

    //modal para editar custodio
    $ionicModal.fromTemplateUrl('app/Custodio/modales/editarCustodio.html', {
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
        vm.modal2.hide();
      }

      vm.custodio = {};
    }

    //crear custodio
    function registrarCustodio() {
      $rootScope.$broadcast('loading:show');

      if (vm.list.$getRecord(vm.custodio.idempleado) != null) {
        $rootScope.$broadcast('loading:hide');

        return alert("Nro de empleado ya esta registrado")
      }
      vm.custodio.enCamion = false;

      custodio.child(vm.custodio.idempleado).set(vm.custodio)
        .then(function (s) {
          $rootScope.$broadcast('loading:hide');
          alert("Custodio registrado con exito")
        })
        .catch(function (e) {
          $rootScope.$broadcast('loading:hide');
          alert("Error al registrar cliente")
        })
      vm.custodio = {};
      vm.modal.hide();
    }

    //eliminar custodio
    function eliminar(custodio) {
      $rootScope.$broadcast('loading:show');
      console.log(custodio);
      vm.list.$remove(custodio).then(function (s) {
        $rootScope.$broadcast('loading:hide');
        alert("Custodio eliminado con exito")
      }), function (e) {
        $rootScope.$broadcast('loading:hide');
        alert("Error al eliminar custodio")
      };
    }

    //editar custodio
    function editar(cust) {
      vm.modal2.show();
      let q = custodio.child(cust.idempleado)
      vm.custodio2 = $firebaseObject(q);
      console.log(vm.custodio2)
    }

    function guardar() {
      $rootScope.$broadcast('loading:show');

      custodio
        .child(vm.custodio2.idempleado)
        .update({
          nombre: vm.custodio2.nombre,
          apellido: vm.custodio2.apellido,
          cargo: vm.custodio2.cargo
        })
        .then(updated)
        .catch(errUp)
    }

    function updated(s) {
      vm.modal2.hide();
      alert("Actualizado")
      $rootScope.$broadcast('loading:hide');
      $ionicListDelegate.closeOptionButtons();
    }

    function errUp(e) {
      alert("Error al editar custodio")
      $rootScope.$broadcast('loading:hide');
      $ionicListDelegate.closeOptionButtons();
    }

    vm.mostrarBorrar = false;
    function mostrarBorrarVarios() {
      vm.mostrarBorrar = !vm.mostrarBorrar;
    }

  }
})();
