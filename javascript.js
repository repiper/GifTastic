// 


$(document).ready(function() {
    //Array for searched topics to be added
    var topics = ["Turtle", "Giraffe", "Koala", "Sloth", "Bunny", "Octopus", "Monkey", 
                           "Moose", "Kangaroo"];
    
        //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
      //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
         function displayAnimal() {
    
        var x = $(this).data("search");
        console.log(x);
    
            //javascript, jQuery

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=PG7QXHjyyxBuu7zgroGrJFjMC934npWS";
    
        console.log(queryURL);
    
            //above didn't work, tryanother method..
            var api = "http://api.giphy.com/v1/gifs/search";
            var apiKey = "&api_key=PG7QXHjyyxBuu7zgroGrJFjMC934npWS";
            var query = "animals";
            function setup () {
            noCanvas();
            var url = api + apiKey + query;
            loadJSON (url, gotData);
}

        function gotData(giphy) {
            for (var i = 0; i < giphy.data.length; i++) {
             createImageBitmap(giphy.data[i].images.original.url);
    }   
}
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var gifDiv = $("<div>");
                gifDiv.addClass=("gifDiv");
                
                //pull rating of gif
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var gifImage = $("<img>");
                var gifRating = $("<p>").text("Rating: " + results[i],rating);
                gifDiv.append(gifRating);
                //pull gif
    
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
      //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#addAnimal").on("click", function(event) {
            event.preventDefault();
            var newAnimal = $("#animalInput").val().trim();
            topics.push(newAnimal);
            console.log(topics);
            $("#animalInput").val('');
            displayButtons();
          });
    
      //Function iterates through topics array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "animal");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
    
      displayButtons();
    
      //Click event on button with id of "animal" executes displayAnimal function
      $(document).on("click", "#animal", displayAnimal);
    
      //Click event on gifs with class of "animalGiphy" executes pausePlayGifs function
      $(document).on("click", ".animalGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    })
    
    });