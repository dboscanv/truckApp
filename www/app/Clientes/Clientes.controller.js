(function () {
  "use strict";

  angular.module("truckApp.Clientes")
    .controller("ClientesCtrl", ClientesCtrl);

  ClientesCtrl.$inject = ['checkAuth'];

  function ClientesCtrl(checkAuth) {
    var vm = this;

  }
})();
