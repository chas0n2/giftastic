 // Array of topics to search for
 var topics = ["Darth Vader", "Luke Skywalker", "Boba Fett", "Yoda", "Leia Organa", "Han Solo", "Chewbacca", "Obi Wan Kenobi"];

 function displayInfo() {
     $('#SW-view').empty();
     $('#buttons-view').empty();
     for (let i = 0; i < topics.length; i++) {
         $('#buttons-view').append('<button class="button">' + topics[i] + '</button>')
     };

 };

 displayInfo();

 $(document).on('click', '#add-SW', function(event) {
     event.preventDefault();
     $('#buttons-view').empty
     var searchTerm = $('#gif-input').val().trim();
     findGif(searchTerm);
     topics.push(searchTerm);
     console.log('button value: ', searchTerm)

     displayInfo();
 });

 $(document).on('click', 'button', function() {
     var getButton = $(this).text();
     findGif(getButton);
     $('#add-SW').empty();

 });

 $(document).on('click', '.gif', function() {
     var first = $(this).attr('src');
     var second = $(this).attr('otherURL');
     $(this).attr('src', second);
     $(this).attr('otherURL', first);
 });

 function findGif(searchTerm) {
     var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=QW9awswzmF8V3po028ODeAExjLcNjgzN&limit=10';

     $.ajax({
             url: queryURL,
             method: "GET"
         })
         .then(function(response) {
             $('#SW-display').empty();
             var results = response.data;
             for (var i = 0; i < results.length; i++) {
                 // Create new Div
                 var newTopicDiv = $("<div>");

                 var pRating = $('<p>').text('Rating: ' + results[i].rating.toUpperCase());
                 pRating.attr('class', 'rating')
                     // GIF Title
                     // var pTitle = $('<p>').text('Title: ' + results[i].title.toUpperCase());
                     // GIF URL
                 var gif = $('<img>');
                 gif.attr('src', results[i].images.fixed_height_still.url);
                 gif.attr('class', 'gif');
                 gif.attr('otherURL', results[i].images.fixed_height.url);

                 newTopicDiv.prepend(gif);
                 newTopicDiv.prepend(pRating);
                 $('#SW-display').prepend(gif);

                 // var gifURL = results[i].images.fixed_height_still.url;

             }
         });
 };





 ///EVENT LISTENERS aka CLICK EVENTS
 // Click on the submit button to add a new  button
 // $("#add-SWC").on("click", function(event) {
 //     event.preventDefault();
 //     // capture input from the form (SWG= Star Wars Gif)
 //     var SWG = $("#SWG-input").val().trim();
 //     // check if topic exsits already
 //     if (topics.toString().toLowerCase().indexOf(SWG.toLowerCase()) != -1) {
 //         alert("Topic already exists");
 //     } else {
 //         topics.push(SWG);
 //         renderButtons();
 //     }
 // });
 // 