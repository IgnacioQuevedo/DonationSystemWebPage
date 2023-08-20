

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        //Efectivo
        //Transferencia
        //Canje
        //Mercaderia
        //Cheque
        //Otros

        let arrayAux = miSistema.modosIngresados(); //Carga el array con las respectivas cantidades de modos registrados

        var data = google.visualization.arrayToDataTable([
          ["Modos", "Cantidad"],
          ["Efectivo",arrayAux[0]],
          ["Transferencia",arrayAux[1]],
          ["Canje",arrayAux[2]],
          ["Mercaderia",arrayAux[3]],
          ["Cheque",arrayAux[4]],
          ["Otros",arrayAux[5]]
        ]);

        var options = {
          title: "Donaciones por Modo"
        };

        var chart = new google.visualization.PieChart(document.getElementById("piechart"));

        chart.draw(data, options);
      }



