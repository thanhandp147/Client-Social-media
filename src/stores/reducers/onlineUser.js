import { stat } from "fs";

const initState = {
    listUserOnline: [

    ]
};

const onlineUserReducer = (state = initState, action) => {
    switch (action.type) {


        case 'NEW_USER_ONLINE':
            let index = state.listUserOnline.findIndex(user => user._id == action.payload.newUserConnect._id);
            if (index === -1) {
                return {
                    ...state,
                    listUserOnline: [...state.listUserOnline, action.payload.newUserConnect]
                }


            } else {
                state.listUserOnline[index] = action.payload.newUserConnect;
                return {
                    ...state
                }

            }

        case 'LIST_USER_IS_ONLINE':
            return {
                ...state,
                listUserOnline: action.payload.listUserisOnline
            }
        case 'NEW_USER_HAS_DISCONNECTED':
            return {
                ...state,
                listUserOnline: state.listUserOnline.filter(user => user._id !== action.payload._id)
            }
        default:
            return state;
    }
}
export default onlineUserReducer;