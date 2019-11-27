import React, { Component } from 'react';
import '../css/imageAvatar.css'
import { connect } from 'react-redux'
import {_RequestAddFriend} from '../actions/user'
import {_RemoveRequest} from '../actions/user'


let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';


class UserFriend extends Component {
    _handleRequestAddFriend=(_idReceiver)=>{
        const{_RequestAddFriend}=this.props
        _RequestAddFriend(_idReceiver)
    }
    _handleRemoveRequest=(_idReceiver)=>{
        const {_RemoveRequest}=this.props
        _RemoveRequest(_idReceiver)
    }

    componentDidMount(){
        const {socket}=this.props.user
        console.log(socket);
        
    }
    render() {
        return (
            <>

                <div className="card card-user-profile user-profile-friend container">
                    <div className="rounded bg-white shadow box">
                        <div className="d-flex align-items-center">
                            <h2 className="web-title">Danh sách Gợi ý</h2>
                        </div>

                        <div className="rounded bg-white w100 ">

                            {/* LIST USERS_REQUEST */}
                            {
                                this.props.user.listUsersRequest.length > 0 &&
                                this.props.user.listUsersRequest.map(user => {
                                    return (
                                        <div className="d-flex align-items-center">
                                            {/* <img src={`${uirGetImageHeroku}${user.avatar}`} alt="avatar" style={{ maxWidth: '100%' }} className="item-avatar web-avatar web-avatar--40 mr-2" /> */}
                                            <div id="image_resize" style={{ backgroundImage: "url(" + `${uirGetImageHeroku}${user.avatar}` + ")", marginLeft: 20 }}>

                                            </div>
                                            {/* <img src={`${uirGetImageHeroku}${user.avatar}`} alt="avatar" style={{ maxWidth: '100%' }} /> */}
                                            <div className="media-body" style={{ marginLeft: 20 }}>
                                                <h3 style={{ paddingTop: "5px" }}>
                                                    {user.fullname}
                                                </h3>
                                            </div>
                                            <div className="pending-request">
                                                {/* <button type="button" className="btn btn-success friend-button"><span>Kết bạn</span></button> */}
                                                <button onClick={()=>this._handleRemoveRequest(user._id)} type="button" className="btn btn-info friend-button"><span>Đang gửi yêu cầu</span></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/* LIST USER_SERVER_SEND */}
                            {
                                this.props.user.listUserServerSend.length > 0 &&
                                this.props.user.listUserServerSend.map(user => {
                                    return (
                                        <div className="d-flex align-items-center">
                                            {/* <img src={`${uirGetImageHeroku}${user.avatar}`} alt="avatar" style={{ maxWidth: '100%' }} className="item-avatar web-avatar web-avatar--40 mr-2" /> */}
                                            <div id="image_resize" style={{ backgroundImage: "url(" + `${uirGetImageHeroku}${user.avatar}` + ")", marginLeft: 20 }}>

                                            </div>
                                            {/* <img src={`${uirGetImageHeroku}${user.avatar}`} alt="avatar" style={{ maxWidth: '100%' }} /> */}
                                            <div className="media-body" style={{ marginLeft: 20 }}>
                                                <h3 style={{ paddingTop: "5px" }}>
                                                    {user.fullname}
                                                </h3>
                                            </div>
                                            <div className="pending-request">
                                                <button onClick={()=>this._handleRequestAddFriend(user._id)} type="button" className="btn btn-success friend-button"><span>Kết bạn</span></button>
                                                {/* <button type="button" className="btn btn-info friend-button"><span>Đang gửi yêu cầu</span></button> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            



                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
    post: state.post
})
export default connect(mapStateToProps, {_RequestAddFriend,_RemoveRequest})(UserFriend);