(function () {
  "use strict";

  angular.module("truckApp.Camion")
    .controller("CamionCtrl", CamionCtrl);

  CamionCtrl.$inject = ['checkAuth'];

  function CamionCtrl(checkAuth) {
    var vm = this;
  }
})();
