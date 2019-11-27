const initState = {
    username: {},
    infoUser: {},
    token: '',
    listErrors: [],
    listPosts: [],
    listUserServerSend: [],
    listUsersRequest: [],
    listGuestsRequest: [],
    listFriends: [],
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSED':

            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                infoUser: action.payload.infoUser,
                listPosts: action.payload.listPostsServerSend,
                listErrors: [],
                socket: action.payload.socket
            }
        case 'UPDATE_USER_REFRESH_SUCCESSED':

            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                infoUser: action.payload.infoUser,
                listPosts: action.payload.listPostsServerSend,
                socket: action.payload.socket
            }
        case 'CLEAR_USER':
            return initState;

        case 'LOGIN_FAIL':
            return {
                listErrors: action.payload.errors
            }
        case 'UPDATE_PASSWORD_FAIL':
            return {
                ...state,
                listErrors: action.payload.errors
            }
        case 'UPDATE_INFO_SUCCESS':
            return {
                ...state,
                infoUser: { ...state.infoUser, birthday: action.payload.infoUser.birthday, phone: action.payload.infoUser.phone }
            }
        case 'UPDATE_AVATAR_SUCCESS':
            return {
                ...state,
                infoUser: { ...state.infoUser, url: action.payload.url }

            }
        case 'EDIT_POST_DONE':
            return {
                ...state,
                listPosts: action.payload.listPostsServerSend

            }
        case 'DELETE_DONE':
            return {
                ...state,
                listPosts: action.payload.listPostsServerSend

            }
        case 'ADD_POST_SUCCESS':
            return {
                ...state,
                listPosts: action.payload.listPostsServerSend

            }
        case 'GET_LIST_USERS':
            return {
                ...state,
                listUserServerSend: action.payload.listUsersServerSend,
                listUsersRequest: action.payload.listUsersRequest,
                listGuestsRequest: action.payload.listGuestsRequest,
                listFriends: action.payload.listFriends
            }

        case 'REQUEST_ADD_FRIEND':
            return {
                ...state,
                listUsersRequest: [...state.listUsersRequest, action.payload.infoUserReceiver],
                listUserServerSend: [...state.listUserServerSend.filter(user => user._id !== action.payload.infoUserReceiver._id)]
            }
        case 'REMOVE_REQUEST_ADDFRIEND':
            return {
                ...state,
                listUserServerSend: [...state.listUserServerSend, action.payload.infoUserReceiver],
                listUsersRequest: [...state.listUsersRequest.filter(user => user._id !== action.payload.infoUserReceiver._id)]
            }
        case 'ACCEPT_DONE':
            return {
                ...state,
                listFriends: [...state.listFriends, action.payload.infoUserAfterBeFriend],
                listGuestsRequest: [...state.listGuestsRequest.filter(user => user._id !== action.payload.infoUserAfterBeFriend._id)]
            }
        case 'NOT_ACCEPT_DONE':
            return {
                ...state,
                listUserServerSend: [...state.listUserServerSend, action.payload.infoUserAfterNotAcceptFriend],
                listGuestsRequest: [...state.listGuestsRequest.filter(user => user._id !== action.payload.infoUserAfterNotAcceptFriend._id)]
            }
        case 'UN_FRIEND_DONE':
            return {
                ...state,
                listUserServerSend: [...state.listUserServerSend, action.payload.infoUserAfterUnFriend],
                listFriends: [...state.listFriends.filter(user => user._id !== action.payload.infoUserAfterUnFriend._id)]
            }
        
        default:
            return state;
    }
}
export default userReducer;