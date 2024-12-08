// This is JS code added in part-4 to add functionality to the quiz site.

// VARIABLES

// Array: stored question
// array consisting of many of the same components of a regular array, saved to a local placeholder.
// Used to display the current question.
// const questionStored = [
//     id: "",

// ]

// Array: historyArr
// array that stores completed questions inside localStorage, deleting if reset by the user.
const historyArr = [
    {
        category: "games",
        difficulty: "impossible",
        favourite: false,
        correct: false
    }
]

// Array difficultyArr
// stores all possible difficulties
const difficultyArr = [
    "Easy",
    "Medium",
    "Hard"
]

// const mainCard
// retrieves location of mainCard element
const mainCard = document.getElementById('mainCard');

// retrieve locally stored data if they exist
const historyCorrectLS = JSON.parse(localStorage.getItem('historyCorrect'));
const historyWrongLS = JSON.parse(localStorage.getItem('historyWrong'));

// variables that track the number of correct and incorrect answers if locally stored. If they are not locally stored, then set them to 0.
// const historyCorrect
let historyCorrect = historyCorrectLS || 0;
// const historyWrong
let historyWrong = historyWrongLS || 0;

// FUNCTIONS

// renderDifficulties()
// render the difficulty panel out using the items in difficultyArr
function renderDifficulties(){
    let mainCardHTML = `<h2 class="fw-bold text-white text-center">Select a Difficulty</h2> <div class="form-group bg-secondary fw-bold py-3 rounded-32 d-flex flex-column justify-content-around">`;

    difficultyArr.forEach(difficulty => {
        mainCardHTML += `<button type="button" class="btn btn-custom btn-custom-white d-block mb-2 fw-bold rounded-21 mx-auto"
        data-value = "${difficulty}"
        >${difficulty}</button>`;
    });

    mainCardHTML += `</div>`;

    mainCard.innerHTML = mainCardHTML;
}

renderDifficulties();

// difficulty.addEventListener
// upon selection of a difficulty with a button, send that difficulty to the callAPI function

// API CALL
// https://quizapi.io/api/v1/questions?apiKey=UCqX477QStxiLPDFgh5E8PupeMhLIKB7HzEvJgxP&difficulty=Medium&limit=1

// renderHistory()
// render the history out using the items in historyArr

// event listener for reset button in history, sets historyArr to []

// renderQuestion()
// render the question pulled from the API into the space occupied by the difficulty content.
// loop through available answers to create grid of answers.
// Display "submit"


// event listener on question buttons to select an answer

// event listener on submit button to submit answer, show correct answer, compare to selected answer and save to historyArr as a new question along with whether the question was selected properly or not.

