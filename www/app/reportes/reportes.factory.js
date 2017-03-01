(function () {

  angular.module('truckApp.reportes')
    .factory("reportesFactory", reportesFactory);

  reportesFactory.$inject = ["$cordovaFileTransfer"];

  function reportesFactory($cordovaFileTransfer) {
    return {
      generarPDF: function (columnas, datos, idruta, fecha_ini, custodios) {
        if (datos.length <= 0) {
          alert("No existen recorridos en esa ruta para esa fecha");
          return;
        }
        var doc = new jsPDF('p', 'pt');
        var fecha = moment().format("DD/MM/YYYY hh:mm:ss A");

        var totalPagesExp = "{total_pages_count_string}";
        doc.autoTable(columnas, datos, {
          theme: 'grid',
          tableWidth: 'auto',
          styles: {
            fontSize: 10,
            font: 'Arial',
            lineWidth: 0.5,
            rowHeight: 20,
            overflow: 'linebreak',
            valign: 'middle',
            halign: 'center'
          },
          columnStyles: {
            id: {fillColor: 99},
            lineWidth: 2,
            rowHeight: 20,
            fontSize: 12,
            font: 'Arial',
            valign: 'middle',
            halign: 'center',
            overflow: 'linebreak'
          },
          headerStyles: {
            fillColor: [158, 158, 158],
            textColor: [0, 0, 0],
            fontSize: 12
          },
          margin: {top: 150},
          beforePageContent: function (data) {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.text(40, 60, 'LISTADO DE RECORRIDO OPERATIVO');
            doc.setFontSize(12);
            doc.text(40, 75, 'RUTA # ' + idruta);
            doc.text(40, 90, "Fecha inicial: " + fecha_ini);
            // doc.text(40, 105, "Fecha final: " + fecha_final);
            doc.setTextColor(0, 0, 0);
            //Listado de custodios
            doc.text(420, 60, "CUSTODIOS:");
            var dist = 78;
            for (var x = 0; x < custodios.length; x++) {
              if (x == 0) {
                doc.text(420, dist, custodios[x]);
              } else {
                dist += 18;
                doc.text(420, dist, custodios[x]);
              }
            }

            //doc.text(40, 120, );
            // doc.addImage(logoB64, 'JPG', 330, 1, 230, 145); TODO agregar imagen
            // doc.setFontSize(12);
            // doc.text('Nombre vendedor: ' + security.ObtenerNombre(), data.settings.margin.left, data.settings.margin.top - 10);
          },
          afterPageContent: function (data) {
            var str = "Página " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
              str = str + " de " + totalPagesExp + " | Emisión: " + fecha;
            }

            doc.setFontSize(10);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
            // doc.text("Usuario: " + user.nombre + " " + user.apellido + " | Cargo: " + user.cargo, data.settings.margin.right + 350, doc.internal.pageSize.height - 30);

          }
        });

        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }

        // //Descarga

        doc.save("reporte.pdf");

        var descarga = doc.output('dataurlstring'); //Exportar el pdf con una URL

        var targetPath = cordova.file.externalRootDirectory;
        var trustHosts = true;
        var options = {};

        $cordovaFileTransfer.download(descarga, targetPath + '/reporte ' + moment().format("DD-MM-YY-hh:mm:ss") + '.pdf', options, trustHosts)
          .then(function (result) {
            alert("Reporte exportado correctamente");
          }, function (err) {
            alert("Error exportando el reporte");
          }, function (progress) {

          });
      }
    }

  }

})();
