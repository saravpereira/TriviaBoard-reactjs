import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
  selectedCategory: "",
  startQuiz: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SELECT_CATEGORY:
      return {
        selectedCategory: action.category,
        startQuiz: true,
      };
    case actionTypes.TRIVIA_RESET:
      return {
        selectedCategory: "",
        startQuiz: false,
      };
    default:
      return state;
  }
};

export default reducer;
