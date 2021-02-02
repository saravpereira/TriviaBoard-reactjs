import React, { Component } from "react";
import { connect } from "react-redux";
import localStyles from "./QuizPage.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import cx from "classnames";
import QuizCompletion from "../QuizPage/QuizCompletion/QuizCompletion";
import ProgressBar from "./ProgressBar/ProgressBar";
import EmptyPage from "./EmptyPage/EmptyPage";
import * as actions from "../../store/actions/index";

class QuizPage extends Component {
  componentDidMount() {
    if(this.props.selectedCategory) {
      this.props.onGetQuestions(this.props.selectedCategory);
    }
  }

  handleSelectAnswer(event) {
    this.props.onCheckAnswer(event.target.value, this.props.correctAnswer);
    const remainingQuestions = this.props.questions.filter(
      (ques) => ques.question !== this.props.viewingQuestion
    );
    this.props.onUpdateRemainingQuestions(remainingQuestions);
    if (remainingQuestions.length >= 1) {
      this.props.onLoadQuestion(remainingQuestions);
      this.props.onUpdatePercentage(remainingQuestions);
    } else {
      this.props.onQuizCompletion();
    }
  }

  handleQuizReset() {
    this.props.onQuizReset();
    this.props.onGetQuestions(this.props.selectedCategory);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.questions.length && this.props.viewingQuestion && (
          <React.Fragment>
            <ProgressBar completed={this.props.percentageCompleted} />
            <div className={cx(globalStyles["container-fluid"])}>
              <div
                className={cx(localStyles["section"], localStyles["questions"])}
              >
                <h3>{this.props.viewingQuestion}</h3>
                <div className={cx(localStyles["Answers"])}>
                  {this.props.viewingAnswers.map((answer) => {
                    return (
                      <React.Fragment key={answer}>
                        <button
                          key={answer}
                          className={cx(
                            globalStyles["btn"],
                            localStyles["selectAnswer"]
                          )}
                          value={answer}
                          onClick={(event) => this.handleSelectAnswer(event)}
                        >
                          {answer}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {this.props.quizCompleted && (
          <QuizCompletion
            displayedCategory={this.props.location.state.category[0]}
          />
        )}
        {!this.props.selectedCategory && <EmptyPage />}
      </React.Fragment>
    );
  }
}

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
    onLoadQuestion: (array) => dispatch(actions.loadQuestion(array)),
    onGetQuestions: (selectedCategory) =>
      dispatch(actions.getQuestions(selectedCategory)),
    onCheckAnswer: (selectedAnswer, correctAnswer) =>
      dispatch(actions.checkAnswer(selectedAnswer, correctAnswer)),
    onUpdateRemainingQuestions: (remainingQuestions) =>
      dispatch(actions.updateRemainingQuestions(remainingQuestions)),
    onUpdatePercentage: (remainingQuestions) =>
      dispatch(actions.updatePercentage(remainingQuestions)),
    onQuizCompletion: () => dispatch(actions.quizCompletion()),
    onQuizReset: () => dispatch(actions.quizReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
