// References
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
let quizArray = []; // Now an empty array that will be filled with data from API

// Fetch quiz data from API
const fetchQuizData = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple'); // Replace with your API endpoint
        const data = await response.json();

        // Transform the API data to match the expected format
        quizArray = data.results.map((item, index) => ({
            id: index.toString(),
            question: item.question,
            options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
            correct: item.correct_answer,
        }));
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
};

// Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        // Increment questionCount
        questionCount += 1;
        // If last question
        if (questionCount === quizArray.length) {
            // Hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            // User score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
            nextBtn.innerHTML = "Submit";
        } else {
            // Display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            // Display quiz
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

// Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count === 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    // Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // Display current question card
    quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
    // Randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    // Generate quiz
    for (let i of quizArray) {
        // Randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        // Quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        // Question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        // Question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        // Options
        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    // If user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        // For marking the correct option
        options.forEach((element) => {
            if (element.innerText === quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    // Clear interval(stop timer)
    clearInterval(countdown);
    // Disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Initial setup
async function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    await fetchQuizData(); // Fetch the data from API
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// When user clicks on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
