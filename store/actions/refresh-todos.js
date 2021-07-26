export const REFRESH_TODOS = 'REFRESH_TODOS';

export const refreshTodos = (todos) => {
    return {type: REFRESH_TODOS, todos: todos};
}


