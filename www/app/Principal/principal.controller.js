/**
 * Created by nomisnaujpc on 08/01/2017.
 */
(function (firebase) {
  "use strict";

  angular.module("truckApp.Principal")
    .controller("Principal", Principal);

  Principal.$inject = ['$firebaseArray', '$state'];

  function Principal($firebaseArray, $state) {
    var vm = this;
    vm.configurar = configurar;

    //referencia a la relacion de camion y custodio
    const cc = firebase.ref('camion-custodio');

    //referencias para los select
    const ruta = firebase.ref("ruta");
    const camion = firebase.ref("camion");

    //referencia a la coleccion custodio
    const custodio = firebase.ref('custodio');

    //ng-repeat
    vm.list = $firebaseArray(custodio);
    vm.camion = $firebaseArray(camion);
    vm.ruta = $firebaseArray(ruta);
    console.log(vm.ruta);


    function configurar(arrCustodios) {
      angular.forEach(arrCustodios, function (valor) {
        //creo el objeto a crear en la relacion
        vm.obj = {
          nombre: valor.nombre,
          apellido: valor.apellido,
          cargo: valor.cargo,
          idempleado: valor.idempleado
        };
        console.log(vm.obj);
        cc.child(vm.idcamion).child(valor.$id).set(vm.obj).then(function () {
          custodio.child(valor.$id).update({enCamion: true});
        }).catch(function (error) {
          console.log(error)
        });
      });

      //FALTA AGREGAR EL ID RUTA PARA SABER EN CUAL ESTA CADA CAMION
      camion.child(vm.idcamion).update({enRuta: true});
      ruta.child(vm.idruta).update({conCamion: true});
      $state.go('tab_cliente');
    }


    // custodio.child(vm.custodio.idempleado).set(vm.custodio);


  }
})(firebase.database());
