/**
 * Created by nomisnaujpc on 30/12/2016.
 */

(function (firebase) {

  angular.module('truckApp.Dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth', '$scope', '$timeout', '$state', '$rootScope', '$ionicModal'];

  function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth, $scope, $timeout, $state, $rootScope, $ionicModal) {
    var vm = this;
    var auth = $firebaseAuth();

    vm.abrirModal = abrirModal;
    vm.cerrarModal = cerrarModal;
    vm.editar = editar;

    vm.infoUsuario = (typeof $localStorage.usua == "undefined") ? null : $localStorage.usua[0];
    vm.cerrarSesion = cerrarSesion;

    $timeout(function () {
      vm.infoUsuario = (typeof $localStorage.usua == "undefined") ? null : $localStorage.usua[0];
      console.log(vm.infoUsuario);
      $rootScope.$broadcast('loading:hide');
    }, 2000);

    function cerrarSesion() {
      $rootScope.$broadcast('loading:show');
      $timeout(function () {
        auth.$signOut();
        delete $localStorage.usua;
        $state.go('/principal');
        $rootScope.$broadcast('loading:hide');
      }, 2000)
    }

    $ionicModal.fromTemplateUrl('app/Dashboard/modal/editar.html', cargarModal, {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    })

    function cargarModal($ionicModal) {
      vm.modal = $ionicModal;
    }

    function abrirModal(usuario) {
      vm.modal.show();
      vm.infoUsuario2 = usuario;
    }

    function cerrarModal() {
      vm.modal.hide();
    }

    function editar() {
      $rootScope.$broadcast('loading:show');
      vm.modal.hide();

      firebase.ref('administrador')
        .child(vm.infoUsuario2.idempleado)
        .update({
          nombre: vm.infoUsuario2.nombre,
          apellido: vm.infoUsuario2.apellido,
          cargo: vm.infoUsuario2.cargo,
          email: vm.infoUsuario2.email
        })
        .then(successEditar)
        .catch(error)

    }

    function successEditar() {
      auth.$updateEmail(vm.infoUsuario2.email)
        .then(successEmail)
        .catch(error);
    }


    function successEmail() {
      $rootScope.$broadcast('loading:hide');
      console.log("Email changed successfully!");
    }

    function error(error) {
      $rootScope.$broadcast('loading:hide');
      console.error("Error: ", error);
    }

  }
})(firebase.database());
