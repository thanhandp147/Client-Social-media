const initState = {
    listInfoPost: [
        
    ]
};

const postReducer = (state = initState, action) => {
    switch (action.type) {

        case 'ADD_POST_SUCCESS':
            state.listInfoPost.unshift(action.payload)
            return {
                ...state,
                

            }
        default:
            return state;
    }
}
export default postReducer;