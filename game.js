    var buttonColors = ["red","blue","green","yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var userChosenColor = "";
    var level = 0;
    var currentLevel = 1;
    
    $(document).keypress(function(){
        setTimeout(nextSequence,2000);
        $("h1").text("Level "+level);
    });
        
    $(".btn").click(function(e){
        var idClicked = e.target.id;
        userChosenColor = idClicked;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        //activateColor(userChosenColor);
        checkAnswer(userChosenColor);
        
    });

    function startOver(){
        gamePattern = [];
        userClickedPattern =[];
        level = 0;
        currentLevel = 1;
    }
    
    function activateColor(color){
        $("#"+color).fadeOut(50).fadeIn(50);
        playAudio(color);
    }
    
    function nextSequence(){
        $("h1").text("Level "+level);
        var randomNumber = Math.floor(Math.random() * 4);
        randomChosenColor = buttonColors[randomNumber];
        activateColor(randomChosenColor);
        gamePattern.push(randomChosenColor);
    }

    function playAudio(color){
        var audio = new Audio("sounds/"+color+".mp3");
        audio.play();
    }

    function animatePress(color){
        playAudio(color);
        $("#"+color).addClass("pressed");
        setTimeout(function(){$("#"+color).removeClass("pressed");} ,100);
    }

    function checkAnswer(userColor){
        if(userColor === gamePattern[currentLevel-1]){
            if(currentLevel <= level){
                currentLevel++;
            } else {
                setTimeout(nextSequence,2000);
                level++;
                currentLevel = 1;
                userClickedPattern =[];
            }
      
        } else {
            $("h1").text("Press any key to restart the game");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){$("body").removeClass("game-over");} ,100);
            startOver();
        }
            
    }

        
    
