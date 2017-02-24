(function () {

  angular.module('truckApp.reportes')
    .controller("reportesCtrl", reportesCtrl);

  reportesCtrl.$inject = ["$firebaseArray", "$ionicModal", "$scope", "reportesFactory"];

  function reportesCtrl($firebaseArray, $ionicModal, $scope, reportesFactory) {
    var vm = this;
    vm.obtener_pdf = obtener_pdf;
    vm.submit = submit;

    const recorridos = firebase.database().ref("recorridos");
    var recorridos_list = [];

    // Obtener recorridos con estado finalizado, es decir 0.
    vm.recorridos = [];
    vm.rutas = $firebaseArray(firebase.database().ref("ruta"));
    // recorridos.orderByChild("estado").equalTo(0).on("value", function (snap) {
    //   recorridos_list = snap.val();
    // });

    function submit() {
      recorridos.orderByChild("ruta").equalTo(vm.idruta).on("value", function (snap) {
        var recorridos = snap.val();
        var date = moment(vm.date).format("DD-MM-YYYY");
        console.log(recorridos);
        for (var reco in recorridos) {
          if (recorridos[reco].fecha_ini == date && recorridos[reco].estado == 0) {
            recorridos[reco].id = reco;
            vm.recorridos.push(recorridos[reco]);
          }
        }

        obtener_pdf();
      });

    }

    function asyncLoop(iteraciones, func, callback) {
      var index = 0;
      var done = false;
      var loop = {
        next: function () {
          if (done) {
            return;
          }

          if (index < iteraciones) {
            index++;
            func(loop);

          } else {
            done = true;
            callback();
          }
        },
        iteration: function () {
          return index - 1;
        },
        break: function () {
          done = true;
          callback();
        }
      };
      loop.next();
      return loop;
    }


    function obtener_pdf() {

      var visitas_list = [];
      var custodios_list = [];
      var custodios_nombres = [];
      asyncLoop(vm.recorridos.length, function (loop) {
        var reco = vm.recorridos[loop.iteration()];
        firebase.database().ref("visita").orderByChild("idrecorrido").equalTo(reco.id).on("value", function (x) {
          x.forEach(function (value) {
            visitas_list.push(value.val());
          });

          var custodios = firebase.database().ref("custodio");
          custodios.on("value", function (x) {
            custodios_list = x.val();

            // 2. Obtener los nombres de custodios
            console.log(reco);
            for (var cust in reco.custodios) {
              for (var custo in custodios_list) {
                console.log(cust);
                console.log(custodios_list[custo].idempleado);
                if (cust == parseInt(custodios_list[custo].idempleado)) {
                  custodios_nombres.push(custodios_list[custo].nombre + " " + custodios_list[custo].apellido);
                }
              }
            }
            // console.log(visitas_list);
            // console.log(custodios_nombres);
            loop.next();
          });
        });
      }, function () {
        console.log("Termino el ciclo");
        console.log(visitas_list);
        console.log(custodios_nombres);

        var columns = [
          {title: "Cliente", dataKey: "nombre"},
          {title: "Direccion", dataKey: "direccion"},
          {title: "Tipo", dataKey: "tipo"},
          {title: "Monto", dataKey: "cantidad"},
          {title: "Observacion", dataKey: "observacion"}
        ];

        reportesFactory.generarPDF(columns, visitas_list, vm.idruta, moment(vm.date).format("DD-MM-YYYY"), custodios_nombres); //TODO pasar fecha inicial, final, y el listado de custodios
      });

      // for (var x = 0; x < vm.recorridos.length; x++) {
      //   // 1. Obtener las visitas de ese recorrido
      //   var visitas = firebase.database().ref("visita").orderByChild("idrecorrido").equalTo(vm.recorridos[x].id);
      //
      //   (function (reco) {
      //     visitas.on("value", function (x) {
      //       x.forEach(function (value) {
      //         visitas_list.push(value.val());
      //       });
      //
      //       var custodios = firebase.database().ref("custodio");
      //       custodios.on("value", function (x) {
      //         custodios_list = x.val();
      //
      //         // 2. Obtener los nombres de custodios
      //         console.log(reco);
      //         for (var cust in reco.custodios) {
      //           for (var custo in custodios_list) {
      //             console.log(cust);
      //             console.log(custodios_list[custo].idempleado);
      //             if (cust == parseInt(custodios_list[custo].idempleado)) {
      //               custodios_nombres.push(custodios_list[custo].nombre + " " + custodios_list[custo].apellido);
      //             }
      //           }
      //         }
      //         console.log(visitas_list);
      //         console.log(custodios_nombres);
      //       });
      //     });
      //   })(vm.recorridos[x]);
      // }


    }

  }

})();
