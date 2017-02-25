(function () {

  angular.module("truckApp.Camion")
    .controller("CamionCtrl", CamionCtrl);

  CamionCtrl.$inject = ['checkAuth', "$firebaseArray", "$ionicModal", "$scope"];

  function CamionCtrl(checkAuth, $firebaseArray, $ionicModal, $scope) {
    var vm = this;
    vm.camion = {};
    const camion = firebase.database().ref("camion");

    vm.eliminar = Eliminar;
    vm.abrirModal = AbrirModal;
    vm.cerrarModal = CerrarModal;
    vm.guardarCamion = GuardarCamion;
    vm.editar = Editar;

    //Array list
    vm.camiones = $firebaseArray(camion);
    console.log(vm.camiones);

    //Load modal's
    $ionicModal.fromTemplateUrl("app/Camion/modales/crear_camion.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl("app/Camion/modales/editar_camion.html", {
      scope: $scope,
      animation: "slide-in-up",
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (modal) {
      vm.modal2 = modal;
    });

    function Eliminar(camion) {
      vm.camiones.$remove(camion).then(function (ref) {
        console.log(ref);
        console.log(camion.$id == ref.key);
      });
    }

    function AbrirModal(index, camion) {

      if (index == 1) {
        vm.modal1.show();
      } else {
        vm.modal2.show();
        vm.camion = camion;
      }
    }

    function CerrarModal(index) {
      if (index == 1) {
        vm.camion = {};

        vm.modal1.hide();
      } else {
        vm.modal2.hide();
        vm.camion = {};

      }
    }

    function GuardarCamion() {
      if (vm.camiones.$getRecord(vm.camion.id) != null) {
        return alert("Nro de camion ya esta registrado")
      }
      if (vm.camion.cantidad > vm.camion.capacidad) {
        return alert("La capacidad supera a la cantidad")
      } else {
        camion.child(vm.camion.id).set(vm.camion).then(function (ref) {
          console.log(ref);
          console.log("Añadido!");
          vm.camion = {};
          vm.modal1.hide();
        });
      }
    }

    function Editar() {
      if (vm.camion.cantidad > vm.camion.capacidad) {
        return alert("La capacidad supera a la cantidad")
      } else {
        vm.camiones.$save(vm.camion).then(function (ref) {
          alert("Actualizado!");
          vm.camion = {};
          vm.modal2.hide();
        }, function (error) {
          console.log(error);
        });
      }
    }


  }
})();
