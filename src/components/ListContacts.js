import React, { Component } from 'react';
import { connect } from 'react-redux'
import {_unFriend} from '../actions/user'
let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';
class ListContacts extends Component {

    _handleUnFriend = (_idReceiver) => {
        const {_unFriend}=this.props
        _unFriend(_idReceiver)
    }
    render() {
        return (
            <>
                <div className="rounded bg-white box" style={{ height: "100%" }}>
                    <div className="rounded bg-white w100 ">
                        <h2 className="web-title">Danh sách Bạn bè</h2>
                        {
                            this.props.user.listFriends.length > 0 &&
                            this.props.user.listFriends.map(user => {
                                return (

                                    <div className="d-flex align-items-center">
                                        {/* <img src="https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png" alt="avatar" style={{ maxWidth: '100%' }} className="item-avatar web-avatar web-avatar--40 mr-2" /> */}
                                        <div id="image_resize" style={{ backgroundImage: "url(" + `${uirGetImageHeroku}${user.avatar}` + ")", marginLeft: 20 }}>

                                            </div>
                                        <div className="media-body">
                                            <h3 style={{ paddingTop: "5px" }}>{user.fullname}</h3>
                                        </div>
                                        <div className="pending-request" style={{ display: 'flex', alignItems: 'center' }}>
                                            <button onClick={() => this._handleUnFriend(user._id)} type="button" className="btn btn-danger "><span>Hủy Kết Bạn</span></button>
                                        </div>
                                    </div>

                                )
                            })
                        }

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
export default connect(mapStateToProps, {_unFriend})(ListContacts);