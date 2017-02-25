/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {

    angular.module('truckApp.Dashboard')
            .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['checkAuth', '$localStorage', '$firebaseAuth', '$scope', '$timeout', '$state', '$rootScope'];

    function dashboardCtrl(checkAuth, $localStorage, $firebaseAuth, $scope, $timeout, $state, $rootScope) {
        var vm = this;
        var auth = $firebaseAuth();
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
    }
})();
