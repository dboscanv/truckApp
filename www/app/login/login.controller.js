/**
 * Created by nomisnaujpc on 04/01/2017.
 */
(function () {
  'use strict';

  angular.module('truckApp.Login')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$firebaseAuth', '$ionicModal', '$scope', '$firebaseArray', '$state', '$rootScope', '$localStorage'];

  function LoginCtrl($firebaseAuth, $ionicModal, $scope, $firebaseArray, $state, $rootScope, $localStorage) {
    var vm = this;
    var auth = $firebaseAuth();
    var refAdmin = firebase.database().ref('administrador');
    vm.admin = {};
    vm.entrar = entrar;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrar = registrar;
    vm.recuperarClave = recuperarClave;
    $rootScope.cerrarSesion = cerrarSesion;

    $ionicModal.fromTemplateUrl('app/login/modales/registroUsuario.html', function ($ionicModal) {
      id:1,
        vm.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    });

    $ionicModal.fromTemplateUrl('app/login/modales/recuperarPass.html', function ($ionicModal) {
      id:2,
        vm.modal2 = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    });

    function abrirModal(a) {
      if (a === 1) {
        vm.modal.show()
      } else {
        vm.modal2.show()
      }
    }

    function cerrarModal(a) {
      if (a === 1) {
        vm.modal.hide()
      } else {
        vm.modal2.hide()
      }
    }

    //
    // vm.email = "juansimon18.js@gmail.com";
    // vm.password = "123456";


    function entrar() {
      auth.$signInWithEmailAndPassword(vm.email, vm.password).then(function (user) {
        var query = refAdmin.orderByChild('email').equalTo(vm.email);
        query.on('value', function (snap) {
          // var result = snap;
          console.log(snap);
        });
        $localStorage.usua = $firebaseArray(query);
        $state.go('tab.dash');
      }).catch(function (err) {
        console.log(err);
        alert("Correo o clave invalida")
      })
    }

    function registrar() {
      auth.$createUserWithEmailAndPassword(vm.admin.email, vm.admin.password).catch(function (err) {
        console.log(JSON.stringify(err))
      });
      refAdmin.child(vm.admin.idempleado).set(vm.admin);
      alert("Usuario registrado con exito!");
      vm.cerrarModal(1);
    }

    function recuperarClave() {
      auth.$sendPasswordResetEmail(vm.email).then(function () {
        alert("Correo enviado con exito");
        vm.modal2.hide();
      }).catch(function (err) {
        vm.modal2.hide();
        alert("El correo ingresado no existe");
      })
    }

    function cerrarSesion() {
      auth.$signOut();
      delete $localStorage.usua;
      $state.go('/principal');
    }
  }
})();
