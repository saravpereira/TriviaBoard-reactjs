import React from "react";
import {NavLink} from "react-router-dom"
import cx from 'classnames';
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css"
import localStyles from "./EmptyPage.module.css"

const emptyPage = (props) => {
  return (
    <React.Fragment>
      <div className={(cx(globalStyles["container-fluid"], localStyles["container-fluid"]))}>
        <div className={(cx(globalStyles["col"]))}>
          <h3>Uh Oh... You did not select a trivia category.</h3>
          <p>Navigate to the <NavLink to="/" exact>Home</NavLink> page to select a trivia category.</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default emptyPage;
