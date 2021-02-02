import * as actionTypes from './actionTypes';

export const handleUpdateSelectCategory = (category) => {
    return {
        type: actionTypes.UPDATE_SELECT_CATEGORY,
        category: category
    }
}

export const resetTrivia = () => {
    return{
        type: actionTypes.TRIVIA_RESET
    }
}