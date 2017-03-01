/**
 * Created by nomisnaujpc on 08/01/2017.
 */
(function () {

  angular.module("truckApp.Principal")
    .filter("Custodios_filter", Filtro);

  Filtro.$inject = [];

  function Filtro() {
    return function (arr) {
      var output = [];
      angular.forEach(arr, function (custodio) {
        if (!custodio.enCamion) {
          output.push(custodio);
        }
      });
      return output;
    }
  }

})();
