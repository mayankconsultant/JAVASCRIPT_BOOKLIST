$('#fact').hide();

$().ready(function(){
do_work();
});

function do_work(){
  console.log('MAYANK: page ready under do_work');
let fact = $('#fact')
let facttext=$('#facttext')
let numberinput = $('#mynumber')

numberinput.on('input',getFactAjax)

// console.log(fact);
// console.log(facttext);

};

function getFactAjax(){
  console.clear();
  console.log($(this).val());
  if ($(this).val() != '')   
  {
                      $.ajax({
                      type    :'GET',
                      url     :'http://numbersapi.com/'+$(this).val(),
                      success: function(resp){
                        $('#facttext').addClass('text-dark')
                        $('#facttext').text(resp)
                        $('#fact').show();
                              }
                            })
                      }
}