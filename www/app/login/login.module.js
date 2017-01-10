/**
 * Created by nomisnaujpc on 04/01/2017.
 */
(function () {

  angular.module('truckApp.Login', [])
    .config(loginRoute);

  function loginRoute($stateProvider) {
    $stateProvider
      .state('/login', {
        url: '/login',
        name: 'login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });
  }
})();
