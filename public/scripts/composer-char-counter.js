$(document).ready(function() {
  
let textarea = $('textarea');
let counter = textarea.siblings('.counter')

textarea.on('input', function(event){

  let textarea= $(this);
  let charInput = textarea.val();
  let currentCount = 140 - charInput.length;
  
  counter.text(currentCount);
  

})

});