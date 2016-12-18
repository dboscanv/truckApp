(function () {
  "use strict";

  angular.module("truckApp.Ruta")
    .controller("RutaCtrl", RutaCtrl);

  RutaCtrl.$inject = [];

  function RutaCtrl() {
    var vm = this;
    console.log("Entro");
  }
})();
