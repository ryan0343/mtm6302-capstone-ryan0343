// This is JS code added in part-4 to add functionality to the quiz site.

// VARIABLES

// Array: stored question
// array consisting of many of the same components of a regular array, saved to a local placeholder.
// Used to display the current question.

// Array: historyArr
// array that stores completed questions inside localStorage, deleting if reset by the user.

// Array difficultyArr
// stores all possible difficulties
const difficultyArr = [
    "Easy",
    "Medium",
    "Hard"
]

// const difficultySelect
// retrieves difficulty Element

//

// FUNCTIONS

// renderDifficulties()
// render the difficulty panel out using the items in difficultyArr

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