export const SET_TITLE = 'SET_TITLE';


export const setTitle = (title) => {
    // console.log("Function is called succesfully with :.", title);
    return {type: SET_TITLE, title: title};
}