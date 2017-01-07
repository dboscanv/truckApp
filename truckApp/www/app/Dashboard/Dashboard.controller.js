/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth'];

  function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth) {
    var vm = this;

    vm.infoUsuario = $localStorage.usua[0];


  }
})();
