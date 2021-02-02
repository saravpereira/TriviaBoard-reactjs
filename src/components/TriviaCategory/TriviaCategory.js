import { React, Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import cx from "classnames";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import localStyles from "./TriviaCategory.module.css";
import Button from "../UI/Buttons/Buttons";
import * as actions from "../../store/actions/index";

class triviaCategory extends Component {
  render() {
    let redirect = null;
    if (this.props.startQuiz) {
      redirect = (
        <Redirect
          to={{
            pathname: "/quiz",
            state: {
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
              this.props.onUpdateSelectCategory(this.props.db_name)
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

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.triviaBoard.selectedCategory,
    startQuiz: state.triviaBoard.startQuiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSelectCategory: (category) =>
      dispatch(actions.handleUpdateSelectCategory(category)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(triviaCategory);
