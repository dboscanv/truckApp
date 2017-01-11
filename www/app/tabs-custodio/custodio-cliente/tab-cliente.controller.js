/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function () {
  'use strict';

  angular
    .module('truckApp.CustodioFinal.Cliente')
    .controller('tab_cliente', rutaCtrl);

  rutaCtrl.$inject = [];

  function rutaCtrl() {
    var vm = this;
    vm.title = 'tab_cliente';
    console.log(vm.title);

  }
})();
