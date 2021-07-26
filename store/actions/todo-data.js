export const SET_TODO_DATA = 'SET_TODO_DATA';


export const setTodoData = (todoData) => {
    // console.log("Function is called succesfully with :.", title);
    return {type: SET_TODO_DATA, todoData: todoData};
}