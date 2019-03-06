var questionList = [
    {
        question: 'test',
        options: ['a', 'b', 'c', 'd'],
        answer: 'd'
    },
    {
        question: 'test2',
        options: ['a', 'b', 'c', 'd'],
        answer: 'd'
    },
    {
        question: 'test3',
        options: ['a', 'b', 'c', 'd'],
        answer: 'd'
    }
]
var score = 0;
var quesInc = -1;
var answerBtns = $(".answerBtn");
answerBtns.hide();
$("#timer").hide();
var number = 16;
var intervalId;


//shuffles the items in an array
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
    $("h4").text(`Percentage correct: ${score / questionList.length}`);
    clearInterval(intervalId);
}



function render() {
   
    $("#welcome").empty()
    answerBtns.show()
    for (i = 0; i < answerBtns.length; i++) {
        document.getElementsByClassName('answerBtn')[i].style.backgroundColor = null
    }
    $("#welcome").append("<h1></h1>")
    $("#welcome").append("<h3 id='domQuestion'></h3>")
    $("#welcome").append("<h4 id='timer'>Time left: </h4>")
    $("timer").show();
    $("#welcome").append("<hr>")
    $("h1").text(`question #${++quesInc+1}:`)
    if (quesInc >= questionList.length) {
        endGame();
    }
 
    $("h3").text(questionList[quesInc].question)
    displayOptions(quesInc)
    number = 16;
    run();
};
