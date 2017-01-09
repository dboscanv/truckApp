/**
 * Created by nomisnaujpc on 08/01/2017.
 */
(function () {
  "use strict";

  angular.module("truckApp.Principal")
    .controller("Principal", Principal);

  Principal.$inject = ['$firebaseArray'];

  function Principal($firebaseArray) {
    var vm = this;

    //referencia a la coleccion custodio
    const custodio = firebase.database().ref('custodio');
    //ng-repeat
    vm.list = $firebaseArray(custodio);
  }
})();
