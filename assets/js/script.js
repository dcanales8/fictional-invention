      //questions/answers and buttons
      var boxQuestionEl = document.getElementById("question-box");
      var boxStartEl = document.getElementById("starter-box");
      var boxEndEl = document.getElementById("end-box")
      var boxScoreEl = document.getElementById("score-banner")
      var formInitials = document.getElementById("initials-form")
      var boxHighScoresEl = document.getElementById("high-score-box")
      var ViewHighScoreEl = document.getElementById("view-high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      var correctEl = document.getElementById("correct")
      var wrongEl = document.getElementById("wrong")
      var btnStartEl = document.querySelector("#start-game");
      var btnGoBackEl = document.querySelector("#go-back")
      var btnClearScoresEl = document.querySelector("#clear-high-scores")
      var questionEl = document.getElementById("question")
      var answerbuttonsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timeleft;
      var gameover
      timerEl.innerText = 0;

      //High Scores
      var HighScores = [];

       //array for questions 
      var arrayShuffledQuestions
      var QuestionIndex = 0

    
      
      // Quiz questions
      var questions = [
        { q: 'What does OOP mean?', 
          a: '4. Object-Oriented Programming', 
          choices: [{choice: '1. Overproof Programming'}, {choice: '2. Open Order Progress'}, {choice: '3. Optioned-Open Programming'}, {choice: '4. Object-Oriented Programming'}]
        },
        { q: 'What type of data represents text, denoted by single quotes, double quotes, or backticks?', 
          a: '3. string', 
          choices: [{choice: '1. boolean'}, {choice: '2. number'}, {choice: '3. string'}, {choice: '4. symbols'}]
        },
        { q: 'What type of statement incorporates a IF and ELSE statements?', 
          a: '1. conditional', 
          choices: [{choice: '1. conditional'}, {choice: '2. boolean'}, {choice: '3. class'}, {choice: '4. logic'}]
        },
        { q: 'What is the correct way to call a function?', 
          a: '4. function()', 
          choices: [{choice: '1. const function'}, {choice: '2. function'}, {choice: '3. call (function)'}, {choice: '4. function()'}]
        },
        { q: 'What is the name of the most commonly used code respository platform', 
          a: '1. github', 
          choices: [{choice: '1. github'}, {choice: '2. repoplace'}, {choice: '3. codeCave'}, {choice: '4. CodeCafe'}]
        },
        { q: 'What does HTML stand for?', 
          a: '2. Hypertext Markup Language', 
          choices: [{choice: '1. Happy Time Markdown Lanes'}, {choice: '2. Hypertext Markup Language'}, {choice: '3. Hypertext Markdown Language'}, {choice: '4. None of the above'}]
        },
        { q: 'What does CSS mean?', 
          a: '2. Cascading Style Sheets', 
          choices: [{choice: '1. Cotton Soft Styles'}, {choice: '2. Cascading Style Sheets'}, {choice: '3. Computer Solid State'}, {choice: '4. Conditional Style Sheets'}]
        },
      ];
      
        //if go back button is hit on high score page
    var renderStartPage = function () {
        boxHighScoresEl.classList.add("hide")
        boxHighScoresEl.classList.remove("show")
        boxStartEl.classList.remove("hide")
        boxStartEl.classList.add("show")
        boxScoreEl.removeChild(boxScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    //check if game-over or time up Start time at 30. 
    var setTime = function () {
        timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        //add classes to show/hide start and quiz screen
        boxStartEl.classList.add('hide');
        boxStartEl.classList.remove('show');
        boxQuestionEl.classList.remove('hide');
        boxQuestionEl.classList.add('show');
        //Shuffle the questions
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    
    //set next question for quiz
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

    //remove answer buttons
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    //display question information (including answer buttons)
    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };
    //display correct! on screen
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  
    //display wrong! on screen
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    //check if answer is correct    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 7
            }

            else {
              answerWrong()
              score = score - 1;
              timeleft = timeleft - 3;
          };

        //go to next question, check if there is more questions
          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

        //Display total score screen at end of game
    var showScore = function () {
        boxQuestionEl.classList.add("hide");
        boxEndEl.classList.remove("hide");
        boxEndEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        boxScoreEl.appendChild(scoreDisplay);
    }       
    
    //create high score values
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

      //push and sort scores
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    //clear visibile list to resort
    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }
    //save high score
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    //load values/ called on page load
    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    //display high score screen from link or when intiials entered
    var displayHighScores = function() {

        boxHighScoresEl.classList.remove("hide");
        boxHighScoresEl.classList.add("show");
        gameover = "true"

        if (boxEndEl.className = "show") {
            boxEndEl.classList.remove("show");
            boxEndEl.classList.add("hide");
            }
        if (boxStartEl.className = "show") {
            boxStartEl.classList.remove("show");
            boxStartEl.classList.add("hide");
            }
            
        if (boxQuestionEl.className = "show") {
            boxQuestionEl.classList.remove("show");
            boxQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }
    //clears high scores
    var clearScores = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      //on start click, start game
      btnStartEl.addEventListener("click", startGame)
      //on submit button -- enter or click
      formInitials.addEventListener("submit", createHighScore)
      //when view high-scores is clicked
      ViewHighScoreEl.addEventListener("click", displayHighScores)
      //Go back button
      btnGoBackEl.addEventListener("click", renderStartPage)
      //clear scores button
      btnClearScoresEl.addEventListener("click", clearScores)
