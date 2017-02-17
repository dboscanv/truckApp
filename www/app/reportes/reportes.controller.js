(function () {

  angular.module('truckApp.reportes')
    .controller("reportesCtrl", reportesCtrl);

  reportesCtrl.$inject = ["$firebaseArray", "$ionicModal", "$scope", "reportesFactory"];

  function reportesCtrl($firebaseArray, $ionicModal, $scope, reportesFactory) {
    var vm = this;
    vm.obtener_pdf = obtener_pdf;

    const recorridos = firebase.database().ref("recorridos");

    // Obtener recorridos con estado finalizado, es decir 0.
    vm.recorridos = $firebaseArray(recorridos.orderByChild("estado").equalTo(0));

    function obtener_pdf(id, reco) {
      console.log(id);
      var visitas_list = [];
      var custodios_list = [];
      var custodios_nombres = [];

      // 1. Obtener las visitas de ese recorrido
      var visitas = firebase.database().ref("visita").orderByChild("idrecorrido").equalTo(id);
      visitas.on("value", function (x) {
        x.forEach(function (value) {
          visitas_list.push(value.val());
        });

        var custodios = firebase.database().ref("custodio");
        custodios.on("value", function (x) {
          custodios_list = x.val();

          // 2. Obtener los nombres de custodios
          for (var cust in reco.custodios) {
            for (var custo in custodios_list) {
              if (cust == parseInt(custodios_list[custo].idempleado)) {
                custodios_nombres.push(custodios_list[custo].nombre + " " + custodios_list[custo].apellido);
              }
            }
          }

          var columns = [
            {title: "Cliente", dataKey: "nombre"},
            {title: "Direccion", dataKey: "direccion"},
            {title: "Tipo", dataKey: "tipo"},
            {title: "Monto", dataKey: "cantidad"},
            {title: "Observacion", dataKey: "observacion"}
          ];

          reportesFactory.generarPDF(columns, visitas_list, reco.ruta, reco.fecha_ini, reco.fecha_final, custodios_nombres); //TODO pasar fecha inicial, final, y el listado de custodios
        });
      });


    }

  }

})();
