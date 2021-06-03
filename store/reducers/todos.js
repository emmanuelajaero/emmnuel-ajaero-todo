import { ADD_TODO } from '../actions/todos'
import { REFRESH_TODOS } from '../actions/refresh-todos'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getTodos = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('@todos')
//       return jsonValue != null ? JSON.parse(jsonValue) : [];
//     } catch(e) {
//       // error pass
//     }
//   }


const storedTodos = {todos: []};

const todosReducer = (state=storedTodos, action) => {
    // console.log("Action todo: ", action.todo)
    // console.log("State todo: ", state)
    switch(action.type){
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.todo]};
        case REFRESH_TODOS:
            return {...state, todos: action.todos};
        default:
            return state;
    }
}

export default todosReducer;