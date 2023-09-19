 console.log("welcome to jquery");
 
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
  ];
  
  const questionElement = document.getElementById("question");
  const ansbutton = document.getElementById("ans-btn");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
  
    if (currentQuestionIndex < questions.length) {
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
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
    } else {
      // All questions answered
      questionElement.innerHTML = "Quiz Completed! Your Score: " + score + "/" + questions.length;
      ansbutton.innerHTML = ""; // Clear answer buttons
      //nextButton.style.display = "non"; // Hide the next button
      nextButton.innerHTML="Play Again";
      
    
    }
  
  }
  
  function resetState() {
    // nextButton.style.display = "none";
  
    while (ansbutton.firstChild) {
      ansbutton.removeChild(ansbutton.firstChild);
    }
    
  }
  
  function selectAnswer(e) {
   // if (!nextButton.style.display) {
    //  nextButton.style.display = "block"; // Show the next button after an answer is selected

  
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
  
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } 
    else {
      selectedBtn.classList.add("incorrect");
    }
     Array.from(ansbutton.children).forEach(button=>{
      if(button.dataset.correct==="true"){
        button.classList.add("correct");
      }
      button.disabled=true;
     });
     nextButton.style.display="block";
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
  
   
  
  });
  
  startQuiz();
  