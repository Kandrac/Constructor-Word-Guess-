
var Word = require("./word.js");
var inquirer = require("inquirer");


var letterArray = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

var avengers = ["agent coulson",  "iron Man", "war machine",  "nick fury",  "captain america", "black widow", 
"rocket","hulk","thor","black widow","hawkeye","vision","scarlet witch","falcon","ant man","bucky","black panther",
"spider man","doctor strange","captain marvel","gamora","drax","groot","star lord","stan lee"];


var randomIndex = Math.floor(Math.random() * avengers.length);
var randomWord = avengers[randomIndex];

computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];
var guessesLeft = 15;

function   avengerInitiative() {

    
    if (requireNewWord) {
        
        var randomIndex = Math.floor(Math.random() * avengers.length);
        var randomWord = avengers[randomIndex];

        computerWord = new Word(randomWord);
        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);
    

    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z to guess the Avenger!",
                    name: "userinput"
                }
            ])
            .then(function (input) {


                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                      avengerInitiative();
                } else {


                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                          avengerInitiative();
                    } else {

                        var wordCheckArray = [];


                        computerWord.userGuess(input.userinput);
                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");

                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");

                            correctLetters.push(input.userinput);
                        }

                        computerWord.log();

                        
                        console.log("Guesses Left: " + guessesLeft + "\n");
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        
                        if (guessesLeft > 0) {
                              avengerInitiative();
                        } else {
                            console.log("Thanos has Vanquished You!\n");

                            restartGame();
                        }



                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU have Defeated Thanoss!\n");

        restartGame();
    }


    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}
   
function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                  avengerInitiative();
            } else {
                return
            }
        })
}

  avengerInitiative();