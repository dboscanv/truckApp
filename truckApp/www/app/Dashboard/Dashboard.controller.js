/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  'use strict';

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['$firebaseAuth', '$ionicModal', '$scope'];

  function dashboardCtrl($firebaseAuth, $ionicModal, $scope) {

    var vm = this;
    var auth = $firebaseAuth();
    var admin = firebase.database().ref('administrador');
    vm.admin = {};
    vm.entrar = entrar;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrar = registrar;

    $ionicModal.fromTemplateUrl('app/Dashboard/modales/registroUsuario.html', function ($ionicModal) {
      id:1,
        vm.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    });

    function abrirModal(a) {
      if (a === 1) {
        vm.modal.show()
      }
    }

    function cerrarModal(a) {
      if (a === 1) {
        vm.modal.hide()
      }
    }

    function entrar() {
      vm.usuario = {
        email: "juansimon18.js@gmail.com",
        password: "juansimon18@"
      }
      auth.$signInWithEmailAndPassword(vm.email, vm.password).then(function (user) {
        console.log(user)
      }).catch(function (err) {
        console.log(err)
      })
    }

    function registrar() {
      auth.$createUserWithEmailAndPassword(vm.admin.email, vm.admin.password).catch(function (err) {
        console.log(err)
      })
      admin.child(vm.admin.idempleado).set(vm.admin);
      vm.cerrarModal(1);
    }

  }
})();
