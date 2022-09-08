$.support.cors = true;

$('document').ready(function () {
  console.log('ready');

  $.ajax({
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxwoRqY6UYD1L1ak4F13ipi3vD20Nhn6FwJX5wXgfNgTPb5f356Fu1Nm_fb38CuZEBm6xVlUNFn02K/pub?gid=0&single=true&output=csv',
    dataType: 'text',
    success: function (data) {
      var employee_data = data.split(/\r?\n|\r/);
      var table_data = '<table class="table table-bordered table-striped">';
      for (var count = 0; count < employee_data.length; count++) {
        var cell_data = employee_data[count].split(',');
        table_data += '<tr>';
        for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
          if (count === 0) {
            table_data += '<th>' + cell_data[cell_count] + '</th>';
          } else {
            table_data += '<td>' + cell_data[cell_count] + '</td>';
          }
        }
        table_data += '</tr>';
      }
      table_data += '</table>';
      $('body').html(table_data);
    },
  });


});
