import React from "react";
import localStyles from "./QuizCompletion.module.css";
import cx from 'classnames';
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css"
import Button from "../../UI/Buttons/Buttons"

const quizCompletion = (props) => {
  return (
    <React.Fragment>
      <div className={(cx(globalStyles["container-fluid"]))}>
        <div className={(cx(globalStyles["col"], localStyles["completion"]))}>
          <h1>{props.selectedCategory} Quiz Completed!</h1>
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
          <Button clicked={() => props.handleQuizReset()}>Replay!</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default quizCompletion;
