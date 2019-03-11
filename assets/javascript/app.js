var questionList = [
    {
        question: 'What is the first line said in "The Office"?',
        options: ['"All right Jim, your quarterlies look very good."', '"People say I am the best boss."', '"Dunder Mifflin, this is Pam"', '"Any messages?"'],
    },
    {
        question: 'According to Dwight, nostalgia is one of the greatest human weaknesses, second only to what?',
        options: ['the neck', 'soft bellies', 'emotion', 'weak eyesight'],
    },
    {
        question: "Which of these is one of Ryan's companies?",
        options: ['Wupf', 'Twitcog', 'Silicorp', 'Blogy'],
    },
    {
        question: "Why does Michael grill his foot?",
        options: ['He likes the smell of bacon in the morning', 'He was trying to show off', 'He lost a bet with Packer', 'To show the grill was not hot']
    },
    {
        question: "What is Erin's real name?",
        options: ['Kelly', 'Angela', 'Rebecca', 'Monica']
    },
    {
        question: "Who is Plop?",
        options: ["Pete", "Andy", "Clark", "Toby"]
    },
    {
        question: "Where was Erin's room when she was growing up?",
        options: ["Her hair", "A broom closet", "The inside of her sweatshirt", "At the top of a stone tower"]
    },
    {
        question: "Which is NOT one of Jim's pranks?",
        options: ["He programmed the 9 on Dwight's phone to speed-dial Hong Kong", "Convinces Dwight to buy magic beans", "Linked his headset to Dwight's phone", "Lego Desk"]
    },
    {
        question:"What does Todd Packer's license plate say?",
        options:["WLHUNG","BGWILLY","BLZDEEP","L8RLSR"]
    },
    {
        question: "Which of Michael's comedy performances resulted in 'Diversity Day'?",
        options: ["the Chris Rock routine","Ping","Bill Cosby impression","Using Darryl's made up lingo"]
    }
]
var score = 0;
var quesInc = -1;
var answerBtns = $(".answerBtn");
answerBtns.hide();
$("#timer").hide();
var number = 31;
var intervalId;
function setup() {
    for (i = 0; i < questionList.length; i++) {
        questionList[i].answer = questionList[i].options[0]
    }
}
setup()

function randomShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};


function displayOptions(index) {
    options = randomShuffle(questionList[index].options)
    for (i = 0; i < answerBtns.length; i++) {
        $(answerBtns[i]).text(questionList[index].options[i])
    };
    return index;
};


function gradeInput() {
    userInput = this;

    if (userInput.innerHTML === questionList[quesInc].answer) {
        $(this).css("background-color", "green")
        score++;
    }
    else {
        $(this).css("background-color", "red")
    }

    setTimeout(render, 1500);
    clearInterval(intervalId);

}


$(".answerBtn").on("click",
    gradeInput);

$(".startBtn").on("click", render);

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(timer, 1000);
}

function timer() {
    --number;

    console.log(number)
    $("#timer").html(`Time left: ${number}`)
    if (number === 0) {
        clearInterval(intervalId);
        //alert("Time's up!")      
        render();
    }

}

function endGame() {
    $("#welcome").empty()
    $("#welcome").append("<h1></h1>")
    $("#welcome").append("<h3 id='domQuestion'></h3>")
    $("#welcome").append("<h4 id='timer'></h4>")
    answerBtns.hide()
    $("h1").text("Quiz over!");
    $("h3").text(`Your score is ${score}/${questionList.length}`);
    $("h4").text(`Percentage correct: ${(score / questionList.length).toFixed(2)}`);
    clearInterval(intervalId);
}



function render() {
    $("#welcome").empty()

    answerBtns.show();

    for (i = 0; i < answerBtns.length; i++) {
        document.getElementsByClassName('answerBtn')[i].style.backgroundColor = null
    }
    $("#welcome").append("<h1></h1>")
    $("#welcome").append("<h3 id='domQuestion'></h3>")
    $("#welcome").append("<h4 id='timer'>Time left: </h4>")
    $("timer").show();
    $("#welcome").append("<hr>")
    $("h1").text(`question #${++quesInc + 1}:`)
    if (quesInc >= questionList.length) {
        endGame();
    }

    $("h3").text(questionList[quesInc].question)
    displayOptions(quesInc)
    number = 31;
    run();
};
