$(function (){

  var ctx = document.getElementById('barChart').getContext('2d');
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    maintainAspectRatio : false,
    responsive : true,
    options: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
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
    $('#reservation').daterangepicker()

    $('#productLine, #year').on('change', function (){
      updateCharts();
    });

    $('body').on('click', function (){
        if($('body').hasClass('sidebar-collapse')) {
          $('.sidebar .has-treeview > a').trigger('click');
        }
    });

});

function updateCharts() {
  var productLine = $('#productLine');
  var year        = $('#year');
  var date        = $('#reservation');
  console.log(productLine, year, date);

  // $.ajax({
  //   url: "demo_test.txt",
  //   error: function (error){
  //     console.log(error);
  //   },
  //   success: function(result) {
  //   }
  // });
}