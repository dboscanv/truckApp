/**
 * Created by nomisnaujpc on 08/01/2017.
 */
(function (firebase) {
  "use strict";

  angular.module("truckApp.Principal")
    .controller("Principal", Principal);

  Principal.$inject = ['$firebaseArray', '$state', '$firebaseObject'];

  function Principal($firebaseArray, $state, $firebaseObject) {
    var vm = this;
    vm.configurar = configurar;

    // //referencia a la relacion de camion y custodio
    // const cc = firebase.ref('camion-custodio');

    //referencias para los select
    const ruta = firebase.ref("ruta");
    const camion = firebase.ref("camion");
    const recorridos = firebase.ref("recorridos");

    //referencia a la coleccion custodio
    const custodio = firebase.ref('custodio');

    //ng-repeat
    vm.list = $firebaseArray(custodio);
    vm.camion = $firebaseArray(camion);
    vm.ruta = $firebaseArray(ruta);
    console.log(vm.ruta);


    function configurar(arrCustodios) {

      //1. Configurar que el camion esta en ruta.
      console.log(vm.camion_selec.$id);
      var cam = camion.child(vm.camion_selec.$id);
      cam.update({
        enRuta: true
      });

      // 2. Configurar que el custodio esta en camion.
      console.log(vm.custodio.$id);
      var cust = custodio.child(vm.custodio.$id);
      cust.update({
        enCamion: true
      });

      // 3. Crear recorrido
      console.log("CREARA");

      var objCust = {};
      var objCamion = {};

      objCust[vm.custodio.$id] = true;
      objCamion[vm.camion_selec.$id] = true;

      recorridos.push({
        ruta: vm.idruta,
        fecha_ini: moment().format("DD-MM-YYYY HH:mm A"),
        custodios: objCust,
        camiones: objCamion,
        estado: 1 //0: inactivo, 1 activo
      });

      // Ejemplo, no borrar
      // var newObj = {};
      // newObj["122"] = true;
      // recorridos.child("-KbfXWkIoSJHuNCl4lyK").child("custodios").child("123").set(true);

      $state.go('tab_cliente');
    }

  }
})(firebase.database());
