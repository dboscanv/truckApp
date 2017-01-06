/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['$rootScope'];

  function dashboardCtrl($rootScope) {
    console.log($rootScope.usua);
    var vm = this;
    vm.infoUsuario = $rootScope.usua;

  }
})();
