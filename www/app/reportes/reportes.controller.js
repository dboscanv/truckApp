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
      // 1. Obtener las visitas de ese recorrido
      var visitas = firebase.database().ref("visita").orderByChild("idrecorrido").equalTo(id);
      visitas.on("value", function (x) {
        x.forEach(function (value) {
          visitas_list.push(value.val());
        });

        var columns = [
          {title: "Cliente", dataKey: "nombre"},
          {title: "Direccion", dataKey: "direccion"},
          {title: "Tipo", dataKey: "tipo"},
          {title: "Monto", dataKey: "cantidad"},
          {title: "Observacion", dataKey: "observacion"}
        ];
        reportesFactory.generarPDF(columns, visitas_list, reco.ruta); //TODO pasar fecha inicial, final, y el listado de custodios
      });


    }

  }

})();
