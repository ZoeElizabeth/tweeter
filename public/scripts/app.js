$(document).ready(function() {

  //Hide error messages unless they are a result
  $('.charError').hide();
  $('.emptyError').hide();


  //Toggle compose tweet with button
  $( "#nav-bar button" ).click(function() {
    $( ".new-tweet" ).slideToggle("slow");
    $('.textarea').focus()
  });

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
    // let $submitInput = $('.new-tweet section');

    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetJSON) {
      renderTweets(tweetJSON);
      // $submitInput.replaceWith(tweetJSON);
    });

  //   $.ajax('/tweets', { method: 'GET' })
  //   .then(renderTweets);
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
    let $tweet = $('<article>').addClass('tweet');
    let $bubbleHeader = $('<header>').addClass('bubbleHeader');
    let $profilePicture = $('<img>').addClass('profilePicture').attr("src", tweet.user.avatars.small);
    let $username = $('<name>').addClass('username').text(tweet.user.name); 
    let $handle = $('<handle>').addClass('handle').text(tweet.user.handle);
    let $tweetContent = $('<div>').addClass('tweetContent').text(tweet.content.text);
    let $createdAt= $('<span>').addClass('createdAt').text(tweet.created_at);
    let $bubbleFooter = $('<footer>').addClass('bubbleFooter');
    let $hiddenFlag = $('<img>').addClass('hideIcon').attr("src", "/images/flag.png");
    let $hiddenHeart = $('<img>').addClass('hideIcon').attr("src", "/images/heart.png");
    let $hiddenReblog = $('<img>').addClass('hideIcon').attr("src", "/images/reblog.png");
    
    $bubbleHeader.append($profilePicture, $username, $handle)

    $bubbleFooter.append($createdAt, $hiddenReblog, $hiddenHeart, $hiddenFlag )
    
    $tweet.append($bubbleHeader, $tweetContent, $bubbleFooter)

    return $tweet;
  }


  loadTweets()
  
});