$(document).ready(function() {
    // Array of topics to search for
    var topics = ["Darth Vader", "Luke Skywalker", "Boba Fett", "Yoda", "Leia Organa", "Han Solo", "Chewbacca", "Obi Wan Kenobi"];

    /// ALL FUNCTIONS

    //Function to display info on the topics by calling an API and retrieving the info 
    function displayInfo(){
      $('#SW-view').empty();
      var topic = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=QW9awswzmF8V3po028ODeAExjLcNjgzN&limit=10';
                    //API key delete after (make sure you dont enter incorrect one QW9awswzmF8V3po028ODeAExjLcNjgzN)
      // AJAX call to GET information 
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        // If no information on topics is found, it alerts the user
        if (response.pagination.total_count == 0) {
          alert('Sorry, there are no Gifs for this topic');
          var itemindex = topics.indexOf(topic);
          // otherwise display button
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
            }
        }
        
        // Save response from API call (JSON) to variable (results)
        var results = response.data;
        for (var i = 0; i < results.length; i++){
          // Create new Div
          var newTopicDiv = $("<div class='SW-gif'>");
          // Save responses from API into variables and add to DOM:
          // GIF Rating
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          // GIF Title
          var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
          // GIF URL
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');
          gif.attr('src', gifURL);
          gif.attr('data-still', results[i].images.fixed_height_still.url);
          gif.attr('data-animate', results[i].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass ('animate-gif');
          // Appending info 
          newTopicDiv.append(pRating);
          newTopicDiv.append(pTitle);
          newTopicDiv.append(gif);
           // Putting the saved info to new div
          $('#SW-view').prepend(newTopicDiv);
        } 
      });
    };
    
    // Function for displaying buttons
    function renderButtons() {
      // Deletes the movies prior to adding new movies
      $('.buttons-view').empty();
      // Loops through the array of topics to create buttons for all topics
      for (var i = 0; i < topics.length; i++) {
        var createButtons = $('<button>');
        createButtons.addClass('topic btn btn-info');
        createButtons.attr('data-name', topics[i]);
        createButtons.text(topics[i]);
        $('.buttons-view').append(createButtons);
      }
    }
    // Function to play or still Gif images
    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    ///EVENT LISTENERS aka CLICK EVENTS
    // Click on the submit button to add a new  button
    $("#add-SWC").on("click", function(event) {
      event.preventDefault();
      // capture input from the form (SWG= Star Wars Gif)
      var SWG = $("#SWG-input").val().trim();
      // check if topic exsits already
      if (topics.toString().toLowerCase().indexOf(SWG.toLowerCase()) != -1) {
        alert("Topic already exists");
      }
      else {
        topics.push(SWG);
        renderButtons();
      }
    });
    //I added a submit button so that instead of clicking a button to add a GIF it would add them according to the string listed with different star wars topics.
    //Trying to get submit button to work but cannot get it to pull any information from the API. I'm not sure where I have it wrong.
    // Click on button to display SWG Gifs and other info from API
    $(document).on("click", ".topic", displayInfo);
    // Click on the Gif image to animate or make it still
    $(document).on("click", ".animate-gif", playGif);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();


});