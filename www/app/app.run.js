/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  angular
    .module('truckApp')
    .run(loginRun);

  loginRun.$inject = ['$rootScope', '$state', '$localStorage'];

  function loginRun($rootScope, $state, $localStorage) {

    $rootScope.$on('$stateChangeSuccess', function () {
      var config = $localStorage.config;
      (typeof $localStorage.config != "undefined") ? $state.go('tab_cliente', {idRuta: config.idRuta}) : console.log("nadas")
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.log(error);
      if (error === "AUTH_REQUIRED") {
        $state.go("/login");
      }
    });
  }
})();
