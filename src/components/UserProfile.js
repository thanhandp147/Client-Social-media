import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import { Route, Link } from "react-router-dom";
import UserFriend from '../components/UserFriend';
import ListContacts from '../components/ListContacts';
import ListPostsInUserProfile from '../components/ListPostsInUserProfile'
import ListGuestsRequest from '../components/ListGuestsRequest'
import '../css/userprofile.css';
import '../css/imageAvatar.css'
import { connect } from 'react-redux';
import { _getAllUser } from '../actions/user'

let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';
class UserProfile extends Component {

    componentWillMount() {
        const { _getAllUser } = this.props
        _getAllUser()
    }
    // addDefaultSrc(ev){
    //     ev.target.src = 'https://i.imgur.com/xedRnbw.png'
    //   }
    render() {
        return (
            <>
                <NavBar history={this.props.history} />
                <div className="container-fluid">
                    <div className="row">
                        {/* Left */}
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="card card-user-profile shadow-sm container">
                                <ListGuestsRequest />
                            </div>
                        </div>
                        {/* Center */}
                        <div className="col-lg-6 col-md-6 col-sm-6 d-flex align-content-center" style={{ justifyContent: 'center' }}>
                            <div className="card card-user-profile text-center rounded bg-white shadow mb-4 container">
                                <div className="head-cover rounded-top position-relative" style={{ backgroundImage: 'url("https://www.w3schools.com/css/img_5terre_wide.jpg")' }}>
                                    <div className="head-avatar rounded-circle">
                                    {/* <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}> */}
                                        <img className="avatar" src={`${uirGetImageHeroku}${this.props.user.infoUser.url}`} alt="avatar" />
                                        {/* <div id="avatar_overView" style={{ backgroundImage: "url(" + `${uirGetImageHeroku}${this.props.user.infoUser.url}` + ")" }}>

                                        </div> */}
                                    </div>
                                </div>
                                <div className="head-content">
                                    <h1 className="user-name font-weight-semi-bold">{this.props.user.username.fullname}</h1>
                                </div>
                                <div className="head-nav d-flex px-3">
                                    <ul className="nav mr-auto">
                                        <li className="nav-item">
                                            <Link to="/user-profile/timeline">
                                                <div className="nav-link font-weight-semi-bold" style={{ cursor: "pointer" }}>Dòng thời gian</div>
                                            </Link>

                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link font-weight-semi-bold" style={{ cursor: "pointer" }}>Giới thiệu</div>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/user-profile/friend-list">
                                                <div className="nav-link font-weight-semi-bold" style={{ cursor: "pointer" }}>Tìm kiếm Bạn bè</div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link font-weight-semi-bold" style={{ cursor: "pointer" }}>Ảnh</div>
                                        </li>
                                    </ul>
                                    <div className="dropdown">

                                    </div>
                                    <div className="d-flex align-items-center align-items-start">

                                    </div>
                                </div>
                            </div>

                            <Route path={'/user-profile/timeline'} component={ListPostsInUserProfile} />
                            <Route path={'/user-profile/friend-list'} component={UserFriend} />
                        </div>
                        {/* Right */}
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="card card-user-profile shadow-sm container">
                                <ListContacts />
                            </div>
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
export default connect(mapStateToProps, { _getAllUser })(UserProfile);