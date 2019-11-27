import Axios from 'axios';
import STORE from '../stores';


// let UIR_ORIGIN = `https://server-project-1.herokuapp.com`;
let UIR_ORIGIN = `http://localhost:3000`;

export const _createPost = (image, content, hashtag) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let data= {content, hashtag}
        let formData = new FormData();
        formData.append('imagePost', image);
        formData.append('token',token)
        formData.append('content', content)
        formData.append('hashtag', hashtag)
        
        const config = {
            headers: {
                'accept':'application/json',
                 'content-type': 'multipart/form-data' 
                }
        };

        Axios.post(`${UIR_ORIGIN}/posts`, formData,config)
        .then(resp => {
            
            console.log(resp.data.data);
            
            
            dispatch({
                type : 'ADD_POST_SUCCESS',
                payload: resp.data.data
            })
        })
    }
}

