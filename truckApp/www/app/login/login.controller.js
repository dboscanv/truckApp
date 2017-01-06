/**
 * Created by nomisnaujpc on 04/01/2017.
 */
(function () {
  'use strict';

  angular.module('truckApp.Login')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$firebaseAuth', '$ionicModal', '$scope', '$firebaseArray', '$state', '$rootScope'];

  function LoginCtrl($firebaseAuth, $ionicModal, $scope, $firebaseArray, $state, $rootScope) {
    var vm = this;
    var auth = $firebaseAuth();
    var refAdmin = firebase.database().ref('administrador');
    // var ref = $firebaseArray(refAdmin);
    vm.admin = {};
    vm.entrar = entrar;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrar = registrar;

    $ionicModal.fromTemplateUrl('app/login/modales/registroUsuario.html', function ($ionicModal) {
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

    var usuario = {
      email: "juansimon18.js@gmail.com",
      password: "19971510"
    };


    function entrar() {

      auth.$signInWithEmailAndPassword(usuario.email, usuario.password).then(function (user) {
        debugger;
        var query = refAdmin.orderByChild('email').equalTo(usuario.email);
        $rootScope.usua = $firebaseObject(query);
        $state.go('tab.dash');
      }).catch(function (err) {
        alert("Correo o clave invalida")
      })
    }

    console.log($rootScope.usua);

    function registrar() {
      auth.$createUserWithEmailAndPassword(vm.admin.email, vm.admin.password).catch(function (err) {
        console.log(err)
      });
      refAdmin.child(vm.admin.idempleado).set(vm.admin);
      vm.cerrarModal(1);
    }
  }
})();
