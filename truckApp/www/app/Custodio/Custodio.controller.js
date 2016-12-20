(function () {
  "use strict";

  angular.module("truckApp.Custodio")
    .controller("CustodioCtrl", CustodioCtrl);

  CustodioCtrl.$inject = ['$firebaseObject', '$scope', '$firebaseArray'];

  function CustodioCtrl($firebaseObject, $scope, $firebaseArray) {
    var vm = this;

    var custodio = firebase.database().ref('custodio');
    // var custodio = firebase.database().ref('custodio').child('0001');
    // vm.dataCustodio = $firebaseObject(custodio);
    vm.list = $firebaseArray(custodio);
    // vm.dataCustodio.$bindTo($scope, 'custodio');


    console.log(vm.list);
  }
})();
