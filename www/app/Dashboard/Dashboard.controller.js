/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth', '$scope', '$timeout'];

  function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth, $scope, $timeout) {
    var vm = this;

    $timeout(function () {
      vm.infoUsuario = $localStorage.usua[0];
      console.log(vm.infoUsuario);
    }, 200);


  }
})();
