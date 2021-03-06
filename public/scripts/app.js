$(document).ready(function() {

  //Hide error messages unless they are a result
  $('.charError').hide();
  $('.emptyError').hide();


  //Toggle compose tweet with button
  $( "#nav-bar button" ).click(function() {
    $( ".new-tweet" ).slideToggle("slow", function(){
       $('.textarea').focus()
    })
   
    
  })
  
  //make new tweet with ajax an input text
  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();

    //Grab form content from .new-tweet
    let inputData = $('.new-tweet form').serialize();
    let content = $('.new-tweet textarea').val()
    //prevent incorrect input
    if (content === null || content === ''){
      $('.emptyError').show('fast');
      $('.charError').hide();
    } else if (content.length > 140){
      $('.charError').show('fast');
      $('.emptyError').hide();
    }else {
    //submit post with Ajax
    $.ajax('/tweets', {
      method: 'POST',
      data: inputData,
    }).then(function() {

     //Reset tweet Input feild to default state
      $('.counter').text(140)
      $('.textarea').val('');
      $('.textarea').empty();
      $('.charError').hide();
      $('.emptyError').hide();

    //show new tweet
      return $.ajax('/tweets')
    }).then(renderTweets);
    } 
  });

  //Loading new tweets and rending them to page
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetJSON) {
      renderTweets(tweetJSON);
    });
  }

  function renderTweets(tweets) {
    
    for (let userData in tweets) {
    
      let tweet = tweets[userData];
      let newComment = createTweetElement(tweet)
    //adding tweet to top of list
        $('.tweets-container').prepend(newComment)
      }
    }


  function createTweetElement(tweet) {

    let $tweet = $('<article>')
    let $bubbleHeader = $('<header>')
    let $profilePicture = $('<img>').attr("src", tweet.user.avatars.small);
    let $username = $('<name>').text(tweet.user.name); 
    let $handle = $('<handle>').text(tweet.user.handle);
    let $tweetContent = $('<div>').text(tweet.content.text);
    let $bubbleFooter = $('<footer>')
    //Moment set for date and time
    let $createdAt= $('<span>').addClass('createdAt').text(moment(tweet.created_at).startOf("minute").fromNow());
    //Boot strap glyphicons
    let $hiddenFlag = $('<span>').addClass('glyphicon glyphicon-flag')
    let $hiddenHeart = $('<span>').addClass('glyphicon glyphicon-heart')
    let $hiddenReblog = $('<span>').addClass('glyphicon glyphicon-retweet')
    
    $bubbleHeader.append($profilePicture, $username, $handle)

    $bubbleFooter.append($createdAt, $hiddenReblog, $hiddenHeart, $hiddenFlag )
    
    $tweet.append($bubbleHeader, $tweetContent, $bubbleFooter)

    return $tweet;
  }


  loadTweets()
  
});