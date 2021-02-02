import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
  score: 0,
  questions: [],
  viewingQuestion: "",
  correctAnswer: "",
  viewingAnswers: [],
  userSelectedAnswer: "",
  failedQuestions: [],
  quizCompleted: false,
  percentageCompleted: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUIZ_RESET:
      return {
        score: 0,
        questions: [],
        viewingQuestion: "",
        correctAnswer: "",
        viewingAnswers: [],
        userSelectedAnswer: "",
        failedQuestions: [],
        quizCompleted: false,
        percentageCompleted: 0,
      };
    case actionTypes.GET_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case actionTypes.GET_QUESTION:
      return {
        ...state,
        viewingQuestion: action.viewingQuestion,
        viewingAnswers: action.viewingAnswers,
        correctAnswer: action.correctAnswer,
      };
    case actionTypes.UPDATE_NEW_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };
    case actionTypes.UPDATE_FAILED_QUESTIONS:
      return {
        ...state,
        failedQuestions: state.failedQuestions.concat(state.viewingQuestion)
      };
    case actionTypes.UPDATE_REMAINING_QUESTIONS:
      return {
        ...state,
        questions: action.remainingQuestions,
      };
    case actionTypes.UPDATE_PERCENTAGE_COMPLETION:
      return {
        ...state,
        percentageCompleted: action.percentageCompleted,
      };
    case actionTypes.QUIZ_COMPLETION:
      return {
        ...state,
        quizCompleted: true,
        percentageCompleted: 100,
      };
    default:
      return state;
  }
};

export default reducer;
