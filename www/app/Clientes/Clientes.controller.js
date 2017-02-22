(function () {

  angular.module("truckApp.Clientes")
    .controller("ClientesCtrl", ClientesCtrl);

  ClientesCtrl.$inject = ['checkAuth', "$firebaseArray", "$ionicModal", "$scope", "$firebaseObject", '$ionicListDelegate'];

  function ClientesCtrl(checkAuth, $firebaseArray, $ionicModal, $scope, $firebaseObject, $ionicListDelegate) {

    var vm = this;
    vm.cliente = {};
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
      vm.clientes.$remove(cliente).then(function (ref) {
        console.log(ref);
        console.log(cliente.$id == ref.key);
      });
    }

    function AbrirModal(index, cliente) {
      if (index == 1) {
        vm.modal1.show();
      } else {
        vm.modal2.show();
        vm.cliente = cliente;
      }
    }

    function CerrarModal(index) {
      if (index == 1) {
        vm.modal1.hide();
      } else {
        vm.modal2.hide();
      }
    }

    function GuardarCliente() {
      //Guardar el cliente
      if (vm.clientes.$getRecord(vm.cliente.idcliente) != null) {
        return alert("Nro de cliente ya esta registrado")
      }
      cliente.child(vm.cliente.idcliente).set(vm.cliente).then(function (ref) {
        vm.modal1.hide();
      });
    }

    function Editar() {
      vm.clientes.$save(vm.cliente).then(function (ref) {
        alert("Actualizado!");
        $ionicListDelegate.$getByHandle("clienteHandle").closeOptionButtons();
        vm.modal2.hide();
      }, function (error) {
        console.log(error);
      });
    }


  }
})();
