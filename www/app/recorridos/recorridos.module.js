(function () {

  angular.module('truckApp.Recorridos', [])
    .config(RecorridosRouter);

  function RecorridosRouter($stateProvider) {
    $stateProvider
      .state('tab.reco', {
        url: '/reco',
        name: 'reco',
        resolve: {
          'checkAuth': ['comunFactory', function (comunFactory) {
            return comunFactory.$requireSignIn();
          }]
        },
        views: {
          'tab-reco': {
            templateUrl: 'app/recorridos/recorridos.html',
            controller: 'recorridosCtrl',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
