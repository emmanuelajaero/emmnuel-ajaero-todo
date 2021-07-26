import { SET_DETAIL } from '../actions/detail'

const storedTodos = {};

const detailReducer = (state=storedTodos, action) => {
    // console.log("Action time with", action)
    switch(action.type){
        case SET_DETAIL:
            return {...state, detail: action.detail};
        default:
            return state;
    }
}

export default detailReducer;