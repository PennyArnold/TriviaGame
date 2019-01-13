

//it should display the questions in the HTML
//questions can be an object with properties than include all possible answers
//it should have an event that makes something happen when the user chooses a button
//buttons should toggle with only one option to select for each question
//it should diplay if you got the answer right or wrong
//it should display the correct answer
//after the user completes all answers, game needs to restart

$( document ).ready(function() {

//it should have questions with an array of answers to chose from    


//it should have a timer that counts down the entire game
// This code will run as soon as the page loads
window.onload = function() {
    $("#start").on("click", start);
    $("#stop").on("click", stop);
  };

  //  Variable that will hold our function that runs the timer
    var timer;

// prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    var time = 0;

    function reset() {

        time = 0;
        
     //Change the "display" div to "00:00."
        $("#counter").text("00:00");
      
     }

     function start() {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
          timer = setInterval(count, 1000);
          clockRunning = true;
        }
      }

      function stop() {
        // Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(timer);
        clockRunning = false;
      }

      function count() {

        // increment time by 1,
        time++;
      
        // Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(time);
        console.log(converted);
      
        // variable to show the converted time in the "display" div.
        $("#counter").text(converted);
      }
      function timeConverter(t) {
      
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
      
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
      
        if (minutes === 0) {
          minutes = "00";
        }
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }
      
        return minutes + ":" + seconds;
      }
      










});


