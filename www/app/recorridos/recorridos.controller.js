(function () {

  angular.module('truckApp.Recorridos')
    .controller("recorridosCtrl", recorridosCtrl);

  recorridosCtrl.$inject = ["$firebaseArray", "$ionicModal", "$scope","$ionicListDelegate"];

  function recorridosCtrl($firebaseArray, $ionicModal, $scope,$ionicListDelegate) {
    var vm = this;

    vm.get_nombre = get_nombre;
    vm.add_custodio = add_custodio;
    vm.show_modal = show_modal;
    vm.end_reco = end_reco;

    const recorridos = firebase.database().ref("recorridos").orderByChild("estado").equalTo(1);
    const custodios = firebase.database().ref("custodio");

    var custodios_list = [];
    vm.reco = $firebaseArray(recorridos);
    vm.custodios = $firebaseArray(custodios);

    custodios.on("value", function (x) {
      custodios_list = x.val();
      console.log(custodios_list);
    });

    //Load modal
    $ionicModal.fromTemplateUrl("app/recorridos/modal_custodio.html", {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.modal = modal;
    });

    function get_nombre(id) {
      for (var obj in custodios_list) {
        if (id == parseInt(custodios_list[obj].idempleado)) {
          return custodios_list[obj].nombre + " " + custodios_list[obj].apellido;
        }
      }
    }

    function show_modal(id_reco) {
      vm.id_reco = id_reco;
      vm.modal.show();
    }

    function add_custodio(id_cust) {
      console.log(id_cust);
      recorridos.child(vm.id_reco).child("custodios").child(id_cust).set(true);
      $ionicListDelegate.closeOptionButtons();
      vm.modal.hide();
    }

    function end_reco(id_reco) {
      recorridos.child(id_reco).child("estado").set(0);
    }


  }

})();
