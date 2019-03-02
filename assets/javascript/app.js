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
var quesInc = 0;
var answerBtns = $(".answerBtn");
answerBtns.hide();

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
        alert("Correct");
    }
    else{
        alert("Nope sorry");    
    }

    quesInc++;
    setTimeout(render, 1500);
;}


$(".answerBtn").on("click",
    gradeInput);

$(".startBtn").on("click", render);


function render() {
    $("#welcome").empty()
    answerBtns.show()
    $("#welcome").append("<h1></h1>")
    $("#welcome").append("<h3></h3>")
    $("h1").text(`question #${quesInc + 1}:`)
    $("h3").text(questionList[quesInc].question)
    displayOptions(quesInc)
};