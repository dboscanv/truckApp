/**
 * Created by nomisnaujpc on 04/01/2017.
 */
(function () {
  'use strict';

  angular.module('truckApp.Login')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$firebaseAuth', '$ionicModal', '$scope',
    '$firebaseArray', '$state', '$rootScope', '$localStorage', '$ionicPopup'];

  function LoginCtrl($firebaseAuth, $ionicModal, $scope, $firebaseArray, $state,
                     $rootScope, $localStorage, $ionicPopup) {
    var vm = this;
    var auth = $firebaseAuth();
    var refAdmin = firebase.database().ref('administrador');
    vm.admin = {};
    vm.entrar = entrar;
    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.registrar = registrar;
    vm.recuperarClave = recuperarClave;

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
        vm.modal.show();
      } else {
        vm.modal2.show();
      }
    }

    function cerrarModal(a) {
      if (a === 1) {
        vm.modal.hide();
        vm.admin = {};
      } else {
        vm.modal2.hide();
        vm.admin = {};
      }
    }

    //
    // vm.email = "juansimon18.js@gmail.com";
    // vm.password = "123456";


    function entrar() {
      $rootScope.$broadcast('loading:show');
      auth.$signInWithEmailAndPassword(vm.email, vm.password).then(function (user) {
        var query = refAdmin.orderByChild('email').equalTo(vm.email);
        query.on('value', function (snap) {
          // var result = snap;
          console.log(snap);
        });
        $localStorage.usua = $firebaseArray(query);
        $state.go('tab.dash');
        $rootScope.$broadcast('loading:hide');
      }).catch(function (err) {
        console.log(err);
        alert("Correo o clave invalida")
        $rootScope.$broadcast('loading:hide');
      })
    }

    function registrar() {

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="vm.correo" placeholder="correo">' +
        '<input type="password" ng-model="vm.clave" placeholder="clave">',
        title: 'Credenciales de administrador',
        scope: $scope,
        buttons: [
          {text: 'Cancelar'},
          {
            text: '<b>Confirmar</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!vm.correo || !vm.clave) {
                e.preventDefault();
              }
              return {
                correo: vm.correo,
                clave: vm.clave
              }

            }
          }
        ]
      });

      myPopup.then(function (success) {
        $rootScope.$broadcast('loading:show');
        auth.$signInWithEmailAndPassword(success.correo, success.clave).then(function () {
          auth.$createUserWithEmailAndPassword(vm.admin.email, vm.admin.password).catch(function (err) {
            console.log(JSON.stringify(err))
          }).then(function (success) {
            refAdmin.child(vm.admin.idempleado).set(vm.admin);
            alert("Usuario registrado con exito!");
            vm.cerrarModal(1);
            $rootScope.$broadcast('loading:hide');

          }).catch(function (e) {
            console.log(e);
            vm.cerrarModal(1);
            $rootScope.$broadcast('loading:hide');

          });
        })
          .catch(function (e) {
            alert("Clave o usuario invalido");
            $rootScope.$broadcast('loading:hide');
          });
      });

//

    }

    function recuperarClave() {
      $rootScope.$broadcast('loading:show');

      auth.$sendPasswordResetEmail(vm.email).then(function () {
        alert("Correo enviado con exito");
        vm.modal2.hide();
        $rootScope.$broadcast('loading:hide');
      }).catch(function (err) {
        vm.modal2.hide();
        alert("El correo ingresado no existe");
        $rootScope.$broadcast('loading:hide');

      })
    }


  }
})();
