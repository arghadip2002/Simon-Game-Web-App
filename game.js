var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var key = true;

$(document).on("keydown", function () {
  if (key) {
    nextSequence();
    key = false;
  }
});

$(".btn").click(handler);

function handler() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").html("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // using .animate() property
  // .animate(
  //   {
  //     opacity: 0.5,
  //   },
  //   100
  // )
  // .animate(
  //   {
  //     opacity: 1,
  //   },
  //   100
  // );
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(animateColour) {
  $("." + animateColour).addClass("pressed");
  setTimeout(function () {
    $("." + animateColour).removeClass("pressed");
  }, 100);

  // function out() {
  //   $("." + animateColour).removeClass("pressed");
  // }
  // setTimeout(out, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("Fail");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];

  level = 0;
  key = true;
}
