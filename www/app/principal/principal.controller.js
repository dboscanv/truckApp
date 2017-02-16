/**
 * Created by nomisnaujpc on 08/01/2017.
 */
(function (firebase) {
  "use strict";

  angular.module("truckApp.Principal")
    .controller("Principal", Principal);

  Principal.$inject = ['$firebaseArray', '$state', '$firebaseObject', '$localStorage'];

  function Principal($firebaseArray, $state, $firebaseObject, $localStorage) {
    var vm = this;
    vm.configurar = configurar;

    // //referencia a la relacion de camion y custodio
    // const cc = firebase.ref('camion-custodio');

    //referencias para los select
    const ruta = firebase.ref("ruta");
    const camion = firebase.ref("camion");
    const recorridos = firebase.ref("recorridos");
    var arrCust;

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
      debugger;

      // 3. Crear recorrido
      console.log("CREARA");

      // var objCust = {};
      // arrCust = [];
      var objCamion = {};
      var objCust = {};


      angular.forEach(arrCustodios, iterarCustodios);

      function iterarCustodios(obj) {

        objCust[obj.$id] = true;

        custodio.child(obj.$id)
          .update({
            enCamion: true
          });
      }

      objCamion[vm.camion_selec.$id] = true;

      let rec = recorridos.push({
        ruta: vm.idruta,
        fecha_ini: moment().format("DD-MM-YYYY hh:mm A"),
        custodios: objCust,
        camiones: objCamion,
        estado: 1 //0: inactivo, 1 activo
      });
      // console.log(rec.key());

      $localStorage.config = {config: true, idRuta: vm.idruta, recorrido: rec};
      // $localStorage.config = {config: true, idRuta: vm.idruta, recorrido: rec.key()};
      // Ejemplo, no borrar
      // var newObj = {};
      // newObj["122"] = true;
      // recorridos.child("-KbfXWkIoSJHuNCl4lyK").child("custodios").child("123").set(true);

      $state.go('tab_cliente', {idRuta: vm.idruta});
    }

  }
})(firebase.database());
