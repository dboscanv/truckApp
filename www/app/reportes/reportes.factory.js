(function () {

  angular.module('truckApp.reportes')
    .factory("reportesFactory", reportesFactory);

  reportesFactory.$inject = [];

  function reportesFactory() {
    return {
      generarPDF: function (columnas, datos, tituloReporte) {
        // if (datos.length <= 0) {
        //   swal("ATENCIÓN", "No hay información parar imprimir, verifique y vuelva a intentarlo", "info");
        //   return null;
        // }
        var doc = new jsPDF('p', 'pt');
        var fecha = moment().format("DD/MM/YYYY hh:mm:ss A");

        var totalPagesExp = "{total_pages_count_string}";
        doc.autoTable(columnas, datos, {
          theme: 'striped',
          tableWidth: 'auto',
          styles: {
            fontSize: 7,
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
            fillColor: [0, 74, 136]
          },
          margin: {top: 150},
          beforePageContent: function (data) {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.text(40, 60, 'truckApp');
            doc.setFontSize(12);
            doc.text(40, 75, "truckApp, C.A");
            doc.text(40, 90, 'J-XXXXXXXXX-9');
            doc.setTextColor(0, 20, 137);
            doc.text(40, 105, tituloReporte);
            doc.setTextColor(0, 0, 0);
            // doc.text(40, 120, );
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

            // doc.setFontSize(7);
            // doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
            // doc.text("Usuario: " + user.nombre + " " + user.apellido + " | Cargo: " + user.cargo, data.settings.margin.right + 350, doc.internal.pageSize.height - 30);

          }
        });

        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }

        //Descarga TODO colocarlo como Ventor_Sales
        doc.save('reporte.pdf'); //Exportar el pdf con una URL

      }
    }

  }

})();
