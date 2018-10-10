$(document).ready(function() {
  
let textarea = $('textarea')
let counter = textarea.siblings('.counter');

textarea.on('input', function(){

  let textarea = $(this);
  let charInput = textarea.val();
  let currentCount = 140 - charInput.length;
  

  counter.text(currentCount);

  if (currentCount <= 0) {
    counter.addClass("counterRed")
    
  } else if(currentCount > 0) {
    counter.removeClass("counterRed")
  }

})

});