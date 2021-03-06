(function () {

  angular.module("truckApp.Clientes")
    .controller("ClientesCtrl", ClientesCtrl);

  ClientesCtrl.$inject = ['checkAuth', "$firebaseArray", "$ionicModal", "$scope", "$firebaseObject", '$ionicListDelegate', '$rootScope'];

  function ClientesCtrl(checkAuth, $firebaseArray, $ionicModal, $scope, $firebaseObject, $ionicListDelegate, $rootScope) {

    var vm = this;
    vm.cliente = {};
    vm.cliente2 = {};
    const cliente = firebase.database().ref("cliente");
    const rutas = firebase.database().ref("ruta");

    vm.clientes = $firebaseArray(cliente);
    vm.rutas = $firebaseArray(rutas);

    vm.eliminar = Eliminar;
    vm.abrirModal = AbrirModal;
    vm.cerrarModal = CerrarModal;
    vm.guardarCliente = GuardarCliente;
    vm.editarCliente = Editar;

    //Load modal's
    $ionicModal.fromTemplateUrl("app/Clientes/modales/crear_cliente.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl("app/Clientes/modales/editar_cliente.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal2 = modal;
    });

    function Eliminar(cliente) {
      $rootScope.$broadcast('loading:show');
      vm.clientes.$remove(cliente).then(function (ref) {
        console.log(ref);
        console.log(cliente.$id == ref.key);
      })
        .then(successEliminar)
        .catch(errEliminar)
    }

    function successEliminar(succ) {
      $rootScope.$broadcast('loading:hide');
      alert("Operacion realizada con exito")
    }

    function errEliminar(e) {
      $rootScope.$broadcast('loading:hide');
      alert("Operacion realizada con exito")
    }

    function AbrirModal(index, cli) {
      if (index == 1) {
        vm.modal1.show();
      } else {
        vm.modal2.show();
        var q = cliente.child(cli.idcliente);
        vm.cliente2 = $firebaseObject(q);
      }
    }

    function CerrarModal(index) {
      if (index == 1) {
        vm.modal1.hide();
      } else {
        vm.modal2.hide();
        $ionicListDelegate.closeOptionButtons();
      }
    }

    function GuardarCliente() {
      //Guardar el cliente
      $rootScope.$broadcast('loading:show');

      if (vm.clientes.$getRecord(vm.cliente.idcliente) != null) {
        $rootScope.$broadcast('loading:hide');
        return alert("Nro de cliente ya esta registrado")
      }
      vm.cliente.latitud = '';
      vm.cliente.longitud = '';
      cliente.child(vm.cliente.idcliente).set(vm.cliente).then(function (ref) {
        vm.cliente = {};
        vm.modal1.hide();
      }).then(function () {
        $rootScope.$broadcast('loading:hide');
        alert("Cliente registrado con exito")
      })
    }

    function Editar() {
      $rootScope.$broadcast('loading:show');
      cliente
        .child(vm.cliente2.idcliente)
        .update({
          nombre: vm.cliente2.nombre,
          direccion: vm.cliente2.direccion,
          ruta: vm.cliente2.ruta
        })
        .then(updated)
        .catch(errUp);
    }

    function updated(s) {
      $ionicListDelegate.closeOptionButtons();
      alert("Cliente actualizado con exito!");
      $rootScope.$broadcast('loading:hide');
      vm.modal2.hide();
    }

    function errUp(e) {
      $rootScope.$broadcast('loading:hide');
      console.log(e);
    }


  }
})();
