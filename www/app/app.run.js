/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  angular
    .module('truckApp')
    .run(loginRun);

  loginRun.$inject = ['$rootScope', '$state', '$localStorage', "$http", "$templateCache"];

  function loginRun($rootScope, $state, $localStorage,$http,$templateCache) {

    $http.get("app/messages-comun.html").then(function (response) {
      $templateCache.put("error-messages", response.data);
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      var config = $localStorage.config;
      // (typeof $localStorage.config != "undefined") ? $state.go('tab_cliente', {idRuta: config.idRuta}) : console.log("nadas")
      if (typeof $localStorage.config != "undefined" && toState.name != "tab_cliente.detalle") {
        $state.go('tab_cliente', {idRuta: config.idRuta})
      }
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.log(error);
      if (error === "AUTH_REQUIRED") {
        $state.go("/login");
      }
    });
  }
})();
