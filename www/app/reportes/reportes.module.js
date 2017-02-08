(function () {

  angular.module('truckApp.reportes', [])
    .config(ReportesRouter);

  function ReportesRouter($stateProvider) {
    $stateProvider
      .state('tab.repo', {
        url: '/repo',
        name: 'repo',
        resolve: {
          'checkAuth': ['comunFactory', function (comunFactory) {
            return comunFactory.$requireSignIn();
          }]
        },
        views: {
          'tab-repo': {
            templateUrl: 'app/reportes/reportes.html',
            controller: 'reportesCtrl',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
