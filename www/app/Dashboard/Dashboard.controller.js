/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth', '$scope', '$timeout', '$state'];

  function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth, $scope, $timeout, $state) {
    var vm = this;
    var auth = $firebaseAuth();

    vm.cerrarSesion = cerrarSesion;
    $timeout(function () {
      vm.infoUsuario = $localStorage.usua[0];
      console.log(vm.infoUsuario);
    }, 200);

    function cerrarSesion() {
      auth.$signOut();
      delete $localStorage.usua;
      $state.go('/principal');
    }
  }
})();
