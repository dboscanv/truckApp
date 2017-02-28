(function () {

  angular.module("truckApp.Camion")
    .controller("CamionCtrl", CamionCtrl);

  CamionCtrl.$inject = ['checkAuth', "$firebaseArray", "$ionicModal", "$scope", '$rootScope', '$firebaseObject', '$ionicListDelegate'];

  function CamionCtrl(checkAuth, $firebaseArray, $ionicModal, $scope, $rootScope, $firebaseObject, $ionicListDelegate) {
    var vm = this;
    vm.camion = {}
    ;
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
      $rootScope.$broadcast('loading:show');

      vm.camiones.$remove(camion).then(function (ref) {
        console.log(ref);
        console.log(camion.$id == ref.key);
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


    function AbrirModal(index, ca) {
      if (index == 1) {
        vm.modal1.show();
      } else {

        vm.modal2.show();
        //                vm.camion = camion;
        // var q = camion.orderByChild('id').equalTo(ca.id);
        let q = camion.child(ca.id);
        vm.camion2 = $firebaseObject(q);
        console.log(vm.camion2)
      }
    }

    function CerrarModal(index) {
      if (index == 1) {
        vm.camion = "";
        vm.modal1.hide();
        $ionicListDelegate.closeOptionButtons();
      } else {
        vm.modal2.hide();
        vm.camion = "";
        $ionicListDelegate.closeOptionButtons();
      }
    }

    function GuardarCamion() {
      $rootScope.$broadcast('loading:show');
      if (vm.camiones.$getRecord(vm.camion.id) != null) {
        $rootScope.$broadcast('loading:hide');
        return alert("Nro de camion ya esta registrado")
      }
      if (vm.camion.cantidad > vm.camion.capacidad) {
        $rootScope.$broadcast('loading:hide');
        return alert("La cantidad supera a la capacidad")
      } else {
        camion.child(vm.camion.id).set(vm.camion)
          .then(function (ref) {
            console.log(ref);
            console.log("Añadido!");
            vm.camion = {};
            $rootScope.$broadcast('loading:hide');
            vm.modal1.hide();
          })
          .catch(function (e) {
            $rootScope.$broadcast('loading:hide');
          })
      }
    }

    function Editar() {
      $rootScope.$broadcast('loading:show');
      if (vm.camion2.cantidad > vm.camion2.capacidad) {
        $rootScope.$broadcast('loading:hide');
        return alert("La capacidad supera a la cantidad")
      } else {

        camion
          .child(vm.camion2.$id)
          .update({
            cantidad: vm.camion2.cantidad,
            capacidad: vm.camion2.capacidad
          })
          .then(updt)
          .catch(errUp)
      }
    }

    function updt(s) {
      alert("Actualizado!");
      $ionicListDelegate.closeOptionButtons();
      $rootScope.$broadcast('loading:hide');
      vm.camion2 = {};
      vm.modal2.hide();
    }

    function errUp(error) {
      $rootScope.$broadcast('loading:hide');
      console.log(error);
    }


  }
})();
