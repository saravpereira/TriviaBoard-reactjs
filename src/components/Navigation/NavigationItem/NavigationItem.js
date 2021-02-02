import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./NavigationItem.module.css";
import * as actions from "../../../store/actions/index";

const navigationItem = (props) => {

    const handleReturnHome = () => {
        props.onQuizReset()
        props.onTriviaReset()
    }
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}
        onClick={() => handleReturnHome()}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
    return {
      onQuizReset: () => dispatch(actions.quizReset()),
      onTriviaReset: () => dispatch(actions.resetTrivia()),
    };
  };

export default connect(null, mapDispatchToProps)(navigationItem);
