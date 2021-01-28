import { React, Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import cx from "classnames";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import localStyles from "./TriviaCategory.module.css";
import Button from "../UI/Buttons/Buttons";

class triviaCategory extends Component {
  render() {
    let redirect = null;
    if (this.props.currentState.startQuiz) {
      redirect = (
        <Redirect
          to={{
            pathname: "/quiz",
            state: {
              selectedCategory: this.props.selectedCategory,
              category: this.props.category,
            },
          }}
        />
      );
    }

    return (
      <Fragment>
        <div className={cx(globalStyles["col-lg"], localStyles["section"])}>
          <img
            className={cx(localStyles["display"])}
            src={this.props.image}
            alt=""
          />

          <h2>{this.props.category}</h2>
          <p>{this.props.description}</p>
          <Button
            clicked={() =>
              this.props.handleUpdateSelectCategory(this.props.db_name)
            }
          >
            Play!
          </Button>
        </div>
        {redirect}
      </Fragment>
    );
  }
}

export default triviaCategory;
