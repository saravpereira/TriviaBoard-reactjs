import * as actionTypes from './actionTypes';
import axios from "../../axios-trivia";

function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export const setQuestions = (questions) => {
    return {
        type: actionTypes.GET_ALL_QUESTIONS,
        questions: questions

    }
}

export const loadQuestion = (array) => {
    const randomCount = Math.floor(Math.random() * (array.length - 1));
    const questionObject = array[randomCount];
    const answers = [
      questionObject.correct_answer,
      ...questionObject.incorrect_answers,
    ];
    return {
        type: actionTypes.GET_QUESTION,
        viewingQuestion: questionObject.question,
        viewingAnswers: shuffle(answers),
        correctAnswer: questionObject.correct_answer,

    }
}


export const getQuestions = (selectedCategory) => {
    return dispatch => {
        axios
        .get("/" + selectedCategory + ".json")
        .then((response) => {
          const questions = [];
          response.data.map((res) => {
            questions.push(res);
          });
          dispatch(setQuestions(questions))
          dispatch(loadQuestion(questions))
        });
    }
}

export const updateNewScore = () => {
    return {
        type: actionTypes.UPDATE_NEW_SCORE
    }
}

export const updateFailedQs = () => {
    return {
        type: actionTypes.UPDATE_FAILED_QUESTIONS
    }
}

export const checkAnswer = (selectedAnswer, correctAnswer) => {
    return dispatch => {
        if (selectedAnswer === correctAnswer) {
            dispatch(updateNewScore())
          } else {
            dispatch(updateFailedQs())
          }
        
    }
}

export const updateRemainingQuestions = (remainingQuestions) => {
    return {
        type: actionTypes.UPDATE_REMAINING_QUESTIONS,
        remainingQuestions: remainingQuestions
    }
}

export const updatePercentage = (remainingQuestions) => {
    const percentage = ((50-remainingQuestions.length) / 50)*100
    return {
        type: actionTypes.UPDATE_PERCENTAGE_COMPLETION,
        percentageCompleted: percentage.toFixed(0)
    }
}


export const quizCompletion = () => {
    return {
        type: actionTypes.QUIZ_COMPLETION
    }
}

export const quizReset = () => {
    return {
        type: actionTypes.QUIZ_RESET
    }
}