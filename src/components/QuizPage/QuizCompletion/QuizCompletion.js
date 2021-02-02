import React from "react";
import { connect } from "react-redux";
import localStyles from "./QuizCompletion.module.css";
import cx from 'classnames';
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css"
import Button from "../../UI/Buttons/Buttons"
import * as actions from "../../../store/actions/index";

const quizCompletion = (props) => {
  const handleQuizReset = () => {
    props.onQuizReset();
    props.onGetQuestions(props.selectedCategory);
  }

  return (
    <React.Fragment>
      <div className={(cx(globalStyles["container-fluid"]))}>
        <div className={(cx(globalStyles["col"], localStyles["completion"]))}>
          <h1>{props.displayedCategory} Quiz Completed!</h1>
          <h2>Score: {props.score}</h2>
          <hr />
          <h2>Questions you got wrong:</h2>
          <div className={(cx(localStyles["incorrectQs"]))}>
            <ol>
              {props.failedQuestions.map((question) => {
                return <li key={question}>{question}</li>;
              })}
            </ol>
          </div>
          <Button clicked={() => handleQuizReset()}>Replay!</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.triviaBoard.selectedCategory,
    startQuiz: state.triviaBoard.startQuiz,
    score: state.quiz.score,
    questions: state.quiz.questions,
    viewingQuestion: state.quiz.viewingQuestion,
    correctAnswer: state.quiz.correctAnswer,
    viewingAnswers: state.quiz.viewingAnswers,
    userSelectedAnswer: state.quiz.userSelectedAnswer,
    failedQuestions: state.quiz.failedQuestions,
    quizCompleted: state.quiz.quizCompleted,
    percentageCompleted: state.quiz.percentageCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuizCompletion: () => dispatch(actions.quizCompletion()),
    onQuizReset: () => dispatch(actions.quizReset()),
    onGetQuestions: (selectedCategory) =>
      dispatch(actions.getQuestions(selectedCategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(quizCompletion);
