$(function (){

  var ctx = document.getElementById('barChart').getContext('2d');
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    maintainAspectRatio : false,
    responsive : true,
    options: {
      scaleLabel: function(label){
        return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(tooltipItem, data) {
            return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        }
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            callback: function(value, index, values) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
        }]
      }
    }
  });

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

    //Date range picker
    $('#reservation').daterangepicker({ 
     showDropdowns: true,
    startDate: '1970-01-01',
        endDate:'1970-01-01',
        ranges: {
           'No filter': ['1970-01-01','1970-01-01'],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
    locale: { 
        format: 'YYYY-MM-DD'
    }
    },
      /*function() {
        updateCharts();
    }*/);

  /*  $('#productLine, #year').on('change', function (){
      updateCharts();
    });
*/
    $('body').on('click', function (){
        if($('body').hasClass('sidebar-collapse')) {
          $('.sidebar .has-treeview > a').trigger('click');
        }
    });

});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateCharts() {
  var productLine = $('#productLine').val();
  var yr        = $('#year').val();
  var cntry        = $('#country').val();

   $.ajax({
     url: "get_filtered_data",
     type: "POST",
     data : { prod: productLine, year:yr, country:cntry},
     dataType: "json",
     error: function (error){
       alert("error");
     },
     success: function(result) {
     	$('#orders_span').html(numberWithCommas(result.orders));
     	$('#sales_span').html(numberWithCommas(result.sales));
     	$('#customer_span').html(numberWithCommas(result.customers));
     	$('#product_span').html(numberWithCommas(result.products));
     	
     	alert(JSON.stringify(result.chart1));
     	alert(JSON.stringify(result.chart2));
     	alert(JSON.stringify(result.chart3));
     	alert(JSON.stringify(result.chart4));
     	alert(JSON.stringify(result.chart5));
     	
     	// YEAR WISE RESULT result.year_wise_json;
     	
     	
     }
  });
}