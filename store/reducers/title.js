import { SET_TITLE } from '../actions/title'

const storedTodos = {};

const titleReducer = (state=storedTodos, action) => {
    // console.log("Action time with", action)
    switch(action.type){
        case SET_TITLE:
            return {...state, title: action.title};
        default:
            return state;
    }
}

export default titleReducer;