angular.module('truckApp', [
  'ionic',
  'ngCordova',
  'truckApp.Dashboard',
  'truckApp.Ruta',
  'truckApp.Camion',
  'truckApp.Clientes',
  'truckApp.Login',
  'truckApp.Custodio',
  'truckApp.Factory',
  'truckApp.Principal',
  'truckApp.CustodioFinal',
  'truckApp.Recorridos',
  'truckApp.reportes',
  'ngStorage',
  'firebase',
  'ngMap',
  'ngMessages'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/tabs.html'
      });
    $urlRouterProvider.otherwise('/principal');

  });
