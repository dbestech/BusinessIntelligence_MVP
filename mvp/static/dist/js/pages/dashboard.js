/*
 * Author: Abdullah A Almsaeed sdfsdfsfdsf
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(document).ready(function () {

  'use strict'

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.card-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })
  $('.connectedSortable .card-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder         : 'sort-highlight',
    handle              : '.handle',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').summernote()

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



  $('.daterange').daterangepicker({
    ranges   : {
      'Today'       : [moment(), moment()],
      'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month'  : [moment().startOf('month'), moment().endOf('month')],
      'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
  }, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  /* jQueryKnob */
  $('.knob').knob()

  // World map by jvectormap
  jQuery('#world-map').vectorMap({
    map: 'world_en',
    backgroundColor: 'transparent',
    color: '#ffffff',
    hoverOpacity: 0.7,
    selectedColor: '#333',
    enableZoom: false,
    showTooltip: true,
    scaleColors: ['#00afff', '#003046'],
    values: visitorsData,
    normalizeFunction: 'polynomial',
    onRegionLabelShow: function (e, el, code) {
      if (typeof visitorsData[code] != 'undefined')
        el.html(el.html() + ': ' + visitorsData[code] + ' new visitors')
    }
  });

  // The Calender
  $('#calendar').datetimepicker({
    format: 'L',
    inline: true
  })

  // SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').overlayScrollbars({
    height: '250px'
  })

  /* Chart.js Charts */
  // Sales chart
  var salesChartCanvas = document.getElementById('simple-chart').getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          return tooltipItem.xLabel + " : " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      }
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        },
        ticks: {
          callback: function(value, index, values) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  window.salesChart = new Chart(salesChartCanvas, { 
      type: 'line', 
      data: salesChartData, 
      options: salesChartOptions
    }
  )

  // Donut Chart
  var pieChartCanvas = $('#pie-chart').get(0).getContext('2d')
  var pieOptions = {
    legend: {
      display: false
    },
    maintainAspectRatio : false,
    responsive : true,
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataLabel = data.labels[tooltipItem.index];
          var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();

          if (Chart.helpers.isArray(dataLabel)) {
            dataLabel = dataLabel.slice();
            dataLabel[0] += value;
          } else {
            dataLabel += value;
          }
          return dataLabel;
        }
      }
    }
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  window.pieChart = new Chart(pieChartCanvas, {
    type: 'doughnut',
    data: pieData,
    options: pieOptions
  });

  // Sales graph chart
  var salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesGraphChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          return tooltipItem.xLabel + " : " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      }
    },
    scales: {
      xAxes: [{
        ticks : {
          fontColor: '#efefef',
        },
        gridLines : {
          display : false,
          color: '#efefef',
          drawBorder: false,
        }
      }],
      yAxes: [{
        ticks : {
          stepSize: 5000,
          fontColor: '#efefef',
          callback: function(value, index, values) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        },
        gridLines : {
          display : true,
          color: '#efefef',
          drawBorder: false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  window.salesGraphChart = new Chart(salesGraphChartCanvas, { 
      type: 'line', 
      data: salesGraphChartData, 
      options: salesGraphChartOptions
    }
  )

});


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateCharts() {
  var productLine = $('#productLine').val();
  var yr          = $('#year').val();
  var cntry       = $('#country').val();

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

      salesGraphChart.data = result.chart1;
      salesGraphChart.update();
      salesChart.data = result.chart2;
      salesChart.update();
      myBar.data = result.chart3;
      myBar.update();
      pieChart.data = result.chart4;
      pieChart.update();
      jQuery('#world-map').vectorMap('set', 'colors', result.chart5);

      alert(JSON.stringify(result.chart1));
      alert(JSON.stringify(result.chart2));
      alert(JSON.stringify(result.chart3));
      alert(JSON.stringify(result.chart4));
      alert(JSON.stringify(result.chart5));
      // YEAR WISE RESULT result.year_wise_json;
     }
  });
}
