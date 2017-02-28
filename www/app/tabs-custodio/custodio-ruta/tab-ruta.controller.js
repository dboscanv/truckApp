/**
 * Created by eldelasfranelas on 10/01/2017.
 */
(function (firebase) {
  angular
    .module('truckApp.CustodioFinal.Ruta')
    .controller('tab_ruta', rutaCtrl);

  rutaCtrl.$inject = ['$firebaseAuth', '$ionicModal', '$scope', '$localStorage', '$timeout', '$state', '$rootScope'];

  function rutaCtrl($firebaseAuth, $ionicModal, $scope, $localStorage, $timeout, $state, $rootScope) {
    var vm = this;
    vm.title = 'tab_ruta';
    vm.eliminarConfig = eliminarConfig;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    var auth = $firebaseAuth();

    $ionicModal.fromTemplateUrl('app/tabs-custodio/custodio-ruta/modal/tab-ruta.login.html', function ($ionicModal) {
      id:1,
        vm.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    });

    function abrirModal() {
      vm.modal.show();
    }

    function cerrarModal() {
      vm.modal.hide();
    }

    function eliminarConfig() {
      $rootScope.$broadcast('loading:show');
      auth.$signInWithEmailAndPassword(vm.email, vm.password).then(success).catch(error);
    }

    function success() {
      angular.forEach($localStorage.config.custodios, function (obj) {
        firebase.ref('custodio/' + obj)
          .update({enCamion: false})
      });

      firebase.ref("recorridos/" + $localStorage.config.recorrido)
        .update({estado: 0});

      delete $localStorage.config;
      auth.$signOut();
      $timeout(redirect, 1500);
    }


    function error() {
      $rootScope.$broadcast('loading:hide');
      console.log(error)
    }

    function redirect() {
      $rootScope.$broadcast('loading:hide');
      vm.modal.hide();
      $state.go('/principal')
    }

  }


})(firebase.database());

