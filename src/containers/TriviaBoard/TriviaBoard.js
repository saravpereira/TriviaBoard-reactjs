import React, { Component } from "react";
import TriviaCategory from "../../components/TriviaCategory/TriviaCategory";
import categoryList from "../../data/CategoryList";
import cx from 'classnames';
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css"
import localStyles from "./TriviaBoard.module.css"

class TriviaBoard extends Component {
  state = {
    selectedCategory: "",
    startQuiz: false
  };

  handleUpdateSelectCategory(category) {
    this.setState({ selectedCategory: category, startQuiz: true});
  }

  render() {
    const allCategories = categoryList.map((c) => {
      const viewingCategory = Object.keys(c);
      return (
        <TriviaCategory
          key={viewingCategory}
          category={viewingCategory}
          description={c[viewingCategory].description}
          image={c[viewingCategory].img}
          db_name = {c[viewingCategory].db_name}
          handleUpdateSelectCategory={() =>
            this.handleUpdateSelectCategory(c[viewingCategory].db_name)
          }
          currentState={this.state}
          selectedCategory={this.state.selectedCategory}

        />
      );
    });

    return (
      <React.Fragment>
        <div className={(cx(globalStyles["container-fluid"], localStyles["container-fluid"]))}>
          <div className={(cx(globalStyles["row"]))}>{allCategories}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default TriviaBoard;

