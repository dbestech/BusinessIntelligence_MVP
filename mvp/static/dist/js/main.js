$(function (){

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
