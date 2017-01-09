/**
 * Created by nomisnaujpc on 04/01/2017.
 */
(function () {

  angular.module('truckApp.Principal', [])
    .config(loginRoute);

  function loginRoute($stateProvider) {
    $stateProvider
      .state('/principal', {
        url: '/principal',
        name: 'principal',
        templateUrl: 'app/principal/principal.html',
        controller: 'Principal',
        controllerAs: 'vm'
      })
      .state('/configurar', {
        url: '/configurar',
        // parent: '/principal',
        name: '/configurar',
        templateUrl: 'app/principal/configurar.html',
        controller: 'Principal',
        controllerAs: 'vm'
      });


    // .state('roles', {
    //     parent: 'panel',
    //     name: 'roles',
    //     url: '/roles',
    //     //      login: true,
    //     views: {
    //       'content@panel': {
    //         templateUrl: 'views/permisos/roles.html',
    //         controller: 'gestionRoles'
    //       }
    //     }
    //
    //   })
  }
})();
