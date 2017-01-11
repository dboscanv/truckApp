/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function (firebase) {
  'use strict';

  angular
    .module('truckApp.CustodioFinal.Cliente')
    .controller('tab_cliente', clienteCtrl);

  clienteCtrl.$inject = ['$firebaseArray'];

  function clienteCtrl($firebaseArray) {
    var vm = this;

    const cliente = firebase.ref("cliente");

    vm.clientes = $firebaseArray(cliente);
  }
})(firebase.database());
