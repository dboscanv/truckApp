(function () {

  angular.module('truckApp.reportes')
    .controller("reportesCtrl", reportesCtrl);

  reportesCtrl.$inject = ["$firebaseArray", "$ionicModal", "$scope", "reportesFactory"];

  function reportesCtrl($firebaseArray, $ionicModal, $scope, reportesFactory) {
    var vm = this;

    vm.imprimirReporte = function () {
      var columns = [
        {title: "ID", dataKey: "id"},
        {title: "Name", dataKey: "name"},
        {title: "Country", dataKey: "country"}
      ];
      var rows = [
        {"id": 1, "name": "Shaw", "country": "Tanzania"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"}
      ];
      reportesFactory.generarPDF(columns, rows, "Diego");
    }

  }

})();
