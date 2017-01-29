(function () {

  angular.module('truckApp.Recorridos')
    .controller("recorridosCtrl", recorridosCtrl);

  recorridosCtrl.$inject = ["$firebaseArray"];

  function recorridosCtrl($firebaseArray) {
    var vm = this;
    const recorridos = firebase.database().ref("recorridos");

    vm.reco = $firebaseArray(recorridos);



  }

})();
