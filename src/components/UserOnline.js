import React, { Component } from 'react';
import '../css/imageAvatar.css'
import { connect } from 'react-redux'



let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';


class UserOnline extends Component {
    _handleRequestAddFriend = (_idReceiver) => {
        const { _RequestAddFriend } = this.props
        _RequestAddFriend(_idReceiver)
    }
    _handleRemoveRequest = (_idReceiver) => {
        const { _RemoveRequest } = this.props
        _RemoveRequest(_idReceiver)
    }

    render() {
        return (
            <>
                <div className="rounded bg-white shadow box">
                    <div className="d-flex align-items-center">
                        <h4 className="web-titleh4">Danh sách Online</h4>
                    </div>
                </div>

                <div className="overflow-auto" id="style_chat_div" style={{}}>
                    {/* show user */}
                    {
                        this.props.onlineUser.listUserOnline &&
                        this.props.onlineUser.listUserOnline.map(user => {
                            return (
                                <div className="d-flex align-items-center" style={{ width: 270, marginTop: 10 }}>
                                    <div id="image_resize50px" style={{ backgroundImage: "url(" + `${uirGetImageHeroku}${user.avatar}` + ")", marginLeft: 20 }}>
                                    </div>
                                    <div className="media-body" style={{ marginLeft: 20 }}>
                                        <h3 style={{ paddingTop: "5px" }}>
                                            {user.fullname}
                                        </h3>
                                    </div>
                                    <div id="status_online" style={{ marginRight: 10 }}>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* end show user */}

                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
    post: state.post,
    onlineUser: state.onlineUser
})
export default connect(mapStateToProps, null)(UserOnline);