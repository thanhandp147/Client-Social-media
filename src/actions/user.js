import Axios from 'axios';
import STORE from '../stores';
import { exportDefaultDeclaration } from '@babel/types';
import {_sendTokenAfterLogin,_disconnect} from './configSocket'





// let UIR_ORIGIN = `https://server-project-1.herokuapp.com`;
let UIR_ORIGIN = `http://localhost:3000`;

export const _login = (usernameLogin, passwordLogin, history) => {
    return dispatch => { //tự động map khi gọi hàm connect trong component
        Axios.post(`${UIR_ORIGIN}/login`, {
            usernameLogin, passwordLogin
        }).then(resp => {

            if (resp.data.text == 'login_success') {
                const { data: { data: dataResult } } = resp;
                let { username: usernameServer, token, fullname, email, birthday, phone, avatar, listPosts } = dataResult;
                let username = { usernameServer, fullname, email };
                let infoUser = { birthday, phone, url: avatar }
                let listPostsServerSend = listPosts;
                _sendTokenAfterLogin(token)
                dispatch({
                    type: 'LOGIN_SUCCESSED',
                    payload: {
                        username, token, infoUser, listPostsServerSend
                    }
                })
                localStorage.setItem('token', token);
                return history.push('/');
            }
            if (resp.data.text == 'login_fail') {

                dispatch({
                    type: 'LOGIN_FAIL',
                    payload: {
                        errors: resp.data.errors
                    }
                })
            }

        }).catch(err => console.log(err))
    }
}
export const _refreshPage = history => {

    
    let token = localStorage.getItem('token');
    if (!token) {
        STORE.dispatch({
            type: 'CLEAR_USER',
            payload: null
        })
    } else {
        
        Axios.post(`${UIR_ORIGIN}/refresh-page`, {
            token
        }).then(resp => {
           
            

            const { data: { data: dataResult } } = resp;
            let { username: usernameServer, token, fullname, email, birthday, phone, avatar, listPosts } = dataResult;
            let username = { usernameServer, fullname, email };
            let infoUser = { birthday, phone, url: avatar };
            let listPostsServerSend = listPosts
            
            STORE.dispatch({
                type: 'UPDATE_USER_REFRESH_SUCCESSED',
                payload: {
                    username, token, infoUser, listPostsServerSend
                }
            });


        }).catch(err => console.log({ err: err.message }));
    }

}

export const _logout = history => {
    let token= localStorage.getItem('token')
    _disconnect(token)
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({
            type: 'CLEAR_USER',
            payload: null
        })
        return history.push('/landing')
    }
}

export const _updatePassword = (password1, password2, history) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/update_password`, {
            password1, password2, token
        }).then(resp => {
            if (resp.data.flag == 'not_match_DB') {
                dispatch({
                    type: 'UPDATE_PASSWORD_FAIL',
                    payload: {
                        errors: resp.data.data
                    }
                })
            } else if (resp.data.flag == 'success') {
                alert(`${resp.data.data}`)
            }

        })
    }
}

export const _updateAvatar = (avatar) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        // console.log(avatar);

        let formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('token', token)

        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post(`${UIR_ORIGIN}/update_avatar`, formData, config)
            .then(resp => {

                let urlImage = resp.data;

                dispatch({
                    type: 'UPDATE_AVATAR_SUCCESS',
                    payload: {
                        url: urlImage
                    }
                })
            })


        // Axios.post(`${UIR_ORIGIN}/update_avatar`, data, {
        //     headers: {
        //       'accept': 'application/json',
        //       'Accept-Language': 'en-US,en;q=0.8',
        //       'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        //     }
        //   })
        //     .then((response) => {
        //       //handle success
        //     }).catch((error) => {
        //       //handle error
        //     });
    }
}

export const _updateInfo = (birthday, phone, history) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/update_info`, {
            birthday, phone, token
        }).then(resp => {
            if (resp.data.flag == 'success') {
                const { data: { data: dataResult } } = resp;
                let { birthday, phone } = dataResult;
                dispatch({
                    type: 'UPDATE_INFO_SUCCESS',
                    payload: {
                        infoUser: { birthday, phone }
                    }
                })
                alert('Cập nhật thông tin thành công')
                return history.push('/')

            }
        })
    }
}

export const _editPost = (_idPost, content, hashtag) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        Axios.put(`${UIR_ORIGIN}/posts/${token}`, {
            _idPost, content, hashtag
        }).then(resp => {
            console.log(resp.data)
            let listPostsServerSend = resp.data
            dispatch({
                type: 'EDIT_POST_DONE',
                payload: {
                    listPostsServerSend
                }
            })

        })
    }

}

export const _createPost = (image, content, hashtag) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let data = { content, hashtag }
        let formData = new FormData();
        formData.append('imagePost', image);
        formData.append('token', token)
        formData.append('content', content)
        formData.append('hashtag', hashtag)

        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post(`${UIR_ORIGIN}/posts`, formData, config)
            .then(resp => {
                let listPostsServerSend = resp.data
                dispatch({
                    type: 'ADD_POST_SUCCESS',
                    payload: {
                        listPostsServerSend
                    }
                })
            })
    }
}

export const _deletePost = (_idPost) => {
    let tokenStorage = localStorage.getItem('token');

    console.log(_idPost);
    return dispatch => {
        Axios.delete(`${UIR_ORIGIN}/posts/${_idPost}`, {

        }).then(resp => {
            let listPostsServerSend = resp.data
            dispatch({
                type: 'DELETE_DONE',
                payload: {
                    listPostsServerSend
                }
            })
        })

    }

    // return dispatch=>{
    //     Axios.delete(`${UIR_ORIGIN}/posts/${token}`,{
    //         _idPost
    //     })
    // }
}

export const _getAllUser = () => {
    let tokenStorage = localStorage.getItem('token');
    return dispatch => {
        Axios.get(`${UIR_ORIGIN}/get_all_users/${tokenStorage}`).then(resp => {
            console.log(resp.data.data);
            let listUsersServerSend = resp.data.data.listUsers;
            let listUsersRequest = resp.data.data.usersRequest;
            let listGuestsRequest = resp.data.data.guestsRequest;
            let listFriends = resp.data.data.friends;


            dispatch({
                type: 'GET_LIST_USERS',
                payload: {
                    listUsersServerSend,
                    listUsersRequest,
                    listGuestsRequest,
                    listFriends
                }
            })

        })
    }
}

export const _RequestAddFriend = (_idReceiver) => {
    let token = localStorage.getItem('token')
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/request_add_friend`, {
            token, _idReceiver
        }).then(resp => {
            console.log(resp.data.data);


            let infoUserReceiver = resp.data.data;
            dispatch({
                type: 'REQUEST_ADD_FRIEND',
                payload: {
                    infoUserReceiver
                }
            })
        })
    }
}

export const _RemoveRequest = (_idReceiver) => {
    let token = localStorage.getItem('token')
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/request_remove_friend`, {
            token, _idReceiver
        }).then(resp => {
            // console.log(resp.data.data);
            let infoUserReceiver = resp.data.data
            dispatch({
                type: 'REMOVE_REQUEST_ADDFRIEND',
                payload: {
                    infoUserReceiver
                }
            })

        })
    }
}

export const _AcceptFriend = (_idReceiver) => {
    let token = localStorage.getItem('token')
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/resolve_friend`, {
            token, _idReceiver
        }).then(resp => {
            let infoUserAfterBeFriend = resp.data.data;
            dispatch({
                type: 'ACCEPT_DONE',
                payload: {
                    infoUserAfterBeFriend
                }
            })

        })
    }
}

export const _notAcceptFriend = (_idReceiver) => {
    let token = localStorage.getItem('token')
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/reject_friend`, {
            token, _idReceiver
        }).then(resp => {
            let infoUserAfterNotAcceptFriend = resp.data.data;
            dispatch({
                type: 'NOT_ACCEPT_DONE',
                payload: {
                    infoUserAfterNotAcceptFriend
                }
            })
        })
    }
}

export const _unFriend = (_idReceiver) => {
    let token = localStorage.getItem('token')
    return dispatch => {
        Axios.post(`${UIR_ORIGIN}/un_friend`, {
            token, _idReceiver
        }).then(resp => {
            let infoUserAfterUnFriend = resp.data.data;
            dispatch({
                type: 'UN_FRIEND_DONE',
                payload: {
                    infoUserAfterUnFriend
                }
            })
        })
    }
}