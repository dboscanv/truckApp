/**
 * Created by nomisnaujpc on 08/01/2017.
 */
(function (firebase) {

  angular.module("truckApp.Principal")
    .controller("Principal", Principal);

  Principal.$inject = ['$firebaseArray', '$state', '$firebaseObject', '$localStorage'];

  function Principal($firebaseArray, $state, $firebaseObject, $localStorage) {
    var vm = this;
    vm.configurar = configurar;
    vm.changeChekbox = changeChekbox;

    // //referencia a la relacion de camion y custodio
    // const cc = firebase.ref('camion-custodio');

    //referencias para los select
    const ruta = firebase.ref("ruta");
    const camion = firebase.ref("camion");
    const recorridos = firebase.ref("recorridos");
    var arrCust;
    vm.custodios_selec = [];
    console.log("Inicio, custodios _selec vacio");
    console.log(vm.custodios_selec);

    //referencia a la coleccion custodio
    const custodio = firebase.ref('custodio');

    //ng-repeat
    vm.list = $firebaseArray(custodio);
    vm.camion = $firebaseArray(camion);
    vm.ruta = $firebaseArray(ruta);
    console.log(vm.ruta);

    function changeChekbox(custodio) {
      if (custodio.checked) {
        vm.custodios_selec.push(custodio);
      } else {
        vm.custodios_selec.splice(vm.custodios_selec.indexOf(custodio), 1);
      }
    }

    function configurar() {


      //1. Configurar que el camion esta en ruta.
      console.log(vm.camion_selec.$id);
      var cam = camion.child(vm.camion_selec.$id);
      cam.update({
        enRuta: true
      });


      // console.log("CREARA");

      // var objCust = {};
      arrCust = [];
      var objCamion = {};
      var objCust = {};

      console.log(vm.custodios_selec);
      angular.forEach(vm.custodios_selec, iterarCustodios);

      function iterarCustodios(obj) {

        objCust[obj.$id] = true;

        arrCust.push(obj.$id);
        // 2. Configurar que el custodio esta en camion.

        custodio.child(obj.$id)
          .update({
            enCamion: true
          });
      }

      objCamion[vm.camion_selec.$id] = true;

      // 3. Crear recorrido
      var rec = recorridos.push({
        ruta: vm.idruta,
        fecha_ini: moment().format("DD-MM-YYYY"),
        custodios: objCust,
        camiones: objCamion,
        estado: 1 //0: inactivo, 1 activo
      });
      console.log("Creo el recorrido");


      $localStorage.config = {
        config: true,
        idRuta: vm.idruta,
        recorrido: rec.key,
        custodios: arrCust
      };
      // $localStorage.config = {config: true, idRuta: vm.idruta, recorrido: rec.key()};
      // Ejemplo, no borrar
      // var newObj = {};
      // newObj["122"] = true;
      // recorridos.child("-KbfXWkIoSJHuNCl4lyK").child("custodios").child("123").set(true);

      $state.go('tab_cliente', {idRuta: vm.idruta});

    }

  }
})(firebase.database());
