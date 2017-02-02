(function () {

  angular.module('truckApp.Recorridos')
    .controller("recorridosCtrl", recorridosCtrl);

  recorridosCtrl.$inject = ["$firebaseArray", "$ionicModal", "$scope", "$ionicListDelegate"];

  function recorridosCtrl($firebaseArray, $ionicModal, $scope, $ionicListDelegate) {
    var vm = this;

    vm.get_nombre = get_nombre;
    vm.add_custodio = add_custodio;
    vm.show_modal = show_modal;
    vm.end_reco = end_reco;

    const recorridos = firebase.database().ref("recorridos").orderByChild("estado").equalTo(1);
    const custodios = firebase.database().ref("custodio");

    var custodios_list = [];
    vm.reco = $firebaseArray(recorridos);
    vm.custodios = $firebaseArray(custodios.orderByChild("enCamion").equalTo(false));

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
      custodios.child(id_cust).child("enCamion").set(true);
      firebase.database().ref("recorridos").child(vm.id_reco).child("custodios").child(id_cust).set(true);
      $ionicListDelegate.closeOptionButtons();
      vm.modal.hide();
    }

    /*
    *
    * NOTE: No utilice la constante porque esa solo me traera los que tengan estado 0
    *
    * */
    function end_reco(id_reco, recorrido) {
      var recorridosInt = firebase.database().ref("recorridos");

      // Establecer el recorrido como finalizado, con estado 0
      recorridosInt.child(id_reco).child("estado").set(0);

      // Establecer la fecha final
      recorridosInt.child(id_reco).child("fecha_final").set(moment().format("DD-MM-YYYY hh:mm A"));

      // Colocar a los custodios que ya no estan en camion
      for (var cust in recorrido.custodios) {
        custodios.child(cust).child("enCamion").set(false);
      }

      // Colocar a los camiones que ya no estan en ruta
      for (var cam in recorrido.camiones) {
        firebase.database().ref("camion").child(cam).child("enRuta").set(false);
      }


    }


  }

})();
