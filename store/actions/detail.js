export const SET_DETAIL = 'SET_DETAIL';


export const setDetail = (detail) => {
    // console.log("Function is called succesfully with :.", title);
    return {type: SET_DETAIL, detail: detail};
}