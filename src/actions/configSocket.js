import STORE from '../stores';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000')


export const _sendTokenAfterLogin = (token) => {
    socket.emit('send_token', token)
}

export const _sendTokenAfterF5 = (token) => {
    return dispatch => {
        socket.emit('send_token', token)
    }
}

export const _disconnect = (token) => {
    socket.emit('remove_socketid_in_database', token)
}

socket.on('send_user_online', (newUserConnect) => {
    STORE.dispatch({
        type: 'NEW_USER_ONLINE',
        payload: {
            newUserConnect
        }
    })
})

socket.on('send_list_user_is_online', (listUserisOnline) => {
    STORE.dispatch({
        type: 'LIST_USER_IS_ONLINE',
        payload: {
            listUserisOnline
        }
    })

})

socket.on('send_user_has_logout', data => {

    let _id = data._id
    STORE.dispatch({
        type: 'NEW_USER_HAS_DISCONNECTED',
        payload: {
            _id
        }
    })

})


