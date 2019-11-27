import React, { Component } from 'react';
import { connect } from 'react-redux'
import { stat } from 'fs';
import { _AcceptFriend } from '../actions/user'
import { _notAcceptFriend } from '../actions/user'
let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';
class ListGuestsRequest extends Component {
    _handleAccept = (_idReceiver) => {
        const { _AcceptFriend } = this.props
        _AcceptFriend(_idReceiver)
    }

    _handleNotAccept = (_idReceiver) => {
        const { _notAcceptFriend } = this.props
        _notAcceptFriend(_idReceiver)
    }
    render() {
        return (
            <>
                <div className="rounded bg-white box" style={{ height: "100%" }}>
                    <div className="rounded bg-white w100 ">
                        <h2 className="web-title">Yêu cầu kết bạn</h2>
                        {
                            this.props.user.listGuestsRequest.length > 0 &&
                            this.props.user.listGuestsRequest.map(user => {
                                return (
                                    < div style={{ marginBottom:10}}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            {/* <img src="https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png" alt="avatar" style={{ maxWidth: '100%' }} className="item-avatar web-avatar web-avatar--40 mr-2" /> */}

                                            <div>
                                                <div id="image_resize" style={{ backgroundImage: "url(" + `${uirGetImageHeroku}${user.avatar}` + ")"}}>

                                                </div>
                                                <h3 style={{ paddingTop: "5px" }}>{user.fullname}</h3>
                                            </div>

                                        </div>
                                        <div className="pending-request" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <button style={{marginRight:5}} onClick={() => this._handleAccept(user._id)} type="button" className="btn btn-success "><span>Chấp nhận</span></button>
                                            <button onClick={() => this._handleNotAccept(user._id)} type="button" className="btn btn-danger "><span>Từ chối</span></button>
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
export default connect(mapStateToProps, { _AcceptFriend, _notAcceptFriend })(ListGuestsRequest);