/**
 * Created by nomisnaujpc on 30/12/2016.
 */
(function () {
  angular
    .module('truckApp')
    .run(loginRun);

  loginRun.$inject = ['$rootScope', '$location', '$state'];

  function loginRun($rootScope, $location, $state) {

    // $rootScope.$on('$stateChangeStart', function (toState, toParams) {
    //   if (toParams.login === true) {
    //     $location.path('/login');
    //   }
    // })

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.log(error);
      if (error === "AUTH_REQUIRED") {
        $state.go("/login");
      }
    });


  }
})();
