import React, { Component } from "react";
import { Route } from "react-router-dom";
import TriviaBoard from "./containers/TriviaBoard/TriviaBoard";
import QuizPage from "./components/QuizPage/QuizPage";
import Layout from "./hoc/Layout/Layout"

class App extends Component {
  render() {
    return (
      <div>
        <Layout />
        <Route path='/quiz' component={QuizPage}/>
        <Route path='/' exact component={TriviaBoard}/>
      </div>
    );
  }
}

export default App;
