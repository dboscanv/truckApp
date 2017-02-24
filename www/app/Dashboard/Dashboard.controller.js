/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth', '$scope', '$timeout', '$state', '$rootScope'];

  function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth, $scope, $timeout, $state, $rootScope) {
    var vm = this;
    var auth = $firebaseAuth();

    vm.cerrarSesion = cerrarSesion;
    $timeout(function () {
      vm.infoUsuario = $localStorage.usua[0];
      console.log(vm.infoUsuario);
    }, 200);

    function cerrarSesion() {
      $rootScope.$broadcast('loading:show');
      $timeout(function () {
        auth.$signOut();
        delete $localStorage.usua;
        $state.go('/principal');
        $rootScope.$broadcast('loading:hide');
      }, 2000)
    }
  }
})();
