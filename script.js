console.log("Welcome to jQuery");

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: true },
            { text: "Arctic", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
        ],
    },
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ],
    },
];

// Element references
const questionElement = document.getElementById("question");
const ansbutton = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");
const skipButton = document.getElementById("skip-btn");
const prevButton = document.getElementById("prev-btn");
const completionAudio = document.getElementById("completion-audio");
const correctAudio = document.getElementById("correct-audio");

// State variables
let currentQuestionIndex = 0;
let score = 0;
let visited = Array(questions.length).fill(false); // Track visited questions

// Initialize the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    visited.fill(false);
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Display the current question and its answers
function showQuestion() {
    resetState();

    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        // Create answer buttons
        currentQuestion.answer.forEach((answer) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            ansbutton.appendChild(button);

            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }

            button.addEventListener("click", selectAnswer);
        });

        // Disable buttons for already visited questions
        if (visited[currentQuestionIndex]) {
            Array.from(ansbutton.children).forEach((button) => {
                button.disabled = true;
            });
        }

        // Handle navigation button visibility
        prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
        nextButton.style.display = "none";
        skipButton.style.display = "inline-block";
    } else {
        // Quiz completion screen
        questionElement.innerHTML = `Quiz Completed! Your Score: ${score}/${questions.length}`;
        ansbutton.innerHTML = ""; // Clear answer buttons
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
        skipButton.style.display = "none";
        prevButton.style.display = "none";

        // Play completion audio
        completionAudio.play();
    }
}

// Reset the answer button state
function resetState() {
    while (ansbutton.firstChild) {
        ansbutton.removeChild(ansbutton.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

        // Play correct answer audio
        correctAudio.currentTime = 0;
        correctAudio.play();
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Show the correct answer
    Array.from(ansbutton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after selection
    });

    visited[currentQuestionIndex] = true;
    nextButton.style.display = "inline-block";
    skipButton.style.display = "none";
}

// Handle "Next" button click
nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion();
    }
});

// Handle "Skip" button click
skipButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

// Handle "Previous" button click
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

// Start the quiz initially
startQuiz();
