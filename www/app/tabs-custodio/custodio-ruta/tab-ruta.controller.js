/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function () {
  'use strict';

  angular
    .module('truckApp.CustodioFinal.Ruta')
    .controller('tab_ruta', rutaCtrl);

  rutaCtrl.$inject = [];

  function rutaCtrl() {
    var vm = this;
    vm.title = 'tab_ruta';
  }
})();

