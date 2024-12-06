//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let backBtn = document.getElementById("back-button");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which of the following tool is used to generate API documentation in HTML format from doc comments in source code?",
        options: ["javap tool", "javaw command", "javadoc tool", "javah command"],
        correct: "javadoc tool",
    },
    {
        id: "1",
        question: "In which process, a local variable has the same name as one of the instance variables?",
        options: ["Serialization", "Variable Shadowing", "Abstraction", "Multi-threading"],
        correct: "Variable Shadowing",
    },
    {
        id: "2",
        question: "Which of the following option leads to the portability and security of Java?",
        options: ["Bytecode is executed by JVM", "The applet makes the Java code secure and portable", "Use of exception handling", "Dynamic binding between objects"],
        correct: "Bytecode is executed by JVM",
    },
    {
        id: "3",
        question: "Which of the following is not a Java features?",
        options: ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"],
        correct: "Use of pointers",
    },
    {
        id: "4",
        question: "_____ is used to find and fix bugs in the Java programs.",
        options: ["JVM", "JRE", "JDK", "JDB"],
        correct: "JDB",
    },
    {
        id: "5",
        question: "Automatic type conversion is possible in which of the possible cases?",
        options: ["Byte to Int", "Int to Long", "Long to Int", "Short to Int"],
        correct: "Int to Long",
    }, {
        id: "6",
        question: "Find the output of the following code.\nint Integer = 24;\nchar String  = ‘I’;\nSystem.out.print(Integer);\nSystem.out.print(String);",
        options: ["Compile Error", "Throws Exception", "I", "24 I"],
        correct: "24 I",
    },
    {
        id: "7",
        question: "Select the valid statement.",
        options: ["char[] ch=new char(5)", "char[] ch=new char[5]", "char[] ch=new char()", "char[] ch=new char[]"],
        correct: "char[] ch=new char[5]",
    },
    {
        id: "8",
        question: "When is the object created with new keyword?",
        options: ["At Run time", "At Compile time", "Depends on the code", "None"],
        correct: "At Run time",
    },
    {
        id: "9",
        question: "Identify the keyword among the following that makes a variable belong to a class,rather than being defined for each instance of the class.",
        options: ["final", "static", "volatile", "abstract"],
        correct: "volatile",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {

            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
            nextBtn.innerHTML = "Submit";
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
        if (questionCount > 0) {
            backBtn.classList.remove("hide");
        }
    })
);


backBtn.addEventListener(
    "click",
    () => {
        // Decrement questionCount
        questionCount -= 1;

        // If first question
        if (questionCount < 0) {
            questionCount = 0;
        }

        // Display questionCount
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
        // Display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();

        if (questionCount === 0) {
            backBtn.classList.add("hide");
        }
    }
);

backBtn.classList.add("hide");


//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};