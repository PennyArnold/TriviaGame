

//it should display the questions in the HTML
//questions can be an object with properties than include all possible answers
//it should have an event that makes something happen when the user chooses a button
//buttons should toggle with only one option to select for each question
//it should diplay if you got the answer right or wrong
//it should display the correct answer
//after the user completes all answers, game needs to restart

$( document ).ready(function() {

//it should have questions with answers to chose from and some pictures like the sandwiches exercise
var myQuestions = [
  {
    question: "How many times have Frasier and Roz hooked up?",
    choice: ["once", "twice", "never", "every time Lillith shows up"],
    answer: 0,
    photo: "assets/images/hookup.jpg"
  },
  {
    question: "What’s Martin Crane’s favorite brand of beer?",
    choice: ["Ballantine", "Mad Dog", "Schlitz Malt Liquor", "Michelob Ultra"],
    answer: 0,
    photo: "assets/images/beer.webp"
  },
{
    question: "Frasier was the spin-off of what TV sitcom?", 
    choice: ["Friends", "The Simpsons", "Cheers", "The Cosby Show"],
    answer: 2,
    photo: "assets/images/cheers.jpg"
   },
   {
     question:  "Who was Frasier's producer?", 
    choice: ["Roz Doyle", "Poppy Jeffries", "Joy Kingdom", "Loni Anderson"],
    answer: 0,
    photo: "assets/images/roz.jpg"
   }, 
   {
     question:  "Who was Frasier's first wife?",
    choice: ["Roz Doyle", "Lillith Sternin", "Diane Chambers", "Marge Simpson"],
    answer: 1,
    photo: "assets/images/lillith.png"
  }, 
  {
    question: "What’s Eddie the dog’s fulll name?", 
    choice: ["Sweaty Eddie", "Eddie Vedder", "Edward Scissorhands", "Eddie Spaghetti" ],
    answer: 3,
    photo: "assets/images/eddie.jpg"
  }, 
  {
    question: "Which Cheers co-star did not appear on Frasier?", 
    choice: ["Sam Malone (Ted Danson)", "Diane Chambers (Shelli Long)", "Rebecca Howe (Kirsti Alley)", "Cliff Clavin (John Rastenburger)" ],
    answer: 2,
    photo: "assets/images/kirstie.jpg"
  }, 
  {
    question: "What language is Frasier tricked into delivering Frederick’s bar mitzvah speech in?", 
    choice: ["German", "Yiddish", "Klingon", "Elvish"],
    answer: 2,
    photo: "assets/images/frederick.webp"
  }, 
  {
    question: "What kind of psychologist is Frasier?", 
    choice: ["Freudian", "Jungian", "Belgian", "Behavioral"],
    answer: 0,
    photo: "assets/images/freud.jpg"
  }, 
  {
    question: "What’s Frasier’s main hangout?", 
    choice: ["Café Nervosa", "Le Cigar Volant", "McGintey’s","Central Perk"],
    answer: 0,
    photo: "assets/images/coffee.webp"
  }];

  //set up all of my global variables
  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 10;
  var intervalId;
  var userGuess ="";
  var running = false;
  var qCount = myQuestions.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

//this hides the start again button
  $("#reset").hide();

//this function uses a click event to start game
  $("#start").on("click", function () {
    //hides the start button on click
      $("#start").hide();
    //calls the displayQuestion function
      displayQuestion();
    //initiates the runTimer function  
      runTimer();
    //initiates the loop to run through the questions and pushes them into the holder array  
      for(var i = 0; i < myQuestions.length; i++) {
    holder.push(myQuestions[i]);
  }
    })
  //this function starts the timer
  function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
  }
  //this function sets the timer to display and count down  
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
  
    //stops timer if it reaches 0 due to no answer and displays the times up
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#theAnswers").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }	
  }
  
  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //randomly pick question in array if not already shown
  //display question and loop though and display possible answers
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random()*myQuestions.length);
    pick = myQuestions[index];
  
  //	if (pick.shown) {
  //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
  //		displayQuestion();
  //	} else {
  //		console.log(pick.question);
      //iterate through answer array and display
      $("#quiz").html("<h2>" + pick.question + "</h2>");
      for(var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.choice[i]);
        //assign array position to it so can check answer
        userChoice.attr("data-guessvalue", i);
        $("#theAnswers").append(userChoice);
    }
  
  
  
  //click function to select answer and outcomes
  $(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));
  
    //correct guess or wrong guess outcomes
    if (userGuess === pick.answer) {
      stop();
      correctCount++;
      userGuess="";
      $("#theAnswers").html("<p>Correct!</p>");
      hidepicture();
  
    } else {
      stop();
      wrongCount++;
      userGuess="";
      $("#theAnswers").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }
  })
  }
  
  
  function hidepicture () {
    $("#theAnswers").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    myQuestions.splice(index,1);
  
    var hidpic = setTimeout(function() {
      $("#theAnswers").empty();
      timer= 10;
  
    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
      $("#quiz").empty();
      $("#quiz").html("<h3>Game Over!  Here's how you did: </h3>");
      $("#theAnswers").append("<h4> Correct: " + correctCount + "</h4>" );
      $("#theAnswers").append("<h4> Incorrect: " + wrongCount + "</h4>" );
      $("#theAnswers").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
      $("#reset").show();
      correctCount = 0;
      wrongCount = 0;
      unanswerCount = 0;
  
    } else {
      runTimer();
      displayQuestion();
  
    }
    }, 3000);
  
  
  }
  
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#theAnswers").empty();
    $("#quiz").empty();
    for(var i = 0; i < holder.length; i++) {
      myQuestions.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  
  })
  
  })