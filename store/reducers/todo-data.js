import { SET_TODO_DATA } from '../actions/todo-data'

const storedTodos = {};

const todoDataReducer = (state=storedTodos, action) => {
    // console.log("Action time with", action)
    switch(action.type){
        case SET_TODO_DATA:
            return {...state, todoData: action.todoData};
        default:
            return state;
    }
}

export default todoDataReducer;