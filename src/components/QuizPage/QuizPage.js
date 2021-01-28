import React, { Component } from "react";
import axios from "../../axios-trivia";
import localStyles from "./QuizPage.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css"
import cx from 'classnames'
import QuizCompletion from "../QuizPage/QuizCompletion/QuizCompletion";
import ProgressBar from "./ProgressBar/ProgressBar"
import EmptyPage from "./EmptyPage/EmptyPage"
import Spinner from "../UI/Spinner/Spinner"

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

class QuizPage extends Component {
  state = {
    score: 0,
    questions: [],
    viewingQuestion: "",
    correctAnswer: "",
    viewingAnswers: [],
    userSelectedAnswer: "",
    failedQuestions: [],
    quizCompleted: false,
    percentageCompleted: 0,
    loading: true
  };

  componentDidMount() {
    this.getQuestions()
  }

  getQuestions() {
    if (this.props.location.state) {
      axios
        .get("/" + this.props.location.state.selectedCategory + ".json")
        .then((response) => {
          const questions = [];
          response.data.map((res) => {
            questions.push(res);
          });
          this.setState({ questions: questions, loading: false});
          this.loadQuestion(this.state.questions);
        });
    }
  }

  loadQuestion(array) {
    const randomCount = Math.floor(Math.random() * (array.length - 1));
    const questionObject = array[randomCount];
    const answers = [
      questionObject.correct_answer,
      ...questionObject.incorrect_answers,
    ];
    this.setState({
      viewingQuestion: questionObject.question,
      viewingAnswers: shuffle(answers),
      correctAnswer: questionObject.correct_answer,
    });
  }

  handleSelectAnswer(event) {
    if (event.target.value === this.state.correctAnswer) {
      const newScore = this.state.score + 1;
      this.setState({ score: newScore });
    } else {
      const q = [...this.state.failedQuestions, this.state.viewingQuestion];
      this.setState({ failedQuestions: q });
    }
    
    const remainingQuestions = this.state.questions.filter(
      (ques) => ques.question !== this.state.viewingQuestion
    );
    this.setState({ questions: remainingQuestions });
    const percentage = ((50-remainingQuestions.length) / 50)*100
    if (remainingQuestions.length >= 1) {
      this.loadQuestion(remainingQuestions);
      this.setState({percentageCompleted: percentage.toFixed(0)})
    } else {
      this.setState({ quizCompleted: true, percentageCompleted: 100 });
    }
  }

  handleQuizReset() {
    this.setState({
      score: 0,
      questions: [],
      viewingQuestion: "",
      correctAnswer: "",
      viewingAnswers: [],
      userSelectedAnswer: "",
      failedQuestions: [],
      quizCompleted: false,
      percentageCompleted: 0
    })
    this.getQuestions()
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.questions.length && this.state.viewingQuestion && !this.state.loading) ? (
          <React.Fragment>
          <ProgressBar completed={this.state.percentageCompleted}/>
          <div className={(cx(globalStyles["container-fluid"]))}>
            <div className={(cx(localStyles["section"], localStyles["questions"]))}>
              <h3>{this.state.viewingQuestion}</h3>
              <div className={(cx(localStyles["Answers"]))}>
                {this.state.viewingAnswers.map((answer) => {
                  return (
                    <React.Fragment key={answer}>
                      <button
                        key={answer}
                        className={(cx(globalStyles["btn"], localStyles["selectAnswer"]))}
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
        ) : <Spinner/>}
        {this.state.quizCompleted && (
          <QuizCompletion
            selectedCategory={this.props.location.state.category[0]}
            score={this.state.score}
            failedQuestions={this.state.failedQuestions}
            handleQuizReset={() => this.handleQuizReset()}
          />
        )}
        {!this.props.location.state && <EmptyPage/>}
        
      </React.Fragment>
    );
  }
}

export default QuizPage;
