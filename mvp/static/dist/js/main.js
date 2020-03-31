$(function (){
  var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: 'red',
      data: [238, 252, 276, 513, 637, 745, 769]
    }, {
      label: 'Dataset 2',
      backgroundColor: 'blue',
      data: [214, 217, 221, 425, 427, 456, 765]
    }, {
      label: 'Dataset 3',
      backgroundColor: 'green',
      data: [52, 79, 674, 678, 784, 899, 913]
    }]
  };

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
});