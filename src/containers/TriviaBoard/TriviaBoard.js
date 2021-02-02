import React, { Component } from "react";
import { connect } from "react-redux";
import TriviaCategory from "../../components/TriviaCategory/TriviaCategory";
import categoryList from "../../data/CategoryList";
import cx from "classnames";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import localStyles from "./TriviaBoard.module.css";
import * as actions from "../../store/actions/index";

class TriviaBoard extends Component {

  render() {
    const allCategories = categoryList.map((c) => {
      const viewingCategory = Object.keys(c);
      return (
        <TriviaCategory
          key={viewingCategory}
          category={viewingCategory}
          description={c[viewingCategory].description}
          image={c[viewingCategory].img}
          db_name={c[viewingCategory].db_name}
        />
      );
    });

    return (
      <React.Fragment>
        <div
          className={cx(
            globalStyles["container-fluid"],
            localStyles["container-fluid"]
          )}
        >
          <div className={cx(globalStyles["row"])}>{allCategories}</div>
        </div>
      </React.Fragment>
    );
  }
}


export default TriviaBoard;
