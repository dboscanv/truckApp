/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth', '$scope'];

  function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth, $scope) {
    var vm = this;

    vm.infoUsuario = $localStorage.usua[0];

  }
})();
